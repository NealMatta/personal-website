'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import Tape from '@/src/components/reusable/UI/Tape';
import WidgetStack from './WidgetStack';
import { useSky } from '@/src/lib/sky/useSky';
import { SOCIALS } from '@/src/content/about';

/*
The headline and the widget stack.

The tape label greets you by your own clock, which is the first hint that
the sky beside it is yours and not mine.
*/

/*
The marks that follow the two buttons, past the rule. Circles, so they
read as places to find me rather than a third and fourth thing to press,
and they fill with ink rather than sky: these leave the site, and the sky
is for moving around inside it. Drawn to match the stroke weight of the
rest of the page's line work; LinkedIn stays in the nav, so it has no
icon here and drops out of the list.
*/
const ICONS: Record<string, ReactNode> = {
  GitHub: (
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  ),
  TikTok: (
    <>
      <path d="M13 16.5a4 4 0 1 1-4-4" />
      <path d="M13 16.5V3.8c1.1 2.4 3.2 3.9 5.8 4.1" />
    </>
  ),
  Instagram: (
    <>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <line x1="17.4" y1="6.6" x2="17.41" y2="6.6" />
    </>
  ),
};

const HERO_SOCIALS = SOCIALS.filter(({ label }) => label in ICONS);

export default function Hero() {
  const { greeting } = useSky();

  return (
    <section className="grid grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-12 lg:gap-x-6 lg:px-16 lg:pb-16 lg:pt-[72px]">
      <div className="flex flex-col gap-7 lg:col-span-7 lg:pt-4">
        <Tape tilt={-2} size={24} className="self-start">
          {greeting}
        </Tape>

        <h1 className="m-0 font-display text-5xl font-extrabold leading-[.98] tracking-[-.02em] sm:text-6xl lg:text-[84px]">
          I&rsquo;m Neal. I turn chaos into clarity.
        </h1>

        <p className="m-0 max-w-[600px] text-lg leading-relaxed text-[#3D3A35] lg:text-xl">
          This site is my second brain: part lab, part notebook, and the place I
          practice building. Everything here is labeled, shelved, and findable.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/lab"
            className="sky-button bg-ink px-[22px] py-3.5 text-base font-semibold text-paper no-underline"
          >
            <span>See what I&rsquo;m building</span>
          </Link>
          <Link
            href="/projects"
            className="sky-button border border-ink px-[21px] py-[13px] text-base font-semibold no-underline"
          >
            <span>Projects</span>
          </Link>
          {/* The two buttons are places on this site; what follows is not. */}
          <span
            aria-hidden="true"
            className="hidden h-[34px] w-px self-center bg-rule sm:block"
          />

          <nav aria-label="Elsewhere" className="flex items-center gap-2">
            {HERO_SOCIALS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[#BDB5A5] text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-paper focus-visible:border-ink focus-visible:bg-ink focus-visible:text-paper"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {ICONS[label]}
                </svg>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="lg:col-span-5">
        <WidgetStack />
      </div>
    </section>
  );
}
