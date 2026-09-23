'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import StatusDot from '@/src/components/reusable/UI/StatusDot';
import InfoTip from '@/src/components/reusable/UI/InfoTip';
import type { TrainAlertData } from '@/src/types/cta';

/*
The next Red Line trains at my stop.

Arrival times come back as local timestamps from the CTA, so the card
turns them into minutes from now and refetches every minute.
*/

const CTA_RED = '#C8102E';

async function fetchArrivals(): Promise<TrainAlertData[]> {
  const response = await fetch('/api/cta/chicagoRedLine');
  if (!response.ok) {
    throw new Error('Failed to fetch CTA arrivals');
  }
  return response.json();
}

/** Whole minutes until arrival; anything under one minute is "Due". */
function minutesAway(arrivalTime: string): string {
  const minutes = Math.round(
    (new Date(arrivalTime).getTime() - Date.now()) / 60_000
  );
  return minutes < 1 ? 'Due' : `${minutes} min`;
}

export default function CTACard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['ctaRedLine'],
    queryFn: fetchArrivals,
    staleTime: 30_000,
    refetchInterval: 60_000,
  });

  const arrivals = (data ?? []).slice(0, 3);

  return (
    <article className="relative flex flex-col gap-5 rounded-xl border border-rule bg-card p-6">
      <div className="flex items-center justify-between">
        <StatusDot
          status="live"
          color={CTA_RED}
          label="Red Line · Chicago stop"
        />
        <InfoTip
          label="How the CTA card is built"
          dataPath="CTA Train Tracker → /api/cta → React Query (60s)"
          stack={['CTA API', 'Polling', 'Server secrets']}
        >
          I fetch CTA Train Tracker arrivals on the server with my API key. The
          card refetches every 60 seconds and treats data as fresh for 30.
        </InfoTip>
      </div>

      {isError ? (
        <p className="text-[15px] text-pencil">
          Couldn’t reach the Train Tracker just now.
        </p>
      ) : isLoading ? (
        <div className="flex flex-col">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex justify-between border-b border-dashed border-rule py-3 last:border-0"
            >
              <span className="text-base font-medium text-graphite">—</span>
            </div>
          ))}
        </div>
      ) : arrivals.length === 0 ? (
        <p className="text-[15px] text-pencil">
          No trains scheduled right now.
        </p>
      ) : (
        <div className="flex flex-col">
          {arrivals.map((train) => (
            <div
              key={train.trainNumber}
              className="flex items-center justify-between border-b border-dashed border-rule py-3 last:border-0"
            >
              <span className="text-base font-medium">
                To {train.destination}
              </span>
              <span className="font-display text-[22px] font-semibold">
                {minutesAway(train.arrivalTime)}
              </span>
            </div>
          ))}
        </div>
      )}

      <Link href="/lab/chicagoCTA" className="text-sm font-medium">
        Open the experiment in the Lab
      </Link>
    </article>
  );
}
