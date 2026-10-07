'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import CheckInForm, {
  sendCheckIn,
  type CheckInWords,
} from '@/src/components/pages/Curriculum/CheckInForm';
import type { CheckIn } from '@/src/content/curriculum';
import { useCurriculumKey } from '@/src/lib/curriculum/useCurriculumKey';

/*
What a check-in says.

For a visitor it's the paragraph and nothing more. Once this browser
holds the key there's an Edit and a Remove under it: Edit turns the
paragraph into the form it was written in, and Remove asks once, in
place, before it goes. The class and the day aren't on offer — an edit
only ever changes the words and the kind.
*/

const CONTROL =
  'cursor-pointer border-0 bg-transparent p-0 font-mono text-[11px] uppercase tracking-[.06em] text-graphite underline-offset-4 transition-colors hover:text-ink hover:underline disabled:cursor-wait';

export default function CheckInEntry({
  checkIn,
}: {
  checkIn: Pick<CheckIn, 'id' | 'body' | 'kind'>;
}) {
  const router = useRouter();
  const { unlocked } = useCurriculumKey();
  const [mode, setMode] = useState<'read' | 'edit' | 'remove'>('read');

  const edit = useMutation({
    mutationFn: (words: CheckInWords) =>
      sendCheckIn('PATCH', { ...words, id: checkIn.id }),
    onSuccess: () => {
      setMode('read');
      router.refresh();
    },
  });

  const remove = useMutation({
    mutationFn: () => sendCheckIn('DELETE', { id: checkIn.id }),
    onSuccess: () => router.refresh(),
  });

  if (unlocked && mode === 'edit') {
    return (
      <CheckInForm
        initial={checkIn}
        submitLabel="Save"
        pendingLabel="Saving…"
        isPending={edit.isPending}
        isError={edit.isError}
        onSubmit={edit.mutate}
        onCancel={() => {
          edit.reset();
          setMode('read');
        }}
      />
    );
  }

  return (
    <>
      <p className="m-0 whitespace-pre-line text-[17px] leading-relaxed">
        {checkIn.body}
      </p>

      {unlocked && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          {mode === 'remove' ? (
            <>
              <span className="font-mono text-[11px] uppercase tracking-[.06em] text-ink">
                Remove?
              </span>
              <button
                type="button"
                className={CONTROL}
                disabled={remove.isPending}
                onClick={() => remove.mutate()}
              >
                {remove.isPending ? 'Removing…' : 'Yes'}
              </button>
              <button
                type="button"
                className={CONTROL}
                disabled={remove.isPending}
                onClick={() => {
                  remove.reset();
                  setMode('read');
                }}
              >
                No
              </button>
              {remove.isError && (
                <span
                  role="alert"
                  className="rounded-md bg-[var(--bad-bg)] px-2 py-0.5 text-[13px] text-[var(--bad-fg)]"
                >
                  That didn&rsquo;t go. Try again.
                </span>
              )}
            </>
          ) : (
            <>
              <button
                type="button"
                className={CONTROL}
                onClick={() => setMode('edit')}
              >
                Edit
              </button>
              <button
                type="button"
                className={CONTROL}
                onClick={() => setMode('remove')}
              >
                Remove
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
