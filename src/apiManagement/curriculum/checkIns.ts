import { unstable_cache } from 'next/cache';
import { db } from '@/src/apiManagement/curriculum/firestore';
import type { CheckIn } from '@/src/content/curriculum';

/*
The check-ins: short notes filed against a class.

Like the ticked steps, these are something I did rather than something I
planned, so they live in Firestore instead of the curriculum file. One
document per check-in:

  curriculumCheckIns/{id} → { course, at, body, kind, postedAt }

`at` is the day it counts for and is what the pages print. `postedAt` is
the full time, kept only so two check-ins on one day stay in order.
*/

const COLLECTION = 'curriculumCheckIns';
export const CHECK_INS_TAG = 'curriculum-check-ins';

/** Every check-in, newest first. */
async function readCheckIns(): Promise<CheckIn[]> {
  const snapshot = await db()
    .collection(COLLECTION)
    .orderBy('postedAt', 'desc')
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      course: data.course,
      at: data.at,
      body: data.body,
      kind: data.kind === 'exam' ? 'exam' : 'update',
    };
  });
}

/* Cached for the same reason the steps are; a write clears the tag. */
const cachedCheckIns = unstable_cache(readCheckIns, [CHECK_INS_TAG], {
  tags: [CHECK_INS_TAG],
  revalidate: 3600,
});

export async function recordedCheckIns(): Promise<CheckIn[]> {
  try {
    return await cachedCheckIns();
  } catch (error) {
    /* The syllabus is still worth showing without them. */
    console.error('Curriculum check-ins unavailable:', error);
    return [];
  }
}

export async function addCheckIn(
  checkIn: Pick<CheckIn, 'course' | 'at' | 'body' | 'kind'>
): Promise<string> {
  const doc = await db()
    .collection(COLLECTION)
    .add({ ...checkIn, postedAt: new Date().toISOString() });
  return doc.id;
}

/*
An edit changes the words and the kind and nothing else: not the class,
not the day, and it leaves no mark that it happened. Both of these answer
false for a check-in that isn't there.
*/
export async function editCheckIn(
  id: string,
  changes: Pick<CheckIn, 'body' | 'kind'>
): Promise<boolean> {
  const doc = db().collection(COLLECTION).doc(id);
  if (!(await doc.get()).exists) return false;

  await doc.update({ body: changes.body, kind: changes.kind });
  return true;
}

export async function removeCheckIn(id: string): Promise<boolean> {
  const doc = db().collection(COLLECTION).doc(id);
  if (!(await doc.get()).exists) return false;

  await doc.delete();
  return true;
}
