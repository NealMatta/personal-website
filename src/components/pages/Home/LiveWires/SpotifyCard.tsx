'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import StatusDot from '@/src/components/reusable/UI/StatusDot';
import InfoTip from '@/src/components/reusable/UI/InfoTip';
import type { SpotifyOutput } from '@/src/types/spotify';

/*
What I last listened to.

The Spotify Web API sits behind a route handler so the refresh token never
reaches the browser; the access token lives in one Supabase row and is
only refreshed once it has actually expired.
*/

async function fetchRecentSong(): Promise<SpotifyOutput> {
  const response = await fetch('/api/spotify/recentSong');
  if (!response.ok) {
    throw new Error('Failed to fetch recent song');
  }
  return response.json();
}

/** "12 min ago", "3 hours ago", "yesterday". */
function relativeTime(iso: string | null): string | null {
  if (!iso) return null;

  const minutes = Math.round((Date.now() - new Date(iso).getTime()) / 60_000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;

  const days = Math.round(hours / 24);
  return days === 1 ? 'yesterday' : `${days} days ago`;
}

export default function SpotifyCard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['currentlyPlaying'],
    queryFn: fetchRecentSong,
  });

  const when = data?.isPlaying
    ? 'Playing now'
    : relativeTime(data?.playedAt ?? null);

  return (
    <article className="relative flex flex-col gap-5 rounded-xl border border-rule bg-card p-6">
      <div className="flex items-center justify-between">
        <StatusDot
          status="live"
          label={data?.isPlaying ? 'Playing now' : 'Last listened'}
        />
        <InfoTip
          label="How the Spotify card is built"
          dataPath="Spotify API → /api/spotify → Supabase token cache → React Query"
          stack={['Next.js 15', 'Supabase', 'OAuth refresh', 'React Query']}
        >
          I put the Spotify Web API behind a Next.js route handler. I cache the
          access token in Supabase and only refresh it when it expires.
        </InfoTip>
      </div>

      {isError ? (
        <p className="text-[15px] text-pencil">
          Couldn’t reach Spotify just now.
        </p>
      ) : (
        <>
          <div className="flex items-center gap-4">
            <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-lg bg-[#2A2824]">
              {data?.albumCover && (
                <Image
                  src={data.albumCover}
                  alt={`Album art for ${data.album}`}
                  fill
                  sizes="88px"
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex min-w-0 flex-col gap-1">
              <span className="truncate text-xl font-semibold">
                {isLoading ? '—' : data?.songName}
              </span>
              <span className="truncate text-[15px] text-pencil">
                {isLoading ? '' : `${data?.artist} · ${data?.album}`}
              </span>
              {when && (
                <span className="mt-1.5 font-mono text-xs uppercase tracking-[.06em] text-graphite">
                  {when}
                </span>
              )}
            </div>
          </div>

          {data?.url && (
            <Link
              href={data.url}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium"
            >
              Open in Spotify
            </Link>
          )}
        </>
      )}
    </article>
  );
}
