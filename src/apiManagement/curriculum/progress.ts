import { unstable_cache } from 'next/cache';
import { FieldValue } from 'firebase-admin/firestore';
import { db } from '@/src/apiManagement/curriculum/firestore';
import { QUARTERS, stepId, type Quarter } from '@/src/content/curriculum';

/*
The record: which steps are done.

The syllabus stays in `src/content/curriculum.ts`; Firestore only holds
what I've ticked off. One document per class, named for its slug:

  curriculumProgress/{courseSlug} → { done: { [stepId]: ISO time } }

The pages never read `QUARTERS` directly any more — they ask for
`recordedQuarters()`, which is the same list with `done` laid over it.
*/

const COLLECTION = 'curriculumProgress';
export const PROGRESS_TAG = 'curriculum-progress';

/** Course slug → step id → when it was ticked off. */
export type DoneMap = Record<string, Record<string, string>>;

async function readDone(): Promise<DoneMap> {
  const snapshot = await db().collection(COLLECTION).get();
  const done: DoneMap = {};
  snapshot.forEach((doc) => {
    done[doc.id] = doc.data().done ?? {};
  });
  return done;
}

/*
Cached, because /curriculum renders per request and a visitor shouldn't
cost a read. Ticking a step clears the tag, so the cache is never stale
for longer than the write takes.
*/
const cachedDone = unstable_cache(readDone, [PROGRESS_TAG], {
  tags: [PROGRESS_TAG],
  revalidate: 3600,
});

/** Every quarter, with the record laid over the syllabus. */
export async function recordedQuarters(): Promise<Quarter[]> {
  let done: DoneMap;
  try {
    done = await cachedDone();
  } catch (error) {
    /* The syllabus is still worth showing if the record can't be reached. */
    console.error('Curriculum record unavailable:', error);
    return QUARTERS;
  }

  return QUARTERS.map((quarter) => ({
    ...quarter,
    courses: quarter.courses.map((course) => {
      const record = done[course.slug];
      if (!record) return course;

      return {
        ...course,
        units: course.units.map((unit) => ({
          ...unit,
          steps: unit.steps.map((step) =>
            record[stepId(step)] ? { ...step, done: true } : step
          ),
        })),
      };
    }),
  }));
}

export async function setStepDone(
  courseSlug: string,
  step: string,
  done: boolean
): Promise<void> {
  await db()
    .collection(COLLECTION)
    .doc(courseSlug)
    .set(
      {
        done: { [step]: done ? new Date().toISOString() : FieldValue.delete() },
      },
      { merge: true }
    );
}
