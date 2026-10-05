'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  CURRICULUM_KEY,
  useCurriculumKey,
} from '@/src/lib/curriculum/useCurriculumKey';

/*
The one field that stands in for a login.

A right passcode sets the cookie and goes back to the curriculum, where
the boxes are now checkboxes. A browser that's already unlocked gets the
way back and a button to lock itself again.
*/

async function sendPasscode(passcode: string) {
  const response = await fetch('/api/curriculum/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ passcode }),
  });
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error ?? 'Failed to unlock');
  }
}

async function handBack() {
  const response = await fetch('/api/curriculum/session', { method: 'DELETE' });
  if (!response.ok) {
    throw new Error('Failed to lock');
  }
}

export default function UnlockForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { unlocked, isLoading } = useCurriculumKey();
  const [passcode, setPasscode] = useState('');

  const unlock = useMutation({
    mutationFn: sendPasscode,
    onSuccess: () => {
      queryClient.setQueryData(CURRICULUM_KEY, true);
      router.push('/curriculum');
    },
  });

  const lock = useMutation({
    mutationFn: handBack,
    onSuccess: () => queryClient.setQueryData(CURRICULUM_KEY, false),
  });

  if (isLoading) {
    return <p className="m-0 text-[15px] text-graphite">Checking…</p>;
  }

  if (unlocked) {
    return (
      <div className="flex flex-col items-start gap-4">
        <p className="m-0 text-[15px] text-copy">
          This browser is unlocked. Steps can be ticked off.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/curriculum"
            className="sky-button bg-ink px-[18px] py-3 text-[15px] font-semibold text-paper no-underline"
          >
            <span>Back to the curriculum</span>
          </Link>
          <button
            type="button"
            onClick={() => lock.mutate()}
            disabled={lock.isPending}
            className="cursor-pointer rounded-lg border border-rule-strong bg-transparent px-[17px] py-[11px] text-[15px] font-semibold text-ink transition-colors hover:bg-wash"
          >
            Lock this browser
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        unlock.mutate(passcode);
      }}
    >
      <label
        htmlFor="passcode"
        className="font-mono text-xs uppercase tracking-[.06em] text-graphite"
      >
        Passcode
      </label>
      <div className="flex flex-wrap gap-3">
        <input
          id="passcode"
          type="password"
          autoComplete="current-password"
          autoFocus
          required
          value={passcode}
          onChange={(event) => setPasscode(event.target.value)}
          className="min-w-0 flex-1 rounded-lg border border-rule-strong bg-card px-4 py-3 font-mono text-base text-ink"
        />
        <button
          type="submit"
          disabled={unlock.isPending}
          className="sky-button cursor-pointer border-0 bg-ink px-[18px] py-3 text-[15px] font-semibold text-paper"
        >
          <span>{unlock.isPending ? 'Checking…' : 'Unlock'}</span>
        </button>
      </div>
      {unlock.isError && (
        <p
          role="alert"
          className="m-0 self-start rounded-md bg-[var(--bad-bg)] px-2.5 py-1 text-[13px] text-[var(--bad-fg)]"
        >
          {unlock.error.message}
        </p>
      )}
    </form>
  );
}
