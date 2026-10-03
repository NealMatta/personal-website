import type { CheckIn, Quarter } from '@/src/content/curriculum';
import { formatCurriculumDay } from '@/src/content/curriculum';
import PhotoSlot from '@/src/components/reusable/UI/PhotoSlot';

/*
Check-ins: short updates with photos, filed against a class.

Each one counts as attendance for its week. They're written into the
curriculum file for now, so this is the reading end of the thing — the
writing end arrives with the store.
*/

interface CheckInFeedProps {
  quarter: Quarter;
  checkIns: CheckIn[];
}

export default function CheckInFeed({ quarter, checkIns }: CheckInFeedProps) {
  const courseOf = (slug: string) =>
    quarter.courses.find((c) => c.slug === slug);

  return (
    <section className="grid grid-cols-1 gap-8 px-6 pb-20 pt-[72px] lg:grid-cols-12 lg:gap-x-8 lg:px-16">
      <div className="flex flex-col gap-4 lg:col-span-4">
        <h2 className="m-0 font-display text-3xl font-extrabold leading-tight lg:text-[40px]">
          Check-ins
        </h2>
        <p className="m-0 text-base leading-relaxed text-pencil">
          Short updates with photos. Each one counts as attendance for its
          class.
        </p>
      </div>

      <div className="flex flex-col border-t-2 border-ink lg:col-span-8 lg:col-start-5">
        {checkIns.length === 0 ? (
          <div className="flex flex-col gap-2 py-10">
            <span className="font-display text-2xl font-bold">
              No check-ins yet
            </span>
            <span className="max-w-[520px] text-base leading-relaxed text-pencil">
              The first one goes up in week 1. Photos from the pool, a page of
              sketches, a voice memo in Spanish: anything that shows up counts.
            </span>
          </div>
        ) : (
          checkIns.map((checkIn) => {
            const course = courseOf(checkIn.course);

            return (
              <article
                key={checkIn.id}
                className="grid grid-cols-1 gap-3 border-b border-rule py-6 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-6"
              >
                <div className="flex flex-col gap-2">
                  <span
                    className="font-mono text-xs font-medium uppercase tracking-[.06em]"
                    style={{ color: course?.accent }}
                  >
                    {course?.code ?? checkIn.course}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[.06em] text-graphite">
                    {formatCurriculumDay(checkIn.at)}
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  <p className="m-0 whitespace-pre-line text-[17px] leading-relaxed">
                    {checkIn.body}
                  </p>

                  {checkIn.photos && checkIn.photos.length > 0 && (
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                      {checkIn.photos.map((photo) => (
                        <PhotoSlot
                          key={photo.label}
                          label={photo.label}
                          src={photo.src}
                          className="h-[140px] rounded-lg"
                          sizes="(max-width: 640px) 50vw, 220px"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
