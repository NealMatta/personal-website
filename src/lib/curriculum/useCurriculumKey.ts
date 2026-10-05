'use client';

import { useQuery } from '@tanstack/react-query';

/*
Whether this browser holds the key to the curriculum.

The cookie is httpOnly, so the page can't look for itself — it asks. Every
checkbox on a page shares the one query key, so React Query asks once, and
a visitor who was never unlocked just keeps seeing the drawn boxes.
*/

export const CURRICULUM_KEY = ['curriculum-key'];

async function fetchUnlocked(): Promise<boolean> {
  const response = await fetch('/api/curriculum/session');
  if (!response.ok) {
    throw new Error('Failed to check the curriculum key');
  }
  return (await response.json()).unlocked === true;
}

export function useCurriculumKey() {
  const { data, isLoading } = useQuery({
    queryKey: CURRICULUM_KEY,
    queryFn: fetchUnlocked,
    staleTime: 5 * 60_000,
  });

  return { unlocked: data === true, isLoading };
}
