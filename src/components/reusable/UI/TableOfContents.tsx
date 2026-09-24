/*
The "on this page" rail beside a write-up. Anchors, so it works without
any JavaScript watching the scroll position. Sections without a heading
(the opening of a field note) are left off it.
*/

export default function TableOfContents({
  sections,
}: {
  sections: { id: string; heading?: string }[];
}) {
  return (
    <nav
      aria-label="On this page"
      className="sticky top-8 flex flex-col border-l-2 border-ink pl-4"
    >
      <span className="mb-2 font-mono text-xs uppercase tracking-[.06em] text-graphite">
        On this page
      </span>
      {sections
        .filter((section) => section.heading)
        .map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="sky-link block py-1.5 text-[15px] text-pencil no-underline hover:text-ink"
          >
            {section.heading}
          </a>
        ))}
    </nav>
  );
}
