'use client';

import { useId, useState } from 'react';
import { CHECK_IN_LIMIT, type CheckIn } from '@/src/content/curriculum';

/*
The fields a check-in is made of.

Shared by the composer, which files a new one, and a posted check-in's
Edit, which rewords an old one. It holds the words while they're being
typed and hands them up on submit; whoever mounts it owns the saving.
Nothing here is kept if the tab closes — a check-in is posted or it
doesn't exist.
*/

export type CheckInWords = Pick<CheckIn, 'body' | 'kind'>;

/** One call for all three: POST files, PATCH rewords, DELETE takes down. */
export async function sendCheckIn(
  method: 'POST' | 'PATCH' | 'DELETE',
  body: object
) {
  const response = await fetch('/api/curriculum/check-ins', {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error('Failed to save check-in');
  }
}

const KINDS: { value: CheckIn['kind']; label: string }[] = [
  { value: 'update', label: 'Update' },
  { value: 'exam', label: 'Final exam' },
];

interface CheckInFormProps {
  initial?: CheckInWords;
  /** The textarea's id, so the jump link can land the cursor in it. */
  textId?: string;
  submitLabel: string;
  pendingLabel: string;
  isPending: boolean;
  isError: boolean;
  onSubmit: (words: CheckInWords) => void;
  onCancel?: () => void;
  /** Whatever sits above the words: the composer's date and class. */
  children?: React.ReactNode;
}

export default function CheckInForm({
  initial,
  textId,
  submitLabel,
  pendingLabel,
  isPending,
  isError,
  onSubmit,
  onCancel,
  children,
}: CheckInFormProps) {
  const name = useId();
  const [body, setBody] = useState(initial?.body ?? '');
  const [kind, setKind] = useState<CheckIn['kind']>(initial?.kind ?? 'update');

  return (
    <form
      className="flex flex-col gap-3 rounded-[10px] border border-rule-strong bg-card p-4"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({ body: body.trim(), kind });
      }}
    >
      {children}

      <textarea
        id={textId}
        aria-label="Check-in"
        required
        rows={4}
        maxLength={CHECK_IN_LIMIT}
        placeholder="What happened?"
        value={body}
        disabled={isPending}
        onChange={(event) => setBody(event.target.value)}
        className="min-h-[108px] resize-y rounded-lg border border-rule-strong bg-paper px-3.5 py-3 font-body text-[17px] leading-relaxed text-ink placeholder:text-graphite"
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <fieldset
          disabled={isPending}
          className="m-0 flex min-w-0 gap-1.5 border-0 p-0"
        >
          <legend className="sr-only">Kind</legend>
          {KINDS.map((option) => (
            <label
              key={option.value}
              className={`cursor-pointer rounded-md px-2.5 py-2 font-mono text-[11px] uppercase tracking-[.06em] transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ink ${
                kind === option.value
                  ? 'bg-ink text-paper'
                  : 'bg-wash text-pencil hover:text-ink'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={kind === option.value}
                onChange={() => setKind(option.value)}
                className="sr-only"
              />
              {option.label}
            </label>
          ))}
        </fieldset>

        <div className="flex items-center gap-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isPending}
              className="cursor-pointer rounded-lg border border-rule-strong bg-transparent px-[15px] py-[9px] text-[15px] font-semibold text-ink transition-colors hover:bg-wash"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isPending || !body.trim()}
            className="cursor-pointer rounded-lg border-0 bg-ink px-4 py-2.5 text-[15px] font-semibold text-paper transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isPending ? pendingLabel : submitLabel}
          </button>
        </div>
      </div>

      {isError && (
        <p
          role="alert"
          className="m-0 self-start rounded-md bg-[var(--bad-bg)] px-2.5 py-1 text-[13px] text-[var(--bad-fg)]"
        >
          That didn&rsquo;t save. Try again.
        </p>
      )}
    </form>
  );
}
