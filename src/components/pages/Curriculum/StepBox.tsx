'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useCurriculumKey } from '@/src/lib/curriculum/useCurriculumKey';

/*
A step's box.

For a visitor it's a drawing: the record is said out loud beside it, so
the box itself stays hidden from a screen reader. Once this browser holds
the key it becomes a real checkbox — ticking it fills in straight away,
saves, and then asks the page for a fresh render so the bars and counts
around it catch up. If the save fails the tick comes back off.
*/

interface StepBoxProps {
  course: string;
  step: string;
  done: boolean;
  /** The step's text, so the checkbox has a name. */
  label: string;
}

async function saveStep(body: { course: string; step: string; done: boolean }) {
  const response = await fetch('/api/curriculum/steps', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error('Failed to save step');
  }
}

export default function StepBox({ course, step, done, label }: StepBoxProps) {
  const router = useRouter();
  const { unlocked } = useCurriculumKey();
  const [checked, setChecked] = useState(done);

  /* The page's record wins whenever it arrives. */
  useEffect(() => setChecked(done), [done]);

  const { mutate, isPending, isError } = useMutation({
    mutationFn: saveStep,
    onSuccess: () => router.refresh(),
    onError: () => setChecked(done),
  });

  const box = (
    <span
      aria-hidden="true"
      className={`flex h-[22px] w-[22px] items-center justify-center rounded-md border-2 ${
        isError ? 'border-[var(--bad-fg)]' : 'border-ink'
      }`}
      style={checked ? { background: 'var(--ink)' } : undefined}
    >
      {checked && (
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--paper)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      )}
    </span>
  );

  if (!unlocked) return box;

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      title={isError ? 'That didn’t save. Try again.' : undefined}
      disabled={isPending}
      onClick={() => {
        setChecked(!checked);
        mutate({ course, step, done: !checked });
      }}
      className="-m-2 cursor-pointer rounded-lg border-0 bg-transparent p-2 transition-colors hover:bg-wash focus-visible:bg-wash disabled:cursor-wait"
    >
      {box}
    </button>
  );
}
