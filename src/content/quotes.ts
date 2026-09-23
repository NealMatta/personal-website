import data from './quotes.json';

/*
The commonplace book, in short form. One of these shows under the home
page, on the sky.
*/

export interface Quote {
  quote: string;
  source: string;
}

export const QUOTES: Quote[] = data;

/**
 * One quote per day rather than one per render, so the page doesn't
 * reshuffle itself every time you navigate back to it.
 */
export function quoteForDay(date: Date | null): Quote {
  if (!date) return QUOTES[0];

  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const dayOfYear = Math.floor(
    (date.getTime() - startOfYear.getTime()) / 86_400_000
  );

  return QUOTES[dayOfYear % QUOTES.length];
}
