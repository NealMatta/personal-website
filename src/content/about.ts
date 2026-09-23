/*
About me.

The short version: volleyball, food, what I'm building, and how to reach
me. Labeled, like everything else around here.
*/

export const CONTACT = {
  email: 'nlsima97@gmail.com',
  resumeUrl:
    'https://drive.google.com/file/d/1WXKeujWZ7V5twTawgxhGH-Uaw1cHCVub/view?usp=sharing',
  city: 'Chicago',
};

export interface SocialLink {
  label: string;
  href: string;
  /** Shown next to the name, e.g. an @handle. */
  handle?: string;
}

export const SOCIALS: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nealmatta/' },
  {
    label: 'GitHub',
    href: 'https://github.com/NealMatta',
    handle: '@NealMatta',
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@nealmattata',
    handle: '@nealmattata',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/nealmatta/',
    handle: '@nealmatta',
  },
];

export interface Fact {
  label: string;
  tilt: number;
  description: string;
  items: string[];
}

export const FACTS: Fact[] = [
  {
    label: 'Volleyball',
    tilt: -2,
    description:
      'What started as one tournament turned into a community. I set up the games and I play in them.',
    items: ['Tournaments', 'Intermediate runs', 'Weekly open gym'],
  },
  {
    label: 'Kitchen',
    tilt: 1.5,
    description:
      'I cook a lot, and there’s masking tape on everything in my fridge. Next quarter I’m taking a cooking class, and the final is an Indian dinner party.',
    items: ['Cooking 101 · Q1 2027', 'The cookbook, in Notion', 'Party food'],
  },
  {
    label: 'Bookshelf',
    tilt: -1,
    description: 'Fantasy series, anime and a lifelong Pokémon habit.',
    items: [
      'The Hierarchy, James Islington',
      'Demon Slayer · Attack on Titan · Jujutsu Kaisen',
      'Pokémon',
    ],
  },
  {
    label: 'Always learning',
    tilt: 2,
    description:
      'I run my free time like a school term: classes, credits and a final exam at the end of each quarter.',
    items: ['The curriculum', 'The transcript', 'Notes from each class'],
  },
];

/** Photo slots, waiting on the actual photos. */
export const PHOTOS = [
  { label: '[Photo: volleyball]', caption: '[Caption]' },
  { label: '[Photo: something I cooked]', caption: '[Caption]' },
  { label: '[Photo: a sketch]', caption: '[Caption]' },
];
