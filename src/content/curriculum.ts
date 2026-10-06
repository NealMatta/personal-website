/*
The curriculum.

I run my own school. A quarter is thirteen weeks, a class is a syllabus
with a final I either pass or don't, and credits are hours a week — so
four classes at ten credits is ten hours a week I've actually promised.

Everything the Curriculum pages render comes from this file: the quarters,
the classes inside them, every weekly step, and the check-ins. It's typed
data rather than a table, so planning a quarter means editing a list
instead of writing a migration. The one thing that isn't here is which
steps are done: that record lives in Firestore and is laid over this file
by `src/apiManagement/curriculum/progress.ts`.

What's real here: the classes, the credits, the units, the midterms and
the finals. Weekly steps still in [brackets] are mine to write — same
rule the field notes follow.

A step is ticked off on the site itself, once `/curriculum/unlock` has
taken the passcode. To pass a class, set `status: 'passed'` and a
`passedOn` date; the transcript reads both.
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
  /** Stable within its class, so two steps in one week don't collide. */
  id?: string;
  /** Which week of the quarter this step belongs to. */
  week: number;
  text: string;
  kind?: StepKind;
  /** Set once it's actually done. Comes from the record, not this file. */
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
  /** A class that starts partway through the quarter, e.g. after another ends. */
  startWeek?: number;
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

/*
The class colors, so a class keeps its color everywhere. The values live
in globals.css, where each has a lighter accent and a darker tint for
night; that means they only work where CSS reads them (a style or a
class), not as hex to compute with.
*/
const classColor = (name: string) => ({
  accent: `var(--class-${name})`,
  tint: `var(--class-${name}-tint)`,
});

const ACCENT = {
  swimming: classColor('swimming'),
  spanish: classColor('spanish'),
  sketching: classColor('sketching'),
  cooking: classColor('cooking'),
  woodworking: classColor('woodworking'),
  cad: classColor('cad'),
  calisthenics: classColor('calisthenics'),
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
        slug: 'wdw-101',
        dept: 'WDW',
        code: 'WDW 101',
        title: 'Woodworking 101',
        why: 'Build one real thing for the apartment and build it well: design the behind-the-couch ledge, test it, change it, and finish it properly.',
        credits: 2,
        status: 'in-progress',
        ...ACCENT.woodworking,
        final:
          'The behind-the-couch ledge I designed and would be proud of: space for plants and a place for coasters to sit neatly. Square with no wobble, sanded, stained and sealed, and in daily use.',
        finalWeek: 8,
        finalOn: 'Sun Nov 22',
        midterm:
          'Revise to v2 and a final cut list; stain test on offcuts; have the store cut the lumber; line up rentals for build weekend',
        midtermWeek: 4,
        syllabus: {
          weeklyMinimum: [
            'One session, about 2 hours: design weeks can be done anywhere, build weekends (Wk 4, 5, 7) run longer',
            'Every design change goes into a new numbered drawing: v1, v2, v3',
            'Write every dimension down before cutting: measure twice',
            'A check-in with a photo or sketch after each session',
          ],
          whenWhere:
            'Learn as I go: Home Depot on-demand How-To Workshops plus YouTube, no multi-week class. Design work travels (sketchbook or laptop). Build weekends at home: Oct 10 warm-up frame, Oct 24–25 mockup, Oct 31–Nov 1 build, Nov 14–15 finish, Nov 21–22 install. Fallback if it slips: Dec 5–6. Rent or borrow tools as each step needs them instead of buying up front; have the store make the long cuts.',
        },
        units: [
          {
            n: 1,
            title: 'Measure, watch & a warm-up build',
            from: 1,
            to: 2,
            steps: [
              {
                id: 'hd1',
                week: 1,
                text: 'Home Depot workshops: Tape Measure Basics + Woodworking Tool Basics (before measuring)',
              },
              {
                id: 'hd2',
                week: 1,
                text: 'Home Depot workshop: Power Tool Basics (before the Oct 10 frame)',
              },
              {
                id: 'd1b',
                week: 1,
                text: 'Measure the couch space: back height, gap to the wall, length. Photo + numbers',
              },
              {
                id: 'd1c',
                week: 1,
                text: 'Measure what goes on the ledge: plant pots and coasters',
              },
              {
                id: 'd1f',
                week: 1,
                text: 'Measure the odd wall space and pick the picture for the warm-up frame',
              },
              {
                id: 'd1e',
                week: 2,
                text: 'Save 10+ reference photos of behind-couch tables with plants and a neat spot for coasters',
              },
              {
                id: 'd1d',
                week: 2,
                text: 'Warm-up build Sat Oct 10: the picture frame, with tools rented or borrowed for the day. Four cuts, glue + brads or screws, sand, stain; hang it once back',
              },
            ],
          },
          {
            n: 2,
            title: 'Design & iterate',
            from: 3,
            to: 4,
            steps: [
              {
                id: 'hd3',
                week: 3,
                text: 'Away Oct 11–18: Home Depot workshops How to Maintain Woodworking Tools + How to Repair Drywall (for hanging the frame and patching holes)',
              },
              {
                id: 'd2a',
                week: 3,
                text: 'Away Oct 11–18: sketch 3 different layouts for plants and coasters; pick one',
              },
              {
                id: 'd2b',
                week: 3,
                text: 'Draw the favorite to scale with every dimension (v1)',
              },
              {
                id: 'd2d',
                week: 4,
                text: "Oct 24–25: full-size mockup behind the couch in cardboard + painter's tape; set real plants and coasters on it",
              },
              {
                id: 'd2e',
                week: 4,
                text: 'Revise to v2 and a final cut list; stain test on offcuts; have the store cut the lumber; line up rentals for build weekend',
                kind: 'midterm',
              },
            ],
          },
          {
            n: 3,
            title: 'Build',
            from: 5,
            to: 6,
            steps: [
              {
                id: 'd3a',
                week: 5,
                text: 'Oct 31–Nov 1: cut, dry-fit, glue + screw; build the coaster spot',
              },
              {
                id: 'd3b',
                week: 6,
                text: 'Party test: the unfinished ledge in use on Nov 7. Note what to change',
              },
            ],
          },
          {
            n: 4,
            title: 'Finish it well',
            from: 7,
            to: 8,
            steps: [
              {
                id: 'd4a',
                week: 7,
                text: 'Nov 14–15: make the party fixes, fill screw holes, sand 120 → 150 → 180, conditioner, stain',
              },
              {
                id: 'd4b',
                week: 7,
                text: 'Weeknights: 2–3 coats of water-based poly, a light 220 sand between coats',
              },
              {
                id: 'd4c',
                week: 8,
                text: 'FINAL, Nov 21–22: plants and coasters in place, ledge in daily use',
                kind: 'final',
              },
            ],
          },
          {
            n: 5,
            title: 'Optional extra',
            from: 10,
            to: 10,
            steps: [
              {
                id: 'd5a',
                week: 10,
                text: 'Only if the ledge is done: a small plant holder, Dec 5–6',
                kind: 'buffer',
              },
            ],
          },
        ],
      },
      {
        slug: 'cad-101',
        dept: 'CAD',
        code: 'CAD 101',
        title: '3D Printing & CAD 101',
        why: "I can already print other people's models. Now learn to design my own: a clean Gridfinity shelf with a custom shadow box for each of my everyday-carry items.",
        credits: 2,
        startWeek: 6,
        status: 'in-progress',
        ...ACCENT.cad,
        final:
          'One shelf fully kitted out in Gridfinity: a baseplate that fills it and a shadow box I designed for every everyday-carry item. One filament color, everything drops in and lifts out cleanly.',
        finalWeek: 12,
        finalOn: 'Sun Dec 20',
        midterm:
          'Back home: print the baseplate and the first shadow box. The item drops in and lifts out cleanly',
        midtermWeek: 10,
        syllabus: {
          weeklyMinimum: [
            'Two CAD sessions of about 45 minutes',
            'One test print a week, even a small one',
            'A check-in with the print and what to change',
          ],
          whenWhere:
            'Starts Wk 6 as woodworking wraps, so the indoor work lands in the cold months. Printer + digital calipers already in hand. CAD in Autodesk Fusion (free for personal use) with the GridfinityGenerator add-in for baseplates and bins; the shadow-box cutouts are modeled by hand, which is the point of the class.',
        },
        units: [
          {
            n: 1,
            title: 'Plan the shelf',
            from: 6,
            to: 7,
            steps: [
              {
                id: 'p1a',
                week: 6,
                text: 'Measure the shelf with calipers: width, depth, usable height. Work out how many 42 mm Gridfinity units fit',
              },
              {
                id: 'p1b',
                week: 6,
                text: "Print one stock 2x2 baseplate and a 1x1 bin to check fit and your printer's tolerances",
              },
              {
                id: 'p1c',
                week: 7,
                text: 'Photo shoot for the shadow boxes: each item alone, shot straight down on a grid or cutting mat with a ruler in frame (phone held level, no zoom)',
              },
              {
                id: 'p1e',
                week: 7,
                text: "Caliper each item (length, width, thickness) and save the photos + numbers in one folder on the laptop, ready for Thanksgiving at my parents'",
              },
              {
                id: 'p1d',
                week: 7,
                text: 'Sketch the shelf layout to scale: which item gets which bin size, and pick one filament color',
              },
            ],
          },
          {
            n: 2,
            title: 'Learn Fusion',
            from: 8,
            to: 9,
            steps: [
              {
                id: 'p2a',
                week: 8,
                text: 'Before Thanksgiving travel: install Fusion; beginner tutorial on sketch, constrain, extrude, offset',
              },
              {
                id: 'p2b',
                week: 8,
                text: 'Install the GridfinityGenerator add-in; generate a baseplate sized to the shelf, split to fit the print bed',
              },
              {
                id: 'p2c',
                week: 9,
                text: "At my parents', laptop only: model the first shadow box by tracing one item's photo (a calibrated canvas), offset for clearance, add a finger notch",
              },
            ],
          },
          {
            n: 3,
            title: 'First shadow box',
            from: 10,
            to: 10,
            steps: [
              {
                id: 'p3a',
                week: 10,
                text: 'Back home: print the baseplate and the first shadow box. The item drops in and lifts out cleanly',
                kind: 'midterm',
              },
            ],
          },
          {
            n: 4,
            title: 'Build out the shelf',
            from: 11,
            to: 12,
            steps: [
              {
                id: 'p4a',
                week: 11,
                text: 'Model and print the rest of the shadow boxes; reprint anything that is too tight or too loose',
              },
              {
                id: 'p4b',
                week: 12,
                text: 'FINAL: shelf fully kitted out, one color, every item in its own shadow box; photo + the CAD files',
                kind: 'final',
              },
            ],
          },
          {
            n: 5,
            title: 'Wind down',
            from: 13,
            to: 13,
            steps: [
              {
                id: 'p5a',
                week: 13,
                text: 'San Diego week: rest',
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
          'Chicago skyline from my own reference photo, drawn indoors in the travel sketchbook, under an hour',
        midtermWeek: 6,
        syllabus: {
          weeklyMinimum: [
            'The book, every day, 15–20 minutes. Missed a day? Pick up at the next lesson, no make-ups',
            'From Wk 2: one quick sketch a week in the travel sketchbook, indoors: the apartment, a café window, or a reference photo',
            'Optional: a Draw Like a Sir video when a topic needs more',
          ],
          whenWhere:
            "Every day at home with This Is Not a Sketchbook, It's an Art Class (arrives Oct 1); a small travel sketchbook from Wk 2 (bought before the Oct 11 trip), used indoors or with reference photos while it's cold",
        },
        units: [
          {
            n: 1,
            title: 'The book: seeing, contour & perspective',
            from: 1,
            to: 5,
            steps: [
              {
                id: 's1a',
                week: 1,
                text: 'Pages 2–9: Meet your teacher, Intro, Your first self portrait (keep it as your baseline), How to see like an artist, SAM skills. Cut out the viewfinders (pp. 63, 65) and skim the SAM guide (p. 67)',
              },
              {
                id: 's1b',
                week: 2,
                text: 'Pages 11–21: Upside down drawing, Negative space, Continuous contour, plus practice pages 52–55. Buy the travel sketchbook before Oct 11',
              },
              {
                id: 's1c',
                week: 3,
                text: 'Away Oct 11–18: pages 22–23 Blind contour (travels well, no prep). One trip sketch in the travel sketchbook',
              },
              {
                id: 's1d',
                week: 4,
                text: "Pages 24–31 + 62: Perspective, One point, Two point, and the perspective reference images. This is the skyline unit, so don't rush it",
              },
              {
                id: 's1e',
                week: 5,
                text: 'Pages 32–35 + 69 Value, pages 40–43 Gridding and Reference photos 101. On a clear day, shoot your own skyline reference photos (Riverwalk or lakefront)',
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
                id: 's2a',
                week: 6,
                text: 'Pages 48–49 Drawing from a reference photo (midterm warm-up)',
              },
              {
                id: 's2b',
                week: 6,
                text: 'Chicago skyline from my own reference photo, drawn indoors in the travel sketchbook, under an hour',
                kind: 'midterm',
              },
            ],
          },
          {
            n: 3,
            title: 'The book: faces & observation',
            from: 7,
            to: 11,
            steps: [
              {
                id: 's3a',
                week: 7,
                text: 'Pages 36–39 Drawing a face, plus practice pages 56–61 (nose, eyes, mouth)',
              },
              {
                id: 's3b',
                week: 8,
                text: 'Pages 44–47: Self portrait #2 and A message to the artist. Put it next to the week 1 baseline and post the comparison',
              },
              {
                id: 's3c',
                week: 9,
                text: "Thanksgiving at my parents' (Nov 24–29): page 50 Drawing from observation. One low-pressure sketch there",
              },
              {
                id: 's3d',
                week: 10,
                text: 'Page 51 Drawing from imagination + drawing prompts (pp. 71–72)',
              },
              {
                id: 's3e',
                week: 11,
                text: 'Open sketchbook pages (73+): two skyline or street-scene sketches from photos, using perspective + value',
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
                id: 's4b',
                week: 12,
                text: 'Finish any leftover book pages; one timed 30-minute sketch from a photo; pack the travel sketchbook',
              },
              {
                id: 's4c',
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
                id: 'p1a',
                week: 1,
                text: 'Back from the work trip: pick a textbook or course; book a weekly tutor or partner; record a 20-second intro',
              },
              {
                id: 'p1b',
                week: 2,
                text: 'Numbers and telling time: what time I do things',
              },
              {
                id: 'p1c',
                week: 3,
                text: 'Ser vs. estar: describe myself and where I am (away Oct 11–18: take the session by video)',
              },
              {
                id: 'p1d',
                week: 4,
                text: 'Regular present tense: -ar, -er, -ir',
              },
            ],
          },
          {
            n: 2,
            title: 'Daily routine',
            from: 5,
            to: 6,
            steps: [
              {
                id: 'p2a',
                week: 5,
                text: 'Reflexive verbs: me levanto, me ducho, me visto',
              },
              {
                id: 'p2b',
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
              {
                id: 'p3a',
                week: 7,
                text: 'Irregulars: ir, tener, hacer, querer, poder',
              },
              {
                id: 'p3b',
                week: 8,
                text: 'Connectors: primero, luego, después, por la noche',
              },
              {
                id: 'p3c',
                week: 9,
                text: "Thanksgiving at my parents': food and family vocab, lighter week; session by video",
              },
              {
                id: 'p3d',
                week: 10,
                text: 'Describe my job in simple Spanish',
              },
            ],
          },
          {
            n: 4,
            title: 'Unscripted',
            from: 11,
            to: 13,
            steps: [
              {
                id: 'p4a',
                week: 11,
                text: 'Full day from bullet points only, 2 minutes',
              },
              {
                id: 'p4b',
                week: 12,
                text: 'FINAL: 2 minutes unscripted + 3 follow-up questions, on video',
                kind: 'final',
              },
              {
                id: 'p4c',
                week: 13,
                text: 'Holiday week: one fun conversation, no homework',
                kind: 'buffer',
              },
            ],
          },
        ],
      },
      {
        slug: 'cal-101',
        dept: 'CAL',
        code: 'CAL 101',
        title: 'Calisthenics 101',
        why: 'Turn the pull-up I already have into a muscle-up, twenty minutes at a time, and build a handstand and a pistol squat alongside it.',
        credits: 2,
        status: 'in-progress',
        ...ACCENT.calisthenics,
        final:
          'One bar muscle-up: from a dead hang to locked out over the bar. A kip is fine; no band, no jump. On video.',
        finalWeek: 12,
        finalOn: 'Sat Dec 19',
        midterm:
          '8 strict pull-ups in one set, 3 chest-to-bar pull-ups, and 5 straight-bar dips. Both AMRAPs beat their Wk 4 rounds',
        midtermWeek: 6,
        syllabus: {
          weeklyMinimum: [
            "Upper day: a 20-minute AMRAP of the unit's circuit, then 10 minutes of handstand and muscle-up drills",
            "Lower day: a 20-minute AMRAP of the unit's circuit, then 10 minutes of pistol-squat work",
            'Skill day, about 30 minutes and no clock: muscle-up, handstand and pistol practice, done fresh',
            'A check-in at the end of the week with the rounds from both AMRAPs. The circuit stays the same for a whole unit, so the rounds compare week to week',
          ],
          whenWhere:
            "Upper and skill days need a bar I can get over: the gym's pull-up bar or a park bar, not a doorway bar. A low bar (Smith machine or a park's low bar) for transition drills, parallel bars or two sturdy chairs for dips, a resistance band from Wk 7. Lower days work anywhere. A day off between the upper day and the skill day, so the pulling muscles get a rest. Travel weeks (Oct 11–18, Thanksgiving) swap the bar for towel-on-a-door rows and chair dips.",
        },
        units: [
          {
            n: 1,
            title: 'Pulling volume',
            from: 1,
            to: 3,
            steps: [
              {
                id: 'c1a',
                week: 1,
                text: "Baseline: max strict pull-ups, max chest-to-bar pull-ups, max dips, max push-ups, chest-to-wall handstand hold, and the lowest seat I can pistol down to on each leg. Write them all in this week's check-in",
              },
              {
                id: 'c1b',
                week: 1,
                text: 'Upper circuit A1, a 20-min AMRAP: 3 strict pull-ups (about half my max), 8 dips, 10 push-ups, 6 pike push-ups, 20 s hollow hold. Then 3 × 30 s chest-to-wall handstand and 3 × 10 s false-grip hang',
              },
              {
                id: 'c1c',
                week: 1,
                text: 'Lower circuit B1, a 20-min AMRAP: 12 air squats, 8 reverse lunges each leg, 12 glute bridges, 15 calf raises, 30 s plank. Then pistols to a chair: lower on one leg, stand on the same leg, 3 × 5 each, holding a doorframe if needed, plus 1 min in a deep squat',
              },
              {
                id: 'c1d',
                week: 2,
                text: 'Skill day S1: pull-up ladders (1, 2, 3, then back to 1) × 3; 3 × 10 hollow-to-arch swings on the bar; 3 × 15 s false-grip hang; 3 chest-to-wall walk-ups, holding 30 s; 3 × 5 doorframe-assisted pistols each leg',
              },
              {
                id: 'c1e',
                week: 2,
                text: 'Same circuits as Wk 1; beat its rounds on both days',
              },
              {
                id: 'c1f',
                week: 3,
                text: 'Away Oct 11–18, no bar: towel-on-a-door rows for the pull-ups, chair dips for the dips; both AMRAPs and the pistol work as usual',
              },
            ],
          },
          {
            n: 2,
            title: 'Pull higher',
            from: 4,
            to: 6,
            steps: [
              {
                id: 'c2a',
                week: 4,
                text: 'Upper circuit A2: 3 chest-to-bar pull-ups (or pull-ups as high as I can), 8 dips, 10 push-ups, 6 pike push-ups with feet on a chair, 6 hanging knee raises. Then 3 × 30 s chest-to-wall handstand and 3 × 3 explosive pull-ups, bar to chest',
              },
              {
                id: 'c2b',
                week: 4,
                text: 'Lower circuit B2: 8 Bulgarian split squats each leg (back foot on a chair), 10 squat jumps, 10 single-leg glute bridges each leg, 30 s wall sit. Then pistols to a lower seat, 3 × 5 each, and 3 slow pistol negatives all the way to the floor',
              },
              {
                id: 'c2c',
                week: 4,
                text: 'Skill day S2: 5 × 3 explosive pull-ups; 3 × 5 straight-bar dips (jump to the top of the bar); 3 × 8 kip swings, hips to the bar; 3 × 5 false-grip pull-ups; 10 back-to-wall handstand kick-ups; 3 × 5 pistols holding a light weight out front. New circuits, so these rounds are the new baseline',
              },
              {
                id: 'c2d',
                week: 5,
                text: 'Same circuits as Wk 4; beat its rounds on both days',
              },
              {
                id: 'c2e',
                week: 6,
                text: '8 strict pull-ups in one set, 3 chest-to-bar pull-ups, and 5 straight-bar dips. Both AMRAPs beat their Wk 4 rounds',
                kind: 'midterm',
              },
            ],
          },
          {
            n: 3,
            title: 'The transition',
            from: 7,
            to: 9,
            steps: [
              {
                id: 'c3a',
                week: 7,
                text: 'Upper circuit A3: 3 chest-to-bar pull-ups, 5 straight-bar dips, 10 push-ups, 6 pike push-ups from a higher box, 8 hanging knee raises. Then 3 × 30 s back-to-wall handstand and 3 × 2 muscle-up negatives: start locked out over the bar, lower slowly through the transition to a hang',
              },
              {
                id: 'c3b',
                week: 7,
                text: 'Lower circuit B3: 10 jumping lunges, 8 Bulgarian split squats each leg, 6 skater squats each leg (back knee to a pillow), 12 single-leg calf raises each leg. Then pistols to the lowest step I can, and 3 × 3 full pistols holding a doorframe',
              },
              {
                id: 'c3c',
                week: 7,
                text: 'Skill day S3: 3 × 5 transition drills on a chest-high bar, feet on the floor; 3 × 3 band-assisted muscle-ups; 5 × 2 kip to a high pull, bar to the waist; 10 freestanding handstand kick-ups plus 1 min against the wall; 3 × 3 counterbalanced full pistols',
              },
              {
                id: 'c3d',
                week: 8,
                text: 'Same circuits as Wk 7; beat its rounds. Band muscle-ups easy? Drop to a lighter band',
              },
              {
                id: 'c3e',
                week: 9,
                text: "Thanksgiving at my parents': a lighter week. Both AMRAPs without a bar (towel-on-a-door rows and chair dips), skill day optional",
              },
            ],
          },
          {
            n: 4,
            title: 'The muscle-up',
            from: 10,
            to: 12,
            steps: [
              {
                id: 'c4a',
                week: 10,
                text: 'Upper circuit A4: 2 chest-to-bar pull-ups, 2 explosive pull-ups to the waist, 6 straight-bar dips, 10 push-ups, 6 hanging leg raises. Then 5 min of freestanding handstand kick-ups and 3 × 2 muscle-up negatives',
              },
              {
                id: 'c4b',
                week: 10,
                text: 'Lower circuit B4: 5 pistols each leg to the lowest box, 10 squat jumps, 8 Bulgarian split squats each leg, 30 s wall sit. Then 3 × 2 full pistols each leg, heels on a plate or book if needed',
              },
              {
                id: 'c4c',
                week: 10,
                text: 'Skill day S4: first muscle-up attempts, fresh, on video: 5 × 1 with full rest, band-assisted if they fail. Then handstand and pistol practice',
              },
              {
                id: 'c4d',
                week: 11,
                text: 'Same circuits as Wk 10; beat its rounds. Keep the skill day light so the final is fresh',
              },
              {
                id: 'c4e',
                week: 12,
                text: 'FINAL: one bar muscle-up, filmed. Then retake every Wk 1 baseline and post both side by side',
                kind: 'final',
              },
            ],
          },
          {
            n: 5,
            title: 'Wind down',
            from: 13,
            to: 13,
            steps: [
              {
                id: 'c5a',
                week: 13,
                text: 'San Diego week: rest, or one beach AMRAP for fun',
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
        status: 'planned',
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
              { id: 'k1a', week: 1, text: 'Stock whole and ground spices' },
              {
                id: 'k1b',
                week: 2,
                text: 'Cook basmati rice that comes out fluffy',
              },
              { id: 'k1c', week: 3, text: 'Learn a tadka (tempering)' },
              { id: 'k1d', week: 3, text: 'Make a basic raita' },
            ],
          },
          {
            n: 2,
            title: 'Dal & sabzi',
            from: 4,
            to: 6,
            steps: [
              { id: 'k2a', week: 4, text: 'Tadka dal' },
              {
                id: 'k2b',
                week: 5,
                text: 'One dry sabzi (aloo gobi or bhindi)',
              },
              {
                id: 'k2c',
                week: 6,
                text: 'Get one family recipe written down',
              },
            ],
          },
          {
            n: 3,
            title: 'Curries',
            from: 7,
            to: 9,
            steps: [
              {
                id: 'k3a',
                week: 7,
                text: 'Master an onion-tomato masala base',
              },
              { id: 'k3b', week: 8, text: 'Chana masala' },
              { id: 'k3c', week: 9, text: 'A paneer or chicken curry' },
            ],
          },
          {
            n: 4,
            title: 'The dinner party',
            from: 10,
            to: 13,
            steps: [
              { id: 'k4a', week: 10, text: 'Pick a menu of 4–5 dishes' },
              { id: 'k4b', week: 11, text: 'Cook a dry run for 2–3 people' },
              {
                id: 'k4c',
                week: 12,
                text: 'Write a prep timeline for the day',
              },
              { id: 'k4d', week: 13, text: 'Send the invites' },
            ],
          },
        ],
      },
      {
        slug: 'swm-101',
        dept: 'SWM',
        code: 'SWM 101',
        title: 'Swimming 101',
        why: 'Get comfortable in the water, enough to swim a full lap on my own.',
        credits: 4,
        status: 'planned',
        ...ACCENT.swimming,
        final:
          'Swim one full length of the pool unassisted: no wall, no board, no standing. On video.',
        finalWeek: 12,
        finalOn: 'Thu Mar 25',
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
                id: 'w1a',
                week: 1,
                text: 'Sign up for the free month + Thursday class; get goggles, cap, suit',
              },
              {
                id: 'w1b',
                week: 2,
                text: 'Exhale underwater: 10 bubble bobs holding the wall',
              },
              {
                id: 'w1c',
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
                id: 'w2a',
                week: 4,
                text: 'Push off the wall and glide; decide on a membership before the free month ends',
              },
              {
                id: 'w2b',
                week: 5,
                text: 'Flutter kick with a board, half a length',
              },
              {
                id: 'w2c',
                week: 6,
                text: 'Flutter kick with a board, a full length',
              },
              {
                id: 'w2d',
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
              { id: 'w3a', week: 8, text: 'Freestyle arms with a pull buoy' },
              {
                id: 'w3b',
                week: 9,
                text: 'Thursday class plus one solo practice swim',
              },
              {
                id: 'w3c',
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
              {
                id: 'w4a',
                week: 11,
                text: 'Full length with fins or a spotter',
              },
              {
                id: 'w4b',
                week: 12,
                text: 'FINAL: full length unassisted, filmed',
                kind: 'final',
              },
              {
                id: 'w4c',
                week: 13,
                text: 'Buffer week: make-up swim, or a celebration swim',
                kind: 'buffer',
              },
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

/** What a step is called inside its class: its own id, else its week. */
export function stepId(step: Step): string {
  return step.id ?? `w${step.week}`;
}

/** A step's key across every class. */
export function stepKey(course: Course, step: Step): string {
  return `${course.slug}-${stepId(step)}`;
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

/** What a class owes this week. Usually a step or two; sometimes none. */
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
        fg: 'var(--ok-fg)',
        bg: 'var(--ok-bg)',
      };
    case 'incomplete':
      return {
        grade: 'INC',
        title: 'Incomplete, rolls into next quarter',
        fg: 'var(--bad-fg)',
        bg: 'var(--bad-bg)',
      };
    case 'withdrawn':
      return {
        grade: 'W',
        title: 'Withdrawn',
        fg: 'var(--pencil)',
        bg: 'var(--wash)',
      };
    case 'planned':
      return {
        grade: '—',
        title: 'Not started',
        fg: 'var(--pencil)',
        bg: 'var(--wash)',
      };
    default:
      return {
        grade: 'IP',
        title: 'In progress',
        fg: 'var(--warn-fg)',
        bg: 'var(--warn-bg)',
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
