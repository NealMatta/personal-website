/*
The shelf.

If it isn't labeled, I'll lose it. At home that means IKEA bins with clear
labels and deli containers with masking tape on them; here it means one
box per kind of thing.

Boxes whose section isn't built yet carry `soon: true` — they still show
on the shelf so the shelf is honest about what's coming.
*/

export interface ShelfBox {
  label: string;
  /** Where it lives on the shelf, e.g. "Box 01 · Shelf A". */
  code: string;
  href: string;
  tilt: number;
  description: string;
  /** Three things currently inside, as a preview. */
  items: string[];
  /** The count or source line along the bottom. */
  meta: string;
  soon?: boolean;
}

export const SHELF: ShelfBox[] = [
  {
    label: 'Projects',
    code: 'Box 01 · Shelf A',
    href: '/projects',
    tilt: -2,
    description:
      'Finished work with the thinking written down: the problem, the approach, and what I’d do differently.',
    items: ['Personal website v3', 'Henna & Harmony', 'Home dashboard'],
    meta: 'Live from Supabase',
  },
  {
    label: 'Laboratory',
    code: 'Box 02 · Shelf A',
    href: '/lab',
    tilt: 1.5,
    description:
      'Half-built experiments. Some break. That’s what this box is for.',
    items: [
      'Chicago CTA train tracker',
      'Home dashboard',
      'Spotify now playing',
    ],
    meta: '3 experiments',
  },
  {
    label: 'Field notes',
    code: 'Box 03 · Shelf A',
    href: '/writing',
    tilt: -1,
    description:
      'Notes on architecture, APIs and staying organized. Each note links back to what it’s about.',
    items: [
      'How I cache Spotify tokens',
      'Card → Client → View',
      'Labeling everything',
    ],
    meta: 'Coming next',
    soon: true,
  },
  {
    label: 'Cookbook',
    code: 'Box 04 · Shelf B',
    href: 'https://nealmatta.notion.site/678c6cac55d144a6a3e4f5d6aadd880d?v=e35eeb4db6eb447aba852c45b3771cfb',
    tilt: 2,
    description:
      'Recipes I actually make, kept in Notion and linked from here.',
    items: ['Weeknight rotation', 'Things worth the effort', 'Party food'],
    meta: 'Hosted on Notion ↗',
  },
  {
    label: 'Commonplace',
    code: 'Box 05 · Shelf B',
    href: '/commonplace',
    tilt: -1.5,
    description: 'Quotes, books and ideas I keep coming back to.',
    items: [
      'Grit, Angela Duckworth',
      'Dare to Lead, Brené Brown',
      'Bob Ross, on talent',
    ],
    meta: 'Coming next',
    soon: true,
  },
  {
    label: 'About me',
    code: 'Box 06 · Shelf B',
    href: '/about',
    tilt: 1,
    description:
      'The short version: volleyball, food, what I’m building, and how to reach me.',
    items: ['Resume (PDF)', 'LinkedIn', 'What I’m doing now'],
    meta: 'Coming next',
    soon: true,
  },
];
