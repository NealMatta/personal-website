/* Notes
- The only write path on the site: ticks a step off, or un-ticks it
- Refuses anyone without the unlock cookie, and any step the syllabus doesn't have */

import { revalidateTag } from 'next/cache';
import {
  PROGRESS_TAG,
  setStepDone,
} from '@/src/apiManagement/curriculum/progress';
import { courseSteps, getCourse, stepId } from '@/src/content/curriculum';
import { isUnlocked } from '@/src/lib/curriculum/session';

const JSON_HEADERS = { 'Content-Type': 'application/json' };

export async function POST(request: Request) {
  try {
    if (!(await isUnlocked())) {
      return new Response(JSON.stringify({ error: 'Locked' }), {
        status: 401,
        headers: JSON_HEADERS,
      });
    }

    const body = await request.json().catch(() => null);
    const found =
      typeof body?.course === 'string' ? getCourse(body.course) : undefined;
    const step = found
      ? courseSteps(found.course).find((s) => stepId(s) === body.step)
      : undefined;

    if (!found || !step || typeof body.done !== 'boolean') {
      return new Response(JSON.stringify({ error: 'No such step' }), {
        status: 404,
        headers: JSON_HEADERS,
      });
    }

    await setStepDone(found.course.slug, stepId(step), body.done);
    revalidateTag(PROGRESS_TAG);

    return new Response(JSON.stringify({ done: body.done }), {
      status: 200,
      headers: JSON_HEADERS,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';

    return new Response(
      JSON.stringify({ error: 'Failed to save step', details: errorMessage }),
      { status: 500, headers: JSON_HEADERS }
    );
  }
}
