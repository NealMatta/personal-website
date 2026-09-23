'use client';

import Link from 'next/link';
import StatusDot from '@/src/components/reusable/UI/StatusDot';
import { useCommits } from '@/src/lib/github/useCommits';

/*
The second widget in the hero stack: how much I've actually been building.

Five weeks of commits to this repo, as a heat map. The steps are grey, not
green — color on this page belongs to the sky.
*/

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

/* Less → more. The lightest step is an empty day. */
const STEPS = ['#E6E0D2', '#CBC1AB', '#978C76', '#5A5347', '#1C1B19'];

function stepFor(count: number): string {
  if (count === 0) return STEPS[0];
  if (count <= 2) return STEPS[1];
  if (count <= 5) return STEPS[2];
  if (count <= 9) return STEPS[3];
  return STEPS[4];
}

export default function GitHubWidget() {
  const { activity, isLoading, isError } = useCommits(35);

  return (
    <div className="flex h-full flex-col gap-5 rounded-window border border-rule bg-card p-7">
      <div className="flex items-center justify-between">
        <StatusDot status="live" label="GitHub · last 30 days" />
        <Link
          href="https://github.com/NealMatta"
          target="_blank"
          rel="noreferrer"
          className="font-mono text-xs uppercase tracking-[.06em] text-pencil no-underline hover:text-ink"
        >
          @NealMatta ↗
        </Link>
      </div>

      {isError ? (
        <p className="text-[15px] text-pencil">
          Couldn’t reach GitHub just now.
        </p>
      ) : (
        <>
          <div className="flex items-end justify-between">
            <div className="flex items-end gap-3">
              <span className="font-display text-[72px] font-extrabold leading-[.9]">
                {isLoading ? '—' : activity?.total}
              </span>
              <span className="pb-1.5 text-[15px] text-pencil">
                contributions
              </span>
            </div>
            <div className="flex flex-col items-end gap-1 pb-1">
              <span className="font-mono text-[11px] uppercase tracking-[.06em] text-graphite">
                Longest streak
              </span>
              <span className="text-[17px] font-semibold">
                {isLoading ? '—' : `${activity?.longestStreak} days`}
              </span>
            </div>
          </div>

          <div className="flex flex-grow flex-col gap-1.5">
            <div className="grid grid-cols-7 gap-1.5">
              {WEEKDAYS.map((d, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className="text-center font-mono text-[10px] uppercase tracking-[.06em] text-graphite"
                >
                  {d}
                </span>
              ))}
            </div>
            <div
              role="img"
              aria-label={
                activity
                  ? `Contribution map: ${activity.total} contributions over the last 30 days`
                  : 'Contribution map loading'
              }
              className="grid auto-rows-[22px] grid-cols-7 gap-1.5"
            >
              {(activity?.byDay ?? Array.from({ length: 35 })).map((day, i) => (
                <span
                  key={i}
                  className="rounded-[5px]"
                  style={{
                    background:
                      day && typeof day === 'object'
                        ? stepFor(day.count)
                        : STEPS[0],
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-1.5">
            <span className="mr-1 font-mono text-[10px] uppercase tracking-[.06em] text-graphite">
              Less
            </span>
            {STEPS.map((c) => (
              <span
                key={c}
                aria-hidden="true"
                className="h-3 w-3 rounded-[3px]"
                style={{ background: c }}
              />
            ))}
            <span className="ml-1 font-mono text-[10px] uppercase tracking-[.06em] text-graphite">
              More
            </span>
          </div>
        </>
      )}
    </div>
  );
}
