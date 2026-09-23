'use client';

import Link from 'next/link';
import StatusDot from '@/src/components/reusable/UI/StatusDot';
import InfoTip from '@/src/components/reusable/UI/InfoTip';
import { useCommits } from '@/src/lib/github/useCommits';

/*
How active the build is: commits to this repo over the last 30 days, as a
count and a row of bars.
*/

export default function SiteStatusCard() {
  const { activity, isLoading, isError } = useCommits(30);

  // Scale the bars to the busiest day so a quiet month still reads.
  const busiest = Math.max(1, ...(activity?.byDay ?? []).map((d) => d.count));

  return (
    <article className="relative flex flex-col gap-5 rounded-xl border border-rule bg-card p-6">
      <div className="flex items-center justify-between">
        <StatusDot status="live" label="Site status · deployed" />
        <InfoTip
          label="How the site status card is built"
          dataPath="GitHub API → /api/github/commits → React Query → this card"
          stack={['GitHub REST', 'Route handlers', 'TypeScript']}
        >
          I use the GitHub REST API to count commits to this repo over the last
          30 days. A server route keeps my token off the client, and the card
          polls for new commits.
        </InfoTip>
      </div>

      {isError ? (
        <p className="text-[15px] text-pencil">
          Couldn’t reach GitHub just now.
        </p>
      ) : (
        <>
          <div className="flex items-end gap-4">
            <span className="font-display text-[72px] font-extrabold leading-[.9]">
              {isLoading ? '—' : activity?.total}
            </span>
            <span className="pb-1.5 text-[15px] text-pencil">
              commits in the last 30 days
            </span>
          </div>

          <div
            aria-hidden="true"
            className="grid h-7 items-end gap-[3px]"
            style={{ gridTemplateColumns: 'repeat(30, minmax(0, 1fr))' }}
          >
            {(activity?.byDay ?? Array.from({ length: 30 })).map((day, i) => {
              const count = day && typeof day === 'object' ? day.count : 0;
              // Every day gets a visible tick, even an empty one.
              const height = count === 0 ? 8 : 8 + (count / busiest) * 92;
              return (
                <span
                  key={i}
                  className="rounded-[1px] bg-ink"
                  style={{
                    height: `${height}%`,
                    opacity: count === 0 ? 0.18 : 1,
                  }}
                />
              );
            })}
          </div>

          <Link
            href="https://github.com/NealMatta/personal-website"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium"
          >
            View the repo on GitHub
          </Link>
        </>
      )}
    </article>
  );
}
