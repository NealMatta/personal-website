'use client';

import Link from 'next/link';
import Tape from '@/src/components/reusable/UI/Tape';
import WidgetStack from './WidgetStack';
import { useSky } from '@/src/lib/sky/useSky';

/*
The headline and the widget stack.

The tape label greets you by your own clock, which is the first hint that
the sky beside it is yours and not mine.
*/

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
            className="rounded-lg bg-ink px-[22px] py-3.5 text-base font-semibold text-paper no-underline"
          >
            See what I&rsquo;m building
          </Link>
          <Link
            href="/projects"
            className="rounded-lg border border-ink px-[21px] py-[13px] text-base font-semibold no-underline"
          >
            Projects
          </Link>
          <Link
            href="https://github.com/NealMatta"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex h-[50px] w-[50px] items-center justify-center rounded-lg border border-[#BDB5A5] text-ink"
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
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="lg:col-span-5">
        <WidgetStack />
      </div>
    </section>
  );
}
