import type { Metadata } from 'next';
import BoxCard from '@/src/components/reusable/UI/BoxCard';
import PhotoSlot from '@/src/components/reusable/UI/PhotoSlot';
import AboutIntro from '@/src/components/pages/About/AboutIntro';
import Contact from '@/src/components/pages/About/Contact';
import { FACTS, PHOTOS } from '@/src/content/about';

export const metadata: Metadata = {
  title: 'About — Neal Matta',
  description:
    'I live in Chicago, I label everything, and I’m almost always in the middle of learning something new.',
};

export default function About() {
  return (
    <>
      <AboutIntro />

      {/* A few things about me */}
      <section className="flex flex-col gap-12 px-6 pb-[88px] lg:px-16">
        <div className="flex flex-col gap-4 border-t-2 border-ink pt-5 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="m-0 font-display text-4xl font-extrabold tracking-[-.01em] lg:text-[44px]">
            A few things about me
          </h2>
          <p className="m-0 max-w-[440px] text-base leading-relaxed text-pencil">
            Labeled, like everything else around here.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map((fact) => (
            <BoxCard
              key={fact.label}
              label={fact.label}
              tilt={fact.tilt}
              labelSize={26}
            >
              <p className="m-0 text-[17px] leading-snug text-[#2A2824]">
                {fact.description}
              </p>
              <div className="mt-auto flex flex-col gap-1.5">
                {fact.items.map((item) => (
                  <span
                    key={item}
                    className="border-b border-dashed border-rule pb-1.5 text-sm text-pencil"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </BoxCard>
          ))}
        </div>
      </section>

      {/* Off the clock */}
      <section className="flex flex-col gap-8 px-6 pb-24 lg:px-16">
        <div className="flex flex-col gap-4 border-t-2 border-ink pt-5 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="m-0 font-display text-4xl font-extrabold tracking-[-.01em] lg:text-[44px]">
            Off the clock
          </h2>
          <span className="font-mono text-xs uppercase tracking-[.06em] text-graphite">
            Photos I upload
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:[grid-template-columns:5fr_4fr_3fr]">
          {PHOTOS.map((photo) => (
            <figure key={photo.label} className="m-0 flex flex-col gap-3">
              <PhotoSlot
                label={photo.label}
                tone="paper"
                className="h-[280px] rounded-xl lg:h-[360px]"
              />
              <figcaption className="font-label text-2xl text-pencil">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <Contact />
    </>
  );
}
