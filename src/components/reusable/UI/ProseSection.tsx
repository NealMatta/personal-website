import type { Section } from '@/src/types/content';
import type { PostSection } from '@/src/content/posts';

/*
One anchored heading and its writing, inside a `.prose` article.

Case studies, build logs and field notes all render their write-up this
way, and the anchor is what the "on this page" rail points at.

A case study's section is a list of plain paragraphs. A field note's is
Markdown, already rendered to HTML from a file in the repo (so it's
trusted), and lands in a `.md` wrapper that's `display: contents` — its
paragraphs sit in the article's flex column like any other.
*/

export default function ProseSection({
  section,
  extra,
}: {
  section: Section | PostSection;
  /* Anything the page wants to drop in under this heading — a data path,
     a row of taped cards. */
  extra?: React.ReactNode;
}) {
  return (
    <>
      {section.heading && (
        <h2 id={section.id} className="scroll-mt-8">
          {section.heading}
        </h2>
      )}
      {'html' in section ? (
        <div
          className="md"
          dangerouslySetInnerHTML={{ __html: section.html }}
        />
      ) : (
        section.body.map((paragraph, i) => <p key={i}>{paragraph}</p>)
      )}
      {extra}
    </>
  );
}
