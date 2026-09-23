import type { Section } from '@/src/types/content';

/*
One anchored heading and its paragraphs, inside a `.prose` article.

Case studies, build logs and field notes all render their write-up this
way, and the anchor is what the "on this page" rail points at.
*/

export default function ProseSection({
  section,
  extra,
}: {
  section: Section;
  /* Anything the page wants to drop in under this heading — a data path,
     a row of taped cards. */
  extra?: React.ReactNode;
}) {
  return (
    <>
      <h2 id={section.id} className="scroll-mt-8">
        {section.heading}
      </h2>
      {section.body.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
      {extra}
    </>
  );
}
