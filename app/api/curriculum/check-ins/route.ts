/* Notes
- POST files a check-in against a class, PATCH rewords one, DELETE takes one down
- Refuses anyone without the unlock cookie, a class the syllabus doesn't have or hasn't started, and any day but today */

import { revalidateTag } from 'next/cache';
import {
  addCheckIn,
  CHECK_INS_TAG,
  editCheckIn,
  removeCheckIn,
} from '@/src/apiManagement/curriculum/checkIns';
import {
  CHECK_IN_LIMIT,
  getCourse,
  isToday,
  takesCheckIns,
  type CheckIn,
} from '@/src/content/curriculum';
import { isUnlocked } from '@/src/lib/curriculum/session';

const JSON_HEADERS = { 'Content-Type': 'application/json' };

function answer(status: number, body: object) {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

function failed(error: unknown) {
  const errorMessage =
    error instanceof Error ? error.message : 'An unknown error occurred';

  return answer(500, {
    error: 'Failed to save check-in',
    details: errorMessage,
  });
}

/** The words and the kind, or nothing if either is off. */
function written(body: unknown): Pick<CheckIn, 'body' | 'kind'> | undefined {
  const { body: raw, kind } = (body ?? {}) as Record<string, unknown>;
  const text = typeof raw === 'string' ? raw.trim() : '';

  if (!text || text.length > CHECK_IN_LIMIT) return undefined;
  if (kind !== 'update' && kind !== 'exam') return undefined;

  return { body: text, kind };
}

/* Firestore won't take a slash in a document's name. */
function checkInId(body: unknown): string | undefined {
  const id = (body as Record<string, unknown> | null)?.id;
  return typeof id === 'string' && id && !id.includes('/') ? id : undefined;
}

export async function POST(request: Request) {
  try {
    if (!(await isUnlocked())) {
      return answer(401, { error: 'Locked' });
    }

    const body = await request.json().catch(() => null);
    const found =
      typeof body?.course === 'string' ? getCourse(body.course) : undefined;

    if (!found || !takesCheckIns(found.quarter)) {
      return answer(404, { error: 'No such class' });
    }

    const words = written(body);
    if (!words) {
      return answer(400, { error: 'A check-in needs some words and a kind' });
    }

    if (typeof body.at !== 'string' || !isToday(body.at, new Date())) {
      return answer(400, { error: 'A check-in is filed the day it’s written' });
    }

    const id = await addCheckIn({
      course: found.course.slug,
      at: body.at,
      ...words,
    });
    revalidateTag(CHECK_INS_TAG);

    return answer(200, { id });
  } catch (error: unknown) {
    return failed(error);
  }
}

export async function PATCH(request: Request) {
  try {
    if (!(await isUnlocked())) {
      return answer(401, { error: 'Locked' });
    }

    const body = await request.json().catch(() => null);
    const id = checkInId(body);
    const words = written(body);

    if (!id) {
      return answer(404, { error: 'No such check-in' });
    }
    if (!words) {
      return answer(400, { error: 'A check-in needs some words and a kind' });
    }

    if (!(await editCheckIn(id, words))) {
      return answer(404, { error: 'No such check-in' });
    }
    revalidateTag(CHECK_INS_TAG);

    return answer(200, { id });
  } catch (error: unknown) {
    return failed(error);
  }
}

export async function DELETE(request: Request) {
  try {
    if (!(await isUnlocked())) {
      return answer(401, { error: 'Locked' });
    }

    const id = checkInId(await request.json().catch(() => null));

    if (!id || !(await removeCheckIn(id))) {
      return answer(404, { error: 'No such check-in' });
    }
    revalidateTag(CHECK_INS_TAG);

    return answer(200, { id });
  } catch (error: unknown) {
    return failed(error);
  }
}
