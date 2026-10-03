import SectionHeading from '../SectionHeading';
import SpotifyCard from './SpotifyCard';
import SiteStatusCard from './SiteStatusCard';
import CTACard from './CTACard';

/*
Small live widgets I built for practice.

The point isn't the data, it's the wiring: every card has an ⓘ that shows
the path its data took to get here.
*/

export default function LiveWires() {
  return (
    <section className="flex flex-col gap-8 px-6 pb-16 lg:px-16">
      <SectionHeading
        title="Live wires"
        description="Small live widgets I built for practice. Tap the ⓘ on any card to see how I built it."
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <SpotifyCard />
        <SiteStatusCard />
        <CTACard />
      </div>
    </section>
  );
}
