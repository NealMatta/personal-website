'use client';

import { useQuery } from '@tanstack/react-query';
import type { Commit } from '@/src/apiManagement/githubAPI';

/*
Commits to this repo over the last 30 days.

Two cards on the home page want this — the GitHub widget in the hero and
the site status card in the live wires — so they share one query key and
React Query fetches it once.
*/

async function fetchCommits(): Promise<Commit[]> {
  const response = await fetch('/api/github/commits');
  if (!response.ok) {
    throw new Error('Failed to fetch commits');
  }
  return response.json();
}

export interface CommitActivity {
  total: number;
  /** Longest run of consecutive days with at least one commit. */
  longestStreak: number;
  /** One entry per day, oldest first. */
  byDay: Array<{ date: string; count: number }>;
}

const DAY = 86_400_000;

/** Local-midnight date key, so days line up with the visitor's calendar. */
function dayKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function summarize(commits: Commit[], days: number): CommitActivity {
  const counts = new Map<string, number>();
  for (const c of commits) {
    const key = dayKey(new Date(c.commit.author.date));
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const today = new Date();
  const byDay: CommitActivity['byDay'] = [];
  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date(today.getTime() - i * DAY);
    const key = dayKey(date);
    byDay.push({ date: key, count: counts.get(key) ?? 0 });
  }

  let longestStreak = 0;
  let run = 0;
  for (const { count } of byDay) {
    run = count > 0 ? run + 1 : 0;
    if (run > longestStreak) longestStreak = run;
  }

  return { total: commits.length, longestStreak, byDay };
}

export function useCommits(days = 35) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['commits'],
    queryFn: fetchCommits,
  });

  return {
    isLoading,
    isError,
    activity: data ? summarize(data, days) : null,
  };
}
