'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import CheckInForm, {
  sendCheckIn,
  type CheckInWords,
} from '@/src/components/pages/Curriculum/CheckInForm';
import { formatCurriculumDay, localDay } from '@/src/content/curriculum';
import { useCurriculumKey } from '@/src/lib/curriculum/useCurriculumKey';

/*
Where a check-in gets written.

A visitor never sees this: it renders nothing until this browser holds
the key. It sits at the top of both lists a check-in shows up in — the
feed on /curriculum, where it asks which class, and a class's own page,
where it already knows.

There's no date to pick. A check-in is filed the day it's written, by
this browser's calendar rather than the server's, so one written late at
night still lands on the right day. The route holds it to that.
*/

/** Where the jump link in the masthead sends the cursor. */
export const CHECK_IN_TEXT = 'check-in-text';

interface CheckInComposerProps {
  /** The classes it can file against. One means the class is settled. */
  courses: { slug: string; code: string; title: string }[];
  className?: string;
}

export default function CheckInComposer({
  courses,
  className,
}: CheckInComposerProps) {
  const router = useRouter();
  const { unlocked } = useCurriculumKey();
  const [course, setCourse] = useState(courses[0]?.slug ?? '');
  /* Bumped after a post, which hands the form back empty. */
  const [round, setRound] = useState(0);
  /* Read after mount: the server's today isn't necessarily mine. */
  const [today, setToday] = useState<string>();
  useEffect(() => setToday(localDay(new Date())), []);

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (words: CheckInWords) =>
      sendCheckIn('POST', { ...words, course, at: localDay(new Date()) }),
    onSuccess: () => {
      setRound((n) => n + 1);
      router.refresh();
    },
  });

  if (!unlocked || courses.length === 0) return null;

  return (
    <div className={className}>
      <CheckInForm
        key={round}
        textId={CHECK_IN_TEXT}
        submitLabel="Post"
        pendingLabel="Posting…"
        isPending={isPending}
        isError={isError}
        onSubmit={mutate}
      >
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <span className="font-mono text-xs uppercase tracking-[.06em] text-graphite">
            Check in{today ? ` · ${formatCurriculumDay(today)}` : ''}
          </span>

          {courses.length > 1 && (
            <select
              aria-label="Class"
              value={course}
              disabled={isPending}
              onChange={(event) => setCourse(event.target.value)}
              className="min-w-0 max-w-full cursor-pointer rounded-lg border border-rule-strong bg-paper px-3 py-2 font-body text-[15px] text-ink"
            >
              {courses.map((option) => (
                <option key={option.slug} value={option.slug}>
                  {option.code} · {option.title}
                </option>
              ))}
            </select>
          )}
        </div>
      </CheckInForm>
    </div>
  );
}
