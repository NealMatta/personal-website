import Breadcrumb from '@/src/components/reusable/UI/Breadcrumb';
import PhotoSlot from '@/src/components/reusable/UI/PhotoSlot';
import StepList from '@/src/components/pages/Curriculum/StepList';
import type { Course, Quarter, QuarterClock } from '@/src/content/curriculum';
import {
  checkInsFor,
  courseGrade,
  courseProgress,
  courseStatusLabel,
  formatCurriculumDay,
} from '@/src/content/curriculum';

/*
One class.

The syllabus on the left, the exam on the right. Everything a class is
promised to be — the units, the weekly steps, the midterm and the final —
and the check-ins that prove I showed up.
*/

interface ClassDetailProps {
  course: Course;
  quarter: Quarter;
  clock: QuarterClock;
}

export default function ClassDetail({
  course,
  quarter,
  clock,
}: ClassDetailProps) {
  const progress = courseProgress(course, clock);
  const grade = courseGrade(course);
  const checkIns = checkInsFor(course.slug);
  const passed = course.status === 'passed';
  const running = quarter.state === 'current';

  return (
    <>
      <section className="mx-6 flex flex-col gap-4 border-b-2 border-ink pb-10 pt-10 lg:mx-16">
        <Breadcrumb
          trail={[
            { label: 'Curriculum', href: '/curriculum' },
            {
              label: quarter.label,
              href: `/curriculum?quarter=${quarter.slug}`,
            },
            { label: course.code },
          ]}
        />

        <div className="flex flex-wrap items-center gap-3">
          <span
            className="rounded-md px-2.5 py-1.5 font-mono text-xs font-medium uppercase tracking-[.06em]"
            style={{ background: course.tint, color: course.accent }}
          >
            {course.credits} credits
          </span>
          <span
            className="rounded-md px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[.06em]"
            style={{ background: grade.bg, color: grade.fg }}
          >
            {courseStatusLabel(course)}
          </span>
        </div>

        <h1 className="m-0 font-display text-5xl font-extrabold leading-none tracking-[-.02em] sm:text-7xl lg:text-[88px]">
          {course.title}
        </h1>

        <p className="m-0 max-w-[720px] text-lg leading-relaxed text-pencil lg:text-xl">
          {course.why}
        </p>
      </section>

      <section className="grid grid-cols-1 items-start gap-10 px-6 pb-20 pt-12 lg:grid-cols-12 lg:gap-x-10 lg:px-16">
        <div className="flex flex-col gap-5 lg:col-span-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="m-0 font-display text-3xl font-extrabold lg:text-4xl">
              Units
            </h2>
            <span className="font-mono text-xs uppercase tracking-[.06em] text-graphite">
              One step a week · {progress.done} of {progress.total} done
            </span>
          </div>

          {course.units.length === 0 ? (
            <p className="m-0 rounded-[10px] border border-dashed border-[#9A948A] p-6 text-base leading-relaxed text-pencil">
              No syllabus yet. This class is planned for {quarter.label}; the
              units get written before the quarter starts.
            </p>
          ) : (
            course.units.map((unit) => {
              const done = unit.steps.filter((s) => s.done).length;

              return (
                <div
                  key={unit.n}
                  className="flex flex-col rounded-[10px] border border-rule bg-card px-6 pb-3.5 pt-5"
                  style={{ borderLeft: `5px solid ${course.accent}` }}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-rule pb-2">
                    <div className="flex items-baseline gap-3">
                      <span
                        className="font-mono text-xs font-medium uppercase tracking-[.06em]"
                        style={{ color: course.accent }}
                      >
                        Unit {unit.n}
                      </span>
                      <span className="font-display text-[22px] font-bold">
                        {unit.title}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] uppercase tracking-[.06em] text-graphite">
                      Weeks {unit.from}–{unit.to} · {done}/{unit.steps.length}
                    </span>
                  </div>

                  <StepList
                    course={course}
                    steps={unit.steps}
                    showWeek
                    currentWeek={running ? clock.week : undefined}
                  />
                </div>
              );
            })
          )}

          <div className="mt-9 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="m-0 font-display text-3xl font-extrabold lg:text-4xl">
              Check-ins
            </h2>
            <span className="font-mono text-xs uppercase tracking-[.06em] text-graphite">
              {checkIns.length}{' '}
              {checkIns.length === 1 ? 'check-in' : 'check-ins'}
            </span>
          </div>

          {checkIns.length === 0 ? (
            <p className="m-0 py-2 text-base text-pencil">
              No check-ins yet. The first one counts as attendance for week 1.
            </p>
          ) : (
            checkIns.map((checkIn) => (
              <article
                key={checkIn.id}
                className="grid grid-cols-1 gap-3 border-t border-rule py-5 sm:grid-cols-[120px_minmax(0,1fr)] sm:gap-5"
              >
                <div className="flex flex-col items-start gap-1.5">
                  <span className="font-mono text-[11px] uppercase tracking-[.06em] text-graphite">
                    {formatCurriculumDay(checkIn.at)}
                  </span>
                  <span
                    className="rounded px-2 py-[3px] font-mono text-[11px] uppercase tracking-[.06em]"
                    style={
                      checkIn.kind === 'exam'
                        ? { background: '#DCEBDD', color: '#1E6B3E' }
                        : { background: '#ECE6D8', color: 'var(--pencil)' }
                    }
                  >
                    {checkIn.kind === 'exam' ? 'Final exam' : 'Update'}
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
                          sizes="(max-width: 640px) 50vw, 200px"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))
          )}
        </div>

        <aside className="flex flex-col gap-6 lg:col-span-4 lg:col-start-9">
          <div
            className="relative flex flex-col gap-3.5 rounded-xl bg-card px-6 pb-6 pt-7"
            style={{
              border: passed
                ? '2px solid #1E6B3E'
                : `2px dashed ${course.accent}`,
            }}
          >
            {passed && course.passedOn && (
              <span
                className="absolute -top-3.5 right-4 rounded-md border-2 border-[#1E6B3E] bg-[#DCEBDD] px-3 py-2 font-mono text-[13px] font-medium uppercase tracking-[.06em] text-[#1E6B3E]"
                style={{ transform: 'rotate(-4deg)' }}
              >
                Passed · {formatCurriculumDay(course.passedOn)}
              </span>
            )}

            <span className="font-mono text-xs uppercase tracking-[.06em] text-graphite">
              Final exam · Wk {course.finalWeek} · {course.finalOn}
            </span>
            <span className="font-display text-2xl font-bold leading-snug">
              {course.final}
            </span>

            <div className="flex flex-col gap-1 border-t border-dashed border-rule pt-3">
              <span className="font-mono text-[11px] uppercase tracking-[.06em] text-graphite">
                Midterm · Wk {course.midtermWeek}
              </span>
              <span className="text-[15px] leading-snug">{course.midterm}</span>
            </div>
          </div>

          <div className="flex flex-col gap-[18px] rounded-xl border border-rule p-6">
            <h2 className="m-0 font-display text-2xl font-extrabold">
              Syllabus
            </h2>

            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] uppercase tracking-[.06em] text-graphite">
                Weekly minimum
              </span>
              {course.syllabus.weeklyMinimum.map((habit) => (
                <span key={habit} className="text-[15px] leading-relaxed">
                  {habit}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] uppercase tracking-[.06em] text-graphite">
                When and where
              </span>
              <span className="text-[15px] leading-relaxed">
                {course.syllabus.whenWhere}
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] uppercase tracking-[.06em] text-graphite">
                Credits
              </span>
              <span className="text-[15px]">
                {course.credits} · about {course.credits} hours a week
              </span>
            </div>

            {progress.total > 0 && (
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[11px] uppercase tracking-[.06em] text-graphite">
                  Progress · {progress.percent}%
                </span>
                <span
                  className="block h-2 overflow-hidden rounded-full"
                  style={{ background: course.tint }}
                >
                  <span
                    className="block h-full rounded-full"
                    style={{
                      width: `${progress.percent}%`,
                      background: course.accent,
                    }}
                  />
                </span>
              </div>
            )}
          </div>
        </aside>
      </section>
    </>
  );
}
