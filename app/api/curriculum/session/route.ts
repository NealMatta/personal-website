/* Notes
- GET says whether this browser is unlocked, POST trades the passcode for the cookie, DELETE hands it back
- The passcode is only ever compared here, on the server */

import {
  isUnlocked,
  lock,
  passcodeMatches,
  unlock,
} from '@/src/lib/curriculum/session';

const JSON_HEADERS = { 'Content-Type': 'application/json' };

/*
A guess costs something: five wrong passcodes from one address and that
address waits fifteen minutes. Kept in module memory, the same way the
Spotify token is — good enough to make guessing slow, not a ledger.
*/
const MAX_MISSES = 5;
const LOCKOUT = 15 * 60_000;
const misses = new Map<string, { count: number; until: number }>();

function caller(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  );
}

export async function GET() {
  return new Response(JSON.stringify({ unlocked: await isUnlocked() }), {
    status: 200,
    headers: { ...JSON_HEADERS, 'Cache-Control': 'no-store' },
  });
}

export async function POST(request: Request) {
  try {
    const who = caller(request);
    const record = misses.get(who);

    if (record && record.count >= MAX_MISSES) {
      if (record.until > Date.now()) {
        return new Response(
          JSON.stringify({ error: 'Too many tries. Wait a few minutes.' }),
          { status: 429, headers: JSON_HEADERS }
        );
      }
      misses.delete(who);
    }

    const body = await request.json().catch(() => null);
    const passcode = typeof body?.passcode === 'string' ? body.passcode : '';

    if (!passcode || !passcodeMatches(passcode)) {
      const count = (misses.get(who)?.count ?? 0) + 1;
      misses.set(who, { count, until: Date.now() + LOCKOUT });

      return new Response(JSON.stringify({ error: 'Wrong passcode' }), {
        status: 401,
        headers: JSON_HEADERS,
      });
    }

    misses.delete(who);
    await unlock();

    return new Response(JSON.stringify({ unlocked: true }), {
      status: 200,
      headers: JSON_HEADERS,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';

    return new Response(
      JSON.stringify({ error: 'Failed to unlock', details: errorMessage }),
      { status: 500, headers: JSON_HEADERS }
    );
  }
}

export async function DELETE() {
  await lock();

  return new Response(JSON.stringify({ unlocked: false }), {
    status: 200,
    headers: JSON_HEADERS,
  });
}
