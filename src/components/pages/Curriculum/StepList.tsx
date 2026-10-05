import type { Course, Step } from '@/src/content/curriculum';
import { stepId, stepKey } from '@/src/content/curriculum';
import StepBox from '@/src/components/pages/Curriculum/StepBox';

/*
A run of weekly steps with their boxes ticked or not.

What's done comes in on each step, already read from the record. For a
visitor the box is decoration — the state is said out loud for a screen
reader, because a line through text is the one thing it can't see. For me,
once the browser is unlocked, `StepBox` turns it into a real checkbox.
*/

interface StepListProps {
  course: Course;
  steps: Step[];
  /** The class page also prints which week each step belongs to. */
  showWeek?: boolean;
  /** Highlights the week in session. */
  currentWeek?: number;
  /** A dashed rule between steps, for a list without week labels. */
  divided?: boolean;
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
  divided = false,
}: StepListProps) {
  return (
    <ul className="m-0 flex list-none flex-col p-0">
      {steps.map((step) => {
        const tag = step.kind ? TAGS[step.kind] : null;

        /* The final wears the class color; the others a quiet tint. */
        const tagStyle =
          step.kind === 'final'
            ? { background: course.accent, color: 'var(--paper)' }
            : step.kind === 'midterm'
              ? { background: course.tint, color: course.accent }
              : { background: 'var(--wash)', color: 'var(--pencil)' };

        return (
          <li
            key={stepKey(course, step)}
            className={`grid grid-cols-[26px_minmax(0,1fr)_auto] items-center gap-3 py-2.5 ${
              showWeek
                ? 'border-b border-dashed border-rule'
                : divided
                  ? 'border-t border-dashed border-rule first:border-t-0'
                  : ''
            }`}
          >
            <StepBox
              course={course.slug}
              step={stepId(step)}
              done={step.done === true}
              label={step.text}
            />

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

            {showWeek ? (
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
