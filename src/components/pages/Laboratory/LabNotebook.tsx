'use client';

import { useQuery } from '@tanstack/react-query';
import Chip from '@/src/components/reusable/UI/Chip';
import type { Commit } from '@/src/apiManagement/githubAPI';
import { EXPERIMENTS } from '@/src/content/experiments';

/*
The lab notebook: recent commits, pulled from GitHub.

Which experiment a commit belongs to is guessed from its message, since
the commits themselves carry no label. Anything that doesn't match an
experiment is just work on the site.
*/

/* Words that point at an experiment, beyond its own name. */
const HINTS: Record<string, string[]> = {
  'Chicago CTA': ['cta', 'train', 'red line'],
  'Now playing': ['spotify', 'token', 'now playing'],
  'Site status': ['commit', 'github', 'status'],
  'Home dashboard': ['dashboard'],
  'Sky clock': ['sky', 'timezone', 'time zone', 'greeting', 'clock', 'cloud'],
};

function experimentFor(message: string): string {
  const text = message.toLowerCase();

  for (const experiment of EXPERIMENTS) {
    const needles = [
      experiment.name.toLowerCase(),
      ...(HINTS[experiment.name] ?? []),
    ];
    if (needles.some((n) => text.includes(n))) return experiment.name;
  }

  return 'Site';
}

async function fetchCommits(): Promise<Commit[]> {
  const response = await fetch('/api/github/commits');
  if (!response.ok) {
    throw new Error('Failed to fetch commits');
  }
  return response.json();
}

export default function LabNotebook() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['commits'],
    queryFn: fetchCommits,
  });

  const recent = (data ?? [])
    .slice()
    .sort((a, b) => b.commit.author.date.localeCompare(a.commit.author.date))
    .slice(0, 8);

  return (
    <section className="grid grid-cols-1 gap-8 px-6 pb-16 lg:grid-cols-12 lg:gap-x-6 lg:px-16">
      <div className="flex flex-col gap-3 border-t-2 border-ink pt-5 lg:col-span-4">
        <h2 className="m-0 font-display text-4xl font-extrabold">
          Lab notebook
        </h2>
        <p className="m-0 text-base leading-relaxed text-pencil">
          Recent commits, pulled from GitHub and grouped by experiment.
        </p>
      </div>

      <div className="flex flex-col border-t-2 border-ink lg:col-span-8">
        {isError ? (
          <p className="py-4 text-[15px] text-pencil">
            Couldn’t reach GitHub just now.
          </p>
        ) : isLoading ? (
          <p className="py-4 font-mono text-xs uppercase tracking-[.06em] text-graphite">
            Loading the log…
          </p>
        ) : recent.length === 0 ? (
          <p className="py-4 text-[15px] text-pencil">
            No commits in the last 30 days.
          </p>
        ) : (
          recent.map((commit) => {
            // The first line is the summary; the rest is the body.
            const message = commit.commit.message.split('\n')[0];
            return (
              <div
                key={commit.sha}
                className="grid grid-cols-1 items-baseline gap-2 border-b border-rule py-4 sm:grid-cols-[110px_90px_minmax(0,1fr)_160px] sm:gap-5"
              >
                <span className="font-mono text-xs uppercase tracking-[.06em] text-graphite">
                  {new Date(commit.commit.author.date).toLocaleDateString(
                    'en-US',
                    { month: 'short', day: 'numeric' }
                  )}
                </span>
                <span className="font-mono text-xs text-pencil">
                  {commit.sha.slice(0, 7)}
                </span>
                <span className="text-base">{message}</span>
                <span className="sm:justify-self-end">
                  <Chip>{experimentFor(message)}</Chip>
                </span>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
