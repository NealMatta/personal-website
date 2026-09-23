import BoxCard from '@/src/components/reusable/UI/BoxCard';
import SectionHeading from '../SectionHeading';
import { SHELF } from '@/src/content/shelf';

/*
Six labeled boxes, one per kind of thing on the site.

Boxes whose section isn't built yet still show up — they just don't link
anywhere. The shelf should be honest about what's in the garage.
*/

export default function Shelf() {
  return (
    <section className="flex flex-col gap-10 px-6 pb-16 lg:px-16">
      <SectionHeading
        title="The shelf"
        description="If it isn’t labeled, I’ll lose it. At home that means IKEA bins with clear labels, big taped-up boxes in the garage, and deli containers in the fridge with a strip of masking tape saying what’s inside. This site works the same way."
      />

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {SHELF.map((box) => (
          <BoxCard
            key={box.label}
            label={box.label}
            tilt={box.tilt}
            href={box.soon ? undefined : box.href}
            className="min-h-[240px]"
          >
            <p className="m-0 text-[17px] leading-snug text-[#2A2824]">
              {box.description}
            </p>

            <div className="flex flex-grow flex-col gap-1.5">
              {box.items.map((item) => (
                <span
                  key={item}
                  className="border-b border-dashed border-rule pb-1.5 text-sm text-pencil"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[.06em] text-graphite">
                {box.soon ? 'Coming next' : box.meta}
              </span>
              <span aria-hidden="true" className="text-lg">
                {box.soon ? '' : '→'}
              </span>
            </div>
          </BoxCard>
        ))}
      </div>
    </section>
  );
}
