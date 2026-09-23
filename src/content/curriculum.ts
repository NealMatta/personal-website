/*
The curriculum.

I run my own school. A quarter is thirteen weeks, a class is a syllabus
with a final I either pass or don't, and credits are hours a week — so
four classes at ten credits is ten hours a week I've actually promised.

Everything the Curriculum pages render comes from this file: the quarters,
the classes inside them, every weekly step, and the check-ins. It's typed
data for now rather than a table, so planning a quarter means editing a
list instead of writing a migration. Once the shape stops moving it goes
to a real store and the pages stop importing this file.

What's real here: the classes, the credits, the units, the midterms and
the finals. Weekly steps still in [brackets] are mine to write — same
rule the field notes follow.

To mark a step done, add `done: true` to it. To pass a class, set
`status: 'passed'` and a `passedOn` date; the transcript reads both.
*/

export type CourseStatus =
  | 'in-progress'
  | 'passed'
  | 'incomplete'
  | 'withdrawn'
  | 'planned';

/** A week that's about more than the usual practice. */
export type StepKind = 'midterm' | 'final' | 'buffer';

export interface Step {
  /** Which week of the quarter this step belongs to. One step a week. */
  week: number;
  text: string;
  kind?: StepKind;
  /** Set once it's actually done. */
  done?: boolean;
}

export interface Unit {
  n: number;
  title: string;
  /** First and last week of the quarter this unit covers. */
  from: number;
  to: number;
  steps: Step[];
}

export interface Course {
  /** The URL, e.g. "swm-101". Unique across every quarter. */
  slug: string;
  /** Department code, e.g. "SWM". Shown on the week ribbon. */
  dept: string;
  /** Printed code, e.g. "SWM 101". */
  code: string;
  title: string;
  /** Why I'm taking it, in one line. */
  why: string;
  /** Credits are hours a week. Roughly twelve is a full load. */
  credits: number;
  status: CourseStatus;
  /** ISO date, once the final is passed. */
  passedOn?: string;
  /**
   * The class's color. The only place color lands outside a sky window:
   * an edge, a tint behind a tag, a progress bar — never a surface.
   */
  accent: string;
  tint: string;
  /** The one thing that decides whether I passed. */
  final: string;
  finalWeek: number;
  /** When the final happens, in words, e.g. "Thu Dec 17". */
  finalOn: string;
  midterm: string;
  midtermWeek: number;
  syllabus: {
    /** What I owe this class every week, no matter what. */
    weeklyMinimum: string[];
    whenWhere: string;
  };
  units: Unit[];
}

export interface Quarter {
  /** The URL and the `?quarter=` value, e.g. "q4-2026". */
  slug: string;
  /** Printed label, e.g. "Q4 2026". */
  label: string;
  /** e.g. "Fall quarter". */
  name: string;
  /** e.g. "Oct 1 – Dec 31, 2026". */
  range: string;
  /** ISO date week 1 starts on. */
  startsOn: string;
  weeks: number;
  /**
   * `current` is the quarter in session — the one with a week ribbon.
   * `planning` quarters show their class list and nothing else, because
   * there's nothing to be behind on yet. `past` is transcript only.
   */
  state: 'current' | 'planning' | 'past';
  courses: Course[];
}

export interface CheckIn {
  id: string;
  /** Course slug. A check-in always belongs to a class. */
  course: string;
  /** ISO date. */
  at: string;
  body: string;
  /** An exam check-in is the proof I passed; an update is everything else. */
  kind: 'update' | 'exam';
  /** What each photo shows. Doubles as alt text once there's a src. */
  photos?: { label: string; src?: string }[];
}

/* The five class colors, so a class keeps its color everywhere. */
const ACCENT = {
  swimming: { accent: '#1F6F94', tint: '#DDEBF1' },
  spanish: { accent: '#B3402E', tint: '#F5DFD9' },
  sketching: { accent: '#8A5A2B', tint: '#F1E6D8' },
  flowers: { accent: '#B04C69', tint: '#F4DFE5' },
  cooking: { accent: '#A8761A', tint: '#F4E8CF' },
};

export const QUARTERS: Quarter[] = [
  {
    slug: 'q4-2026',
    label: 'Q4 2026',
    name: 'Fall quarter',
    range: 'Oct 1 – Dec 31, 2026',
    startsOn: '2026-10-01',
    weeks: 13,
    state: 'current',
    courses: [
      {
        slug: 'swm-101',
        dept: 'SWM',
        code: 'SWM 101',
        title: 'Swimming 101',
        why: '[Why this class, in one line.]',
        credits: 4,
        status: 'in-progress',
        ...ACCENT.swimming,
        final: 'One full length unassisted, on video',
        finalWeek: 12,
        finalOn: 'Thu Dec 17',
        midterm: 'Glide + kick a full length with a board',
        midtermWeek: 7,
        syllabus: {
          weeklyMinimum: [
            '[Habit 1 — e.g. two sessions in the pool]',
            '[Habit 2]',
            '[Habit 3]',
          ],
          whenWhere: '[e.g. Tue and Sat mornings, at the pool]',
        },
        units: [
          {
            n: 1,
            title: 'Water comfort',
            from: 1,
            to: 3,
            steps: [
              { week: 1, text: '[Week 1 step]' },
              { week: 2, text: '[Week 2 step]' },
              { week: 3, text: '[Week 3 step]' },
            ],
          },
          {
            n: 2,
            title: 'Kick and glide',
            from: 4,
            to: 7,
            steps: [
              { week: 4, text: '[Week 4 step]' },
              { week: 5, text: '[Week 5 step]' },
              { week: 6, text: '[Week 6 step]' },
              {
                week: 7,
                text: 'Midterm: glide + kick a full length with a board',
                kind: 'midterm',
              },
            ],
          },
          {
            n: 3,
            title: 'Arms and breathing',
            from: 8,
            to: 10,
            steps: [
              { week: 8, text: '[Week 8 step]' },
              { week: 9, text: '[Week 9 step]' },
              { week: 10, text: '[Week 10 step]' },
            ],
          },
          {
            n: 4,
            title: 'Full length',
            from: 11,
            to: 13,
            steps: [
              { week: 11, text: '[Week 11 step]' },
              {
                week: 12,
                text: 'Final: one full length unassisted, on video',
                kind: 'final',
              },
              {
                week: 13,
                text: 'Buffer week: catch up or retake',
                kind: 'buffer',
              },
            ],
          },
        ],
      },
      {
        slug: 'spa-101',
        dept: 'SPA',
        code: 'SPA 101',
        title: 'Spanish 101',
        why: '[Why this class, in one line.]',
        credits: 3,
        status: 'in-progress',
        ...ACCENT.spanish,
        final:
          '2 minutes describing my day, unscripted, plus 3 follow-up questions, on video',
        finalWeek: 12,
        finalOn: 'Week 12',
        midterm: '60-second morning routine',
        midtermWeek: 6,
        syllabus: {
          weeklyMinimum: [
            '[Habit 1 — e.g. fifteen minutes a day]',
            '[Habit 2]',
            '[Habit 3]',
          ],
          whenWhere: '[e.g. weekday mornings, over coffee]',
        },
        units: [
          {
            n: 1,
            title: 'Sounds and basics',
            from: 1,
            to: 3,
            steps: [
              { week: 1, text: '[Week 1 step]' },
              { week: 2, text: '[Week 2 step]' },
              { week: 3, text: '[Week 3 step]' },
            ],
          },
          {
            n: 2,
            title: 'Routines',
            from: 4,
            to: 6,
            steps: [
              { week: 4, text: '[Week 4 step]' },
              { week: 5, text: '[Week 5 step]' },
              {
                week: 6,
                text: 'Midterm: 60-second morning routine',
                kind: 'midterm',
              },
            ],
          },
          {
            n: 3,
            title: 'Describing my day',
            from: 7,
            to: 10,
            steps: [
              { week: 7, text: '[Week 7 step]' },
              { week: 8, text: '[Week 8 step]' },
              { week: 9, text: '[Week 9 step]' },
              { week: 10, text: '[Week 10 step]' },
            ],
          },
          {
            n: 4,
            title: 'Conversation',
            from: 11,
            to: 13,
            steps: [
              { week: 11, text: '[Week 11 step]' },
              {
                week: 12,
                text: 'Final: 2 minutes on my day, unscripted, plus 3 follow-up questions',
                kind: 'final',
              },
              {
                week: 13,
                text: 'Buffer week: catch up or retake',
                kind: 'buffer',
              },
            ],
          },
        ],
      },
      {
        slug: 'skt-101',
        dept: 'SKT',
        code: 'SKT 101',
        title: 'Sketching 101',
        why: '[Why this class, in one line.]',
        credits: 2,
        status: 'in-progress',
        ...ACCENT.sketching,
        final:
          'Ink + watercolor on location in San Diego over New Year’s, in under an hour',
        finalWeek: 13,
        finalOn: 'New Year’s',
        midterm: 'Chicago skyline, on location',
        midtermWeek: 6,
        syllabus: {
          weeklyMinimum: [
            '[Habit 1 — e.g. one page a week]',
            '[Habit 2]',
            '[Habit 3]',
          ],
          whenWhere: '[e.g. Sunday afternoons, wherever I end up]',
        },
        units: [
          {
            n: 1,
            title: 'Lines and shapes',
            from: 1,
            to: 3,
            steps: [
              { week: 1, text: '[Week 1 step]' },
              { week: 2, text: '[Week 2 step]' },
              { week: 3, text: '[Week 3 step]' },
            ],
          },
          {
            n: 2,
            title: 'Perspective and the skyline',
            from: 4,
            to: 6,
            steps: [
              { week: 4, text: '[Week 4 step]' },
              { week: 5, text: '[Week 5 step]' },
              {
                week: 6,
                text: 'Midterm: Chicago skyline, on location',
                kind: 'midterm',
              },
            ],
          },
          {
            n: 3,
            title: 'Ink and watercolor',
            from: 7,
            to: 10,
            steps: [
              { week: 7, text: '[Week 7 step]' },
              { week: 8, text: '[Week 8 step]' },
              { week: 9, text: '[Week 9 step]' },
              { week: 10, text: '[Week 10 step]' },
            ],
          },
          {
            n: 4,
            title: 'Speed on location',
            from: 11,
            to: 13,
            steps: [
              { week: 11, text: '[Week 11 step]' },
              { week: 12, text: '[Week 12 step]' },
              {
                week: 13,
                text: 'Final: ink + watercolor in San Diego, under an hour',
                kind: 'final',
              },
            ],
          },
        ],
      },
      {
        slug: 'flr-101',
        dept: 'FLR',
        code: 'FLR 101',
        title: 'Flower Arranging 101',
        why: '[Why this class, in one line.]',
        credits: 1,
        status: 'in-progress',
        ...ACCENT.flowers,
        final: 'Thanksgiving centerpiece',
        finalWeek: 9,
        finalOn: 'Thu Nov 26',
        midterm: 'Focal, filler and greenery arrangement',
        midtermWeek: 7,
        syllabus: {
          weeklyMinimum: ['[Habit 1]', '[Habit 2]'],
          whenWhere: '[e.g. whenever there are flowers in the house]',
        },
        units: [
          {
            n: 1,
            title: 'Tools and flowers',
            from: 1,
            to: 3,
            steps: [
              { week: 1, text: '[Week 1 step]' },
              { week: 2, text: '[Week 2 step]' },
              { week: 3, text: '[Week 3 step]' },
            ],
          },
          {
            n: 2,
            title: 'Structure',
            from: 4,
            to: 7,
            steps: [
              { week: 4, text: '[Week 4 step]' },
              { week: 5, text: '[Week 5 step]' },
              { week: 6, text: '[Week 6 step]' },
              {
                week: 7,
                text: 'Midterm: focal, filler and greenery arrangement',
                kind: 'midterm',
              },
            ],
          },
          {
            n: 3,
            title: 'Centerpiece',
            from: 8,
            to: 9,
            steps: [
              { week: 8, text: '[Week 8 step]' },
              {
                week: 9,
                text: 'Final: Thanksgiving centerpiece',
                kind: 'final',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'q1-2027',
    label: 'Q1 2027',
    name: 'Winter quarter',
    range: 'Jan 1 – Mar 31, 2027',
    startsOn: '2027-01-01',
    weeks: 13,
    state: 'planning',
    courses: [
      {
        slug: 'cul-101',
        dept: 'CUL',
        code: 'CUL 101',
        title: 'Cooking 101',
        why: '[Why this class, in one line.]',
        credits: 3,
        status: 'planned',
        ...ACCENT.cooking,
        final: 'Host a dinner party with Indian food I cooked',
        finalWeek: 13,
        finalOn: 'Week 13',
        midterm: '[Midterm]',
        midtermWeek: 7,
        syllabus: {
          weeklyMinimum: ['[Habit 1]'],
          whenWhere: '[When and where]',
        },
        /* No syllabus yet — the quarter is still being planned. */
        units: [],
      },
    ],
  },
  {
    slug: 'q2-2027',
    label: 'Q2 2027',
    name: 'Spring quarter',
    range: 'Apr 1 – Jun 30, 2027',
    startsOn: '2027-04-01',
    weeks: 13,
    state: 'planning',
    courses: [],
  },
];

/*
Check-ins. Short updates with photos, filed against a class — each one
counts as attendance for the week it lands in.
*/
export const CHECK_INS: CheckIn[] = [];

/** Roughly a full load. Over this and the quarter is asking too much. */
export const CREDIT_LOAD = 12;

export function quarters(): Quarter[] {
  return QUARTERS;
}

export function getQuarter(slug: string): Quarter | undefined {
  return QUARTERS.find((q) => q.slug === slug);
}

/** The quarter in session, or the next one being planned. */
export function currentQuarter(): Quarter {
  return QUARTERS.find((q) => q.state === 'current') ?? QUARTERS[0];
}

export function getCourse(
  slug: string
): { course: Course; quarter: Quarter } | undefined {
  for (const quarter of QUARTERS) {
    const course = quarter.courses.find((c) => c.slug === slug);
    if (course) return { course, quarter };
  }
  return undefined;
}

export function allCourses(): { course: Course; quarter: Quarter }[] {
  return QUARTERS.flatMap((quarter) =>
    quarter.courses.map((course) => ({ course, quarter }))
  );
}

export function quarterCredits(quarter: Quarter): number {
  return quarter.courses.reduce((n, c) => n + c.credits, 0);
}

export interface QuarterClock {
  /** Before week 1, in session, or finished. */
  phase: 'before' | 'during' | 'after';
  /** The week the quarter is in. 1 before it starts, `weeks` after it ends. */
  week: number;
  /** Days until week 1, when the quarter hasn't started. */
  startsIn: number;
  weekStart: (week: number) => string;
  weekEnd: (week: number) => string;
}

const DAY = 86_400_000;

/** Midnight UTC for an ISO date, so week math never crosses a timezone. */
function utcDay(iso: string): number {
  const [y, m, d] = iso.split('-').map(Number);
  return Date.UTC(y, m - 1, d);
}

function shortDate(ms: number): string {
  return new Date(ms).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

/**
 * Where a quarter is relative to a given day.
 *
 * `now` is passed in rather than read here so the pages decide how fresh
 * this is — they revalidate hourly, which is often enough for a calendar
 * measured in weeks.
 */
export function quarterClock(quarter: Quarter, now: Date): QuarterClock {
  const start = utcDay(quarter.startsOn);
  const weekStart = (week: number) => shortDate(start + (week - 1) * 7 * DAY);
  const weekEnd = (week: number) =>
    shortDate(start + ((week - 1) * 7 + 6) * DAY);

  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const days = Math.floor((today - start) / DAY);

  if (days < 0) {
    return {
      phase: 'before',
      week: 1,
      startsIn: -days,
      weekStart,
      weekEnd,
    };
  }

  const week = Math.floor(days / 7) + 1;

  return {
    phase: week > quarter.weeks ? 'after' : 'during',
    week: Math.min(quarter.weeks, week),
    startsIn: 0,
    weekStart,
    weekEnd,
  };
}

/** "Week 3 of 13", or "Starts in 8 days" before it does. */
export function quarterStatus(clock: QuarterClock, quarter: Quarter): string {
  if (clock.phase === 'before') {
    return clock.startsIn === 1
      ? 'Starts tomorrow'
      : `Starts in ${clock.startsIn} days`;
  }
  if (clock.phase === 'after') return 'Finished';
  return `Week ${clock.week} of ${quarter.weeks}`;
}

export function courseSteps(course: Course): Step[] {
  return course.units.flatMap((u) => u.steps);
}

/** A step's id, derived rather than stored: one step per class per week. */
export function stepKey(course: Course, step: Step): string {
  return `${course.slug}-w${step.week}`;
}

export interface CourseProgress {
  done: number;
  total: number;
  /** Rounded percent, e.g. 45. */
  percent: number;
  /** The first step not done yet. */
  next?: Step;
  /** Steps from earlier weeks still open, once the quarter is running. */
  behind: number;
  /** One entry per unit, for the segmented bar on the class row. */
  units: { n: number; title: string; done: number; total: number }[];
}

export function courseProgress(
  course: Course,
  clock: QuarterClock
): CourseProgress {
  const steps = courseSteps(course);
  const done = steps.filter((s) => s.done).length;

  return {
    done,
    total: steps.length,
    percent: steps.length ? Math.round((done / steps.length) * 100) : 0,
    next: steps.find((s) => !s.done),
    behind:
      clock.phase === 'before'
        ? 0
        : steps.filter((s) => s.week < clock.week && !s.done).length,
    units: course.units.map((u) => ({
      n: u.n,
      title: u.title,
      done: u.steps.filter((s) => s.done).length,
      total: u.steps.length,
    })),
  };
}

/** What a class owes this week. Usually one step; sometimes none. */
export function stepsForWeek(course: Course, week: number): Step[] {
  return courseSteps(course).filter((s) => s.week === week);
}

export function checkInsFor(courseSlug: string): CheckIn[] {
  return CHECK_INS.filter((c) => c.course === courseSlug).sort((a, b) =>
    b.at.localeCompare(a.at)
  );
}

/** Every check-in in a quarter, newest first. */
export function quarterCheckIns(quarter: Quarter): CheckIn[] {
  const slugs = new Set(quarter.courses.map((c) => c.slug));
  return CHECK_INS.filter((c) => slugs.has(c.course)).sort((a, b) =>
    b.at.localeCompare(a.at)
  );
}

/** How a class prints on the transcript. */
export function courseGrade(course: Course): {
  grade: string;
  title: string;
  fg: string;
  bg: string;
} {
  switch (course.status) {
    case 'passed':
      return {
        grade: 'P',
        title: 'Passed',
        fg: '#1E6B3E',
        bg: '#DCEBDD',
      };
    case 'incomplete':
      return {
        grade: 'INC',
        title: 'Incomplete, rolls into next quarter',
        fg: '#9A3324',
        bg: '#F5DFD9',
      };
    case 'withdrawn':
      return { grade: 'W', title: 'Withdrawn', fg: '#4A4640', bg: '#ECE6D8' };
    case 'planned':
      return {
        grade: '—',
        title: 'Not started',
        fg: '#4A4640',
        bg: '#ECE6D8',
      };
    default:
      return {
        grade: 'IP',
        title: 'In progress',
        fg: '#8A4A12',
        bg: '#F6E6CC',
      };
  }
}

/** The short label a class wears at the top of its own page. */
export function courseStatusLabel(course: Course): string {
  switch (course.status) {
    case 'passed':
      return 'Passed';
    case 'incomplete':
      return 'Incomplete';
    case 'withdrawn':
      return 'Withdrawn';
    case 'planned':
      return 'Not started';
    default:
      return 'In progress';
  }
}

export interface TranscriptTotals {
  earned: number;
  attempted: number;
  passed: number;
  classes: number;
  checkIns: number;
}

/** Credits only count once the final is passed. */
export function transcriptTotals(): TranscriptTotals {
  const taken = allCourses().filter(
    ({ quarter }) => quarter.state !== 'planning'
  );
  const passed = taken.filter(({ course }) => course.status === 'passed');

  return {
    earned: passed.reduce((n, { course }) => n + course.credits, 0),
    attempted: taken.reduce((n, { course }) => n + course.credits, 0),
    passed: passed.length,
    classes: taken.length,
    checkIns: CHECK_INS.length,
  };
}

/** "Sep 23, 2026" — the date a check-in prints. */
export function formatCurriculumDay(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
