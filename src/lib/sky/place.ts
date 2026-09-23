'use client';

/*
The city on the hero clock.

The browser only tells us an IANA zone, so "America/Chicago" becomes
"Chicago" and "Europe/Isle_of_Man" becomes "Isle of Man". Good enough to
make the clock feel like it's yours rather than mine.
*/

export function placeFromTimeZone(timeZone?: string): string {
  const zone = timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (!zone) return 'Your time';

  const city = zone.split('/').pop();
  if (!city) return 'Your time';

  return city.replace(/_/g, ' ');
}
