import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Tape from '@/src/components/reusable/UI/Tape';
import QuarterSwitcher from '@/src/components/pages/Curriculum/QuarterSwitcher';
import WeekRibbon from '@/src/components/pages/Curriculum/WeekRibbon';
import ThisWeek from '@/src/components/pages/Curriculum/ThisWeek';
import ClassRows from '@/src/components/pages/Curriculum/ClassRows';
import CheckInFeed from '@/src/components/pages/Curriculum/CheckInFeed';
import PlannedClasses from '@/src/components/pages/Curriculum/PlannedClasses';
import {
  CREDIT_LOAD,
  currentQuarter,
  getQuarter,
  quarterCheckIns,
  quarterClock,
  quarterCredits,
  quarterStatus,
  quarters,
} from '@/src/content/curriculum';

export const metadata: Metadata = {
  title: 'Curriculum — Neal Matta',
  description:
    'I run my own school: thirteen-week quarters, a syllabus per class, and a final I either pass or I don’t.',
};

/*
Which week the quarter is in changes once a week, so an hour-old page is
plenty fresh — and it keeps the page from being frozen at build time.
*/
export const revalidate = 3600;

type Search = Promise<{ quarter?: string }>;

export default async function Curriculum({
  searchParams,
}: {
  searchParams: Search;
}) {
  const requested = (await searchParams).quarter;
  const quarter = requested ? getQuarter(requested) : currentQuarter();

  if (!quarter) {
    notFound();
  }

  const clock = quarterClock(quarter, new Date());
  const credits = quarterCredits(quarter);
  const passed = quarter.courses.filter((c) => c.status === 'passed').length;
  const inSession = quarter.state === 'current';

  return (
    <>
      <section className="mx-6 grid grid-cols-1 items-end gap-8 pb-10 pt-14 lg:mx-16 lg:grid-cols-12 lg:gap-x-6">
        <div className="flex flex-col gap-4 lg:col-span-7">
          <span className="font-mono text-xs uppercase tracking-[.06em] text-graphite">
            {quarter.name} · {quarter.range}
          </span>

          <div className="flex flex-wrap items-center gap-6">
            <QuarterSwitcher quarters={quarters()} current={quarter} />
            <Tape tilt={-2}>
              {inSession ? quarterStatus(clock, quarter) : 'Planning'}
            </Tape>
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:col-span-5 lg:border-l-2 lg:border-ink lg:pl-7">
          <dl className="m-0 grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <dd className="m-0 font-display text-4xl font-semibold leading-none lg:text-5xl">
                {quarter.courses.length}
              </dd>
              <dt className="font-mono text-[11px] uppercase tracking-[.06em] text-graphite">
                Classes
              </dt>
            </div>

            <div className="flex flex-col gap-1">
              <dd className="m-0 font-display text-4xl font-semibold leading-none lg:text-5xl">
                {credits}
              </dd>
              <dt className="font-mono text-[11px] uppercase tracking-[.06em] text-graphite">
                Credits
              </dt>
            </div>

            <div className="flex flex-col gap-1">
              <dd className="m-0 font-display text-4xl font-semibold leading-none lg:text-5xl">
                {inSession ? passed : clock.startsIn}
                {inSession && (
                  <span className="text-2xl text-[#9A948A]">
                    /{quarter.courses.length}
                  </span>
                )}
              </dd>
              <dt className="font-mono text-[11px] uppercase tracking-[.06em] text-graphite">
                {inSession ? 'Finals passed' : 'Days until it starts'}
              </dt>
            </div>
          </dl>

          {credits > CREDIT_LOAD && (
            <span className="rounded-lg bg-[#F6E6CC] px-3 py-2 text-sm text-[#8A4A12]">
              Over ~{CREDIT_LOAD} credits. That&rsquo;s more than {CREDIT_LOAD}{' '}
              hours a week on top of everything else.
            </span>
          )}

          <Link
            href="/curriculum/transcript"
            className="sky-link self-start text-[15px] font-semibold no-underline"
          >
            Transcript →
          </Link>
        </div>
      </section>

      {inSession ? (
        <>
          <WeekRibbon quarter={quarter} clock={clock} />
          <ThisWeek quarter={quarter} clock={clock} />
          <ClassRows quarter={quarter} clock={clock} />
          <CheckInFeed quarter={quarter} checkIns={quarterCheckIns(quarter)} />
        </>
      ) : (
        <PlannedClasses quarter={quarter} />
      )}
    </>
  );
}
