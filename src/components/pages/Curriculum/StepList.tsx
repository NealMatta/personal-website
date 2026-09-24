import type { Course, Step } from '@/src/content/curriculum';
import { stepKey } from '@/src/content/curriculum';

/*
A run of weekly steps with their boxes ticked or not.

The boxes are drawn, not clickable: what's done lives in the curriculum
file, so this reads the record rather than keeping one. The box is
decoration — the state is said out loud for a screen reader, because a
line through text is the one thing it can't see.
*/

interface StepListProps {
  course: Course;
  steps: Step[];
  /** The class page also prints which week each step belongs to. */
  showWeek?: boolean;
  /** Highlights the week in session. */
  currentWeek?: number;
}

const TAGS = {
  midterm: 'Midterm',
  final: 'Final',
  buffer: 'Buffer',
} as const;

export default function StepList({
  course,
  steps,
  showWeek = false,
  currentWeek,
}: StepListProps) {
  return (
    <ul className="m-0 flex list-none flex-col p-0">
      {steps.map((step) => {
        const tag = step.kind ? TAGS[step.kind] : null;

        /* The final wears the class color; the others a quiet tint. */
        const tagStyle =
          step.kind === 'final'
            ? { background: course.accent, color: '#FFFFFF' }
            : step.kind === 'midterm'
              ? { background: course.tint, color: course.accent }
              : { background: '#ECE6D8', color: 'var(--pencil)' };

        return (
          <li
            key={stepKey(course, step)}
            className={`grid grid-cols-[26px_minmax(0,1fr)_auto] items-center gap-3 py-2.5 ${
              showWeek ? 'border-b border-dashed border-[#E2DCCF]' : ''
            }`}
          >
            <span
              aria-hidden="true"
              className="flex h-[22px] w-[22px] items-center justify-center rounded-md border-2 border-ink"
              style={step.done ? { background: 'var(--ink)' } : undefined}
            >
              {step.done && (
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

            <span className="flex flex-wrap items-center gap-2.5">
              {tag && (
                <span
                  className="rounded px-2 py-[3px] font-mono text-[11px] uppercase tracking-[.06em]"
                  style={tagStyle}
                >
                  {tag}
                </span>
              )}
              <span
                className={`leading-snug ${showWeek ? 'text-base' : 'text-[15px]'} ${
                  step.done ? 'text-graphite line-through' : ''
                }`}
              >
                <span className="sr-only">
                  {step.done ? 'Done: ' : 'Not done yet: '}
                </span>
                {step.text}
              </span>
            </span>

            {showWeek && step.week != null ? (
              <span
                className={`font-mono text-[11px] uppercase tracking-[.06em] ${
                  step.week === currentWeek
                    ? 'font-semibold text-ink'
                    : 'text-graphite'
                }`}
              >
                Wk {step.week}
              </span>
            ) : (
              <span />
            )}
          </li>
        );
      })}
    </ul>
  );
}
