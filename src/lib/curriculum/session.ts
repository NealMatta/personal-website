import { createHash, createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

/*
Who gets to tick a box.

There's no login. `/curriculum/unlock` takes one passcode, and a browser
that knows it is handed a cookie saying so until a date. The cookie is
signed with SESSION_SECRET, so it can't be written by hand, and it's
httpOnly, so nothing on the page can read it. Server only.
*/

const COOKIE = 'curriculum_key';
const DAY = 86_400_000;
const LIFETIME = 90 * DAY;

function sign(expires: number): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error('SESSION_SECRET is missing');
  return createHmac('sha256', secret)
    .update(`curriculum:${expires}`)
    .digest('hex');
}

/* Hashing first makes both sides the same length, which the compare needs. */
function same(a: string, b: string): boolean {
  const hash = (value: string) => createHash('sha256').update(value).digest();
  return timingSafeEqual(hash(a), hash(b));
}

export function passcodeMatches(attempt: string): boolean {
  const passcode = process.env.CURRICULUM_PASSCODE;
  if (!passcode) throw new Error('CURRICULUM_PASSCODE is missing');
  return same(attempt, passcode);
}

export async function isUnlocked(): Promise<boolean> {
  const value = (await cookies()).get(COOKIE)?.value;
  if (!value) return false;

  const [expires, signature] = value.split('.');
  const until = Number(expires);
  if (!signature || !Number.isFinite(until) || until < Date.now()) return false;

  return same(signature, sign(until));
}

export async function unlock(): Promise<void> {
  const expires = Date.now() + LIFETIME;
  (await cookies()).set(COOKIE, `${expires}.${sign(expires)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(expires),
  });
}

export async function lock(): Promise<void> {
  (await cookies()).delete(COOKIE);
}
