import Link from 'next/link';

/*
The dark card beside the Field notes masthead.

The design has an email signup here. There's no list to sign anyone up to
yet, and a form that quietly does nothing is worse than no form, so this
offers the two feeds that actually exist: the RSS file this section
generates, and LinkedIn, where every note gets posted anyway.
*/

const LINKEDIN = 'https://www.linkedin.com/in/nealmatta/';

export default function SubscribeCard() {
  return (
    <div className="flex flex-col gap-3 rounded-xl bg-ink p-6 text-paper">
      <span className="font-mono text-xs uppercase tracking-[.06em] text-[#BDB5A5]">
        Get new notes
      </span>
      <p className="m-0 text-[15px] leading-relaxed text-[#E8DDC4]">
        Nothing to sign up for yet. New notes go out on LinkedIn, and the feed
        below updates the moment one is published.
      </p>
      <div className="flex flex-wrap gap-2">
        <Link
          href="/writing/rss.xml"
          className="rounded-lg bg-tape px-4 py-3 text-sm font-semibold text-ink no-underline"
        >
          RSS feed
        </Link>
        <Link
          href={LINKEDIN}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-[#3A3833] px-4 py-3 text-sm font-semibold text-paper no-underline transition-colors hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white"
        >
          Follow on LinkedIn
        </Link>
      </div>
    </div>
  );
}
