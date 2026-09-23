'use client';

import SkyWindow from '@/src/components/reusable/sky/SkyWindow';
import { useSky } from '@/src/lib/sky/useSky';
import { quoteForDay } from '@/src/content/quotes';

/*
The last window on the page.

A quote from the commonplace box, on the same sky as the hero — the page
opens and closes on the same weather.
*/

export default function QuoteBlock() {
  const { phase, now } = useSky();
  const quote = quoteForDay(now);

  return (
    <section className="px-6 pb-18 pt-8 lg:px-16 lg:pb-[72px]">
      <SkyWindow
        phase={phase}
        seed="quote"
        className="rounded-[20px]"
        cloudScale={1.1}
        dipperClassName="top-4 right-10 w-[130px] h-[172px]"
      >
        <figure className="relative m-0 flex flex-col items-center gap-6 px-8 py-12 text-center lg:px-12 lg:py-16">
          <blockquote className="m-0 max-w-[900px] font-display text-2xl font-normal leading-tight sm:text-3xl lg:text-[40px]">
            &ldquo;{quote.quote}&rdquo;
          </blockquote>
          <figcaption className="font-mono text-[13px] uppercase tracking-[.06em]">
            {quote.source}
          </figcaption>
        </figure>
      </SkyWindow>
    </section>
  );
}
