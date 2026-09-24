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

The quarters and classes here are copied from the Curriculum artifact,
which is the source of truth until the Firebase move — edit there first.

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
  /**
   * Which week of the quarter this step belongs to — usually one a week,
   * sometimes every other. A planned class can leave it off until the
   * quarter's weeks are laid out.
   */
  week?: number;
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
        why: 'Get comfortable in the water, enough to swim a full lap on my own.',
        credits: 4,
        status: 'in-progress',
        ...ACCENT.swimming,
        final:
          'Swim one full length of the pool unassisted: no wall, no board, no standing. On video.',
        finalWeek: 12,
        finalOn: 'Thu Dec 17',
        midterm: 'Glide + kick a full length with a board, no stops',
        midtermWeek: 7,
        syllabus: {
          weeklyMinimum: [
            'Thursday swim class',
            'One solo practice swim, 30 minutes',
            'Quick check-in after class',
          ],
          whenWhere:
            'Thursdays: swim class at Lakeview Athletic Club (Tuesdays are volleyball)',
        },
        units: [
          {
            n: 1,
            title: 'Get in the water',
            from: 1,
            to: 3,
            steps: [
              {
                week: 1,
                text: 'Sign up for the free month + Thursday class; get goggles, cap, suit',
              },
              {
                week: 2,
                text: 'Exhale underwater: 10 bubble bobs holding the wall',
              },
              {
                week: 3,
                text: 'Front and back float, 5 seconds each, on your own',
              },
            ],
          },
          {
            n: 2,
            title: 'Glide & kick',
            from: 4,
            to: 7,
            steps: [
              {
                week: 4,
                text: 'Push off the wall and glide; decide on a membership before the free month ends',
              },
              { week: 5, text: 'Flutter kick with a board, half a length' },
              { week: 6, text: 'Flutter kick with a board, a full length' },
              {
                week: 7,
                text: 'Glide + kick a full length with a board, no stops',
                kind: 'midterm',
              },
            ],
          },
          {
            n: 3,
            title: 'Stroke & breath',
            from: 8,
            to: 10,
            steps: [
              { week: 8, text: 'Freestyle arms with a pull buoy' },
              {
                week: 9,
                text: 'Thanksgiving week: no Thursday class, one solo practice swim',
              },
              {
                week: 10,
                text: 'Arms and side-breathing together, half a length',
              },
            ],
          },
          {
            n: 4,
            title: 'The full length',
            from: 11,
            to: 13,
            steps: [
              { week: 11, text: 'Full length with fins or a spotter' },
              {
                week: 12,
                text: 'FINAL: full length unassisted, filmed',
                kind: 'final',
              },
              {
                week: 13,
                text: 'Holiday week: rest, or a celebration swim',
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
        why: 'Travel with a sketchbook and come home with drawings of skylines and landscapes.',
        credits: 2,
        status: 'in-progress',
        ...ACCENT.sketching,
        final:
          "On location in San Diego over New Year's: one ink sketch in my travel sketchbook, finished in under an hour.",
        finalWeek: 13,
        finalOn: 'Thu Dec 31',
        midterm:
          'Chicago skyline on location in the travel sketchbook, Riverwalk or lakefront, under an hour',
        midtermWeek: 6,
        syllabus: {
          weeklyMinimum: [
            'The book, every day, 15–20 minutes. Missed a day? Pick up at the next lesson, no make-ups',
            'From Wk 4: one quick sketch a week in the travel sketchbook',
            'Optional: a Draw Like a Sir video when a topic needs more',
          ],
          whenWhere:
            "Every day at home with This Is Not a Sketchbook, It's an Art Class (arrives Oct 1); a small travel sketchbook out and about from Wk 4",
        },
        units: [
          {
            n: 1,
            title: 'The book: first chapters',
            from: 1,
            to: 5,
            steps: [
              {
                week: 1,
                text: 'Book arrives Oct 1: start lesson 1 and photograph the table of contents',
              },
              {
                week: 2,
                text: 'Daily book lessons (chapters to fill in from the table of contents)',
              },
              {
                week: 3,
                text: 'Daily book lessons (chapters to fill in from the table of contents)',
              },
              {
                week: 4,
                text: 'Buy a small travel sketchbook; first quick sketch in it',
              },
              {
                week: 5,
                text: 'Daily book lessons (chapters to fill in from the table of contents)',
              },
            ],
          },
          {
            n: 2,
            title: 'Midterm',
            from: 6,
            to: 6,
            steps: [
              {
                week: 6,
                text: 'Chicago skyline on location in the travel sketchbook, Riverwalk or lakefront, under an hour',
                kind: 'midterm',
              },
            ],
          },
          {
            n: 3,
            title: 'The book, continued',
            from: 7,
            to: 11,
            steps: [
              {
                week: 7,
                text: 'Daily book lessons (chapters to fill in from the table of contents)',
              },
              {
                week: 8,
                text: 'Daily book lessons (chapters to fill in from the table of contents)',
              },
              {
                week: 9,
                text: 'Daily book lessons; Thanksgiving sketch, low pressure',
              },
              {
                week: 10,
                text: 'Daily book lessons (chapters to fill in from the table of contents)',
              },
              {
                week: 11,
                text: 'Daily book lessons (chapters to fill in from the table of contents)',
              },
            ],
          },
          {
            n: 4,
            title: 'Finish & field work',
            from: 12,
            to: 13,
            steps: [
              {
                week: 12,
                text: 'Finish the book; one timed 30-minute sketch; pack the travel sketchbook',
              },
              {
                week: 13,
                text: 'FINAL in San Diego: sketch on location in the travel sketchbook, under an hour',
                kind: 'final',
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
        why: 'Talk about my own life in Spanish without reaching for a script.',
        credits: 3,
        status: 'in-progress',
        ...ACCENT.spanish,
        final:
          'Describe my day in Spanish for 2 minutes with no script, then answer 3 follow-up questions from my tutor or partner. On video.',
        finalWeek: 12,
        finalOn: 'Sun Dec 20',
        midterm: '60-second morning routine from notes',
        midtermWeek: 6,
        syllabus: {
          weeklyMinimum: [
            'One chapter + its vocabulary',
            'One speaking session, recorded',
            "Post the recording as this week's video",
          ],
          whenWhere:
            'On my own, plus one weekly speaking session with a tutor or partner',
        },
        units: [
          {
            n: 1,
            title: 'Foundations',
            from: 1,
            to: 4,
            steps: [
              {
                week: 1,
                text: 'Pick a textbook or course; book a weekly tutor or partner; record a 20-second intro',
              },
              {
                week: 2,
                text: 'Numbers and telling time: what time I do things',
              },
              {
                week: 3,
                text: 'Ser vs. estar: describe myself and where I am',
              },
              { week: 4, text: 'Regular present tense: -ar, -er, -ir' },
            ],
          },
          {
            n: 2,
            title: 'Daily routine',
            from: 5,
            to: 6,
            steps: [
              {
                week: 5,
                text: 'Reflexive verbs: me levanto, me ducho, me visto',
              },
              {
                week: 6,
                text: '60-second morning routine from notes',
                kind: 'midterm',
              },
            ],
          },
          {
            n: 3,
            title: 'Work, food & plans',
            from: 7,
            to: 10,
            steps: [
              { week: 7, text: 'Irregulars: ir, tener, hacer, querer, poder' },
              {
                week: 8,
                text: 'Connectors: primero, luego, después, por la noche',
              },
              {
                week: 9,
                text: 'Thanksgiving week: food and family vocab, lighter week',
              },
              { week: 10, text: 'Describe my job in simple Spanish' },
            ],
          },
          {
            n: 4,
            title: 'Unscripted',
            from: 11,
            to: 13,
            steps: [
              { week: 11, text: 'Full day from bullet points only, 2 minutes' },
              {
                week: 12,
                text: 'FINAL: 2 minutes unscripted + 3 follow-up questions, on video',
                kind: 'final',
              },
              {
                week: 13,
                text: 'Holiday week: one fun conversation, no homework',
                kind: 'buffer',
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
        why: 'Put together arrangements that look intentional.',
        credits: 1,
        status: 'in-progress',
        ...ACCENT.flowers,
        final: 'Make the centerpiece for the Thanksgiving table.',
        finalWeek: 9,
        finalOn: 'Thu Nov 26',
        midterm:
          'Focal, filler and greenery in one arrangement, designed from scratch',
        midtermWeek: 7,
        syllabus: {
          weeklyMinimum: [
            "Flower weeks (1, 3, 5, 7, 9): up to $50 at Trader Joe's — condition, sort by role, build big to small",
            'Post a front + side photo with the recipe, what worked, and one thing to change',
            'Learning weeks: one or two short videos on the next topic, plus fresh water and a recut',
          ],
          whenWhere:
            "On my own, every other week, with Trader Joe's flowers (up to $50 a haul); Flower Moxie and FlowerSchool videos in between",
        },
        units: [
          {
            n: 1,
            title: 'Tools & care',
            from: 1,
            to: 2,
            steps: [
              {
                week: 1,
                text: 'Flower day: buy floral shears, a medium vase and clear tape; condition one single-variety bunch and arrange it at 1.5× the vase height',
              },
              {
                week: 2,
                text: 'Learn: videos on conditioning and flower roles (focal, line, filler, greenery); refresh the water and recut',
              },
            ],
          },
          {
            n: 2,
            title: 'The recipe',
            from: 3,
            to: 4,
            steps: [
              {
                week: 3,
                text: 'Flower day: pull a mixed haul apart, sort it by role and rebuild it on a tape grid, greenery first',
              },
              {
                week: 4,
                text: 'Learn: videos on shape — odd numbers, varying heights, an off-center focal; refresh the water',
              },
            ],
          },
          {
            n: 3,
            title: 'Shape',
            from: 5,
            to: 6,
            steps: [
              {
                week: 5,
                text: 'Flower day: split one haul into two arrangements, a tall vase and a trio of bud vases',
              },
              {
                week: 6,
                text: 'Learn: a centerpiece tutorial; write down your midterm recipe',
              },
            ],
          },
          {
            n: 4,
            title: 'Midterm & centerpiece',
            from: 7,
            to: 9,
            steps: [
              {
                week: 7,
                text: 'Focal, filler and greenery in one arrangement, designed from scratch',
                kind: 'midterm',
              },
              {
                week: 8,
                text: 'Learn: plan the centerpiece — colors, low enough to talk over, a shopping list, tape grid or a pin frog in a low bowl',
              },
              {
                week: 9,
                text: 'FINAL: Thanksgiving centerpiece — buy the day before and condition overnight',
                kind: 'final',
              },
            ],
          },
          {
            n: 5,
            title: 'Bonus',
            from: 11,
            to: 11,
            steps: [
              {
                week: 11,
                text: 'Optional: winter greenery arrangement',
                kind: 'buffer',
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
        why: 'Cook Indian food well enough to host friends for dinner.',
        credits: 3,
        status: 'in-progress',
        ...ACCENT.cooking,
        final: 'Host a dinner party with Indian food I cooked myself.',
        finalWeek: 13,
        finalOn: 'Week 13',
        midterm: '[Midterm]',
        midtermWeek: 7,
        syllabus: {
          weeklyMinimum: [
            'Cook one new dish',
            'Post a photo and one note on what to change next time',
          ],
          whenWhere: 'On my own: one new dish a week',
        },
        units: [
          {
            n: 1,
            title: 'Pantry & basics',
            from: 1,
            to: 3,
            steps: [
              { text: 'Stock whole and ground spices' },
              { text: 'Cook basmati rice that comes out fluffy' },
              { text: 'Learn a tadka (tempering)' },
              { text: 'Make a basic raita' },
            ],
          },
          {
            n: 2,
            title: 'Dal & sabzi',
            from: 4,
            to: 6,
            steps: [
              { text: 'Tadka dal' },
              { text: 'One dry sabzi (aloo gobi or bhindi)' },
              { text: 'Get one family recipe written down' },
            ],
          },
          {
            n: 3,
            title: 'Curries',
            from: 7,
            to: 9,
            steps: [
              { text: 'Master an onion-tomato masala base' },
              { text: 'Chana masala' },
              { text: 'A paneer or chicken curry' },
            ],
          },
          {
            n: 4,
            title: 'The dinner party',
            from: 10,
            to: 13,
            steps: [
              { text: 'Pick a menu of 4–5 dishes' },
              { text: 'Cook a dry run for 2–3 people' },
              { text: 'Write a prep timeline for the day' },
              { text: 'Send the invites' },
            ],
          },
        ],
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

/** A step's id, derived rather than stored: its class and its place in the syllabus. */
export function stepKey(course: Course, step: Step): string {
  return `${course.slug}-${courseSteps(course).indexOf(step)}`;
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
        : steps.filter((s) => s.week != null && s.week < clock.week && !s.done)
            .length,
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
