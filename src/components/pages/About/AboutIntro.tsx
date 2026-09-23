import Link from 'next/link';
import Tape from '@/src/components/reusable/UI/Tape';
import PhotoSlot from '@/src/components/reusable/UI/PhotoSlot';
import { CONTACT } from '@/src/content/about';

/*
The top of the About page: who I am, in my own words, next to a taped-up
portrait.
*/

export default function AboutIntro() {
  return (
    <section className="grid grid-cols-1 items-center gap-12 px-6 pb-20 pt-16 lg:grid-cols-12 lg:gap-x-6 lg:px-16 lg:pt-[72px]">
      <div className="flex flex-col gap-7 lg:col-span-7">
        <Tape tilt={-2} size={30} className="self-start">
          About me
        </Tape>

        <h1 className="m-0 font-display text-5xl font-extrabold leading-[.98] tracking-[-.025em] sm:text-7xl lg:text-[96px]">
          Hi, I&rsquo;m Neal.
        </h1>

        <p className="m-0 max-w-[640px] text-xl leading-snug text-[#2A2824] lg:text-2xl">
          I live in {CONTACT.city}, I label everything, and I&rsquo;m almost
          always in the middle of learning something new.
        </p>

        <p className="m-0 max-w-[620px] text-lg leading-relaxed text-pencil">
          I build software, and I co-founded Henna &amp; Harmony, a wedding
          platform for South Asian and multicultural weddings. The rest of the
          time I&rsquo;m running volleyball games, cooking for friends, or
          working on this quarter&rsquo;s classes. This site is where all of it
          gets written down.
        </p>

        <div className="mt-1 flex flex-wrap gap-3">
          <Link
            href={CONTACT.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-ink px-5 py-3.5 text-base font-semibold text-paper no-underline"
          >
            Download resume (PDF)
          </Link>
          <Link
            href="#contact"
            className="sky-button border border-ink px-5 py-[13px] text-base font-semibold no-underline"
          >
            <span>Get in touch</span>
          </Link>
        </div>
      </div>

      <div className="relative lg:col-span-4 lg:col-start-9">
        <PhotoSlot
          label="[Portrait photo]"
          tone="paper"
          className="h-[420px] rounded-xl shadow-[0_18px_40px_rgba(28,27,25,.12)] lg:h-[520px]"
          style={{ transform: 'rotate(1.5deg)' }}
        />
        {/* A strip of tape holding the photo to the page. */}
        <span
          aria-hidden="true"
          className="tape absolute -top-4 left-1/2 h-[26px] w-[90px] -translate-x-1/2 p-0"
          style={{ transform: 'translateX(-50%) rotate(-4deg)' }}
        />
      </div>
    </section>
  );
}
