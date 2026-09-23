import Link from 'next/link';
import Tape from '@/src/components/reusable/UI/Tape';
import Chip from '@/src/components/reusable/UI/Chip';
import StatusDot from '@/src/components/reusable/UI/StatusDot';
import PhotoSlot from '@/src/components/reusable/UI/PhotoSlot';
import { isBuild, type Project } from '@/src/content/projects';

/*
The one project at the top of the index, opened up: the problem, the
approach, and the honest bit about what I'd change.
*/

export default function FeaturedProject({ project }: { project: Project }) {
  const problem = project.sections.find((s) => s.id === 'the-problem');
  const approach = project.sections.find((s) => s.id === 'the-approach');
  const retro = project.sections.find((s) => s.id === 'what-id-change');

  const lines: Array<{ label: string; text?: string }> = [
    { label: 'Problem', text: problem?.body[0] },
    { label: 'Approach', text: approach?.body[0] },
    { label: 'What I’d change', text: retro?.body[0] },
  ];

  return (
    <section className="px-6 pt-14 lg:px-16">
      <article className="relative grid grid-cols-1 gap-8 rounded-box border border-rule bg-card px-6 pb-10 pt-12 lg:grid-cols-12 lg:gap-x-8 lg:px-10">
        <Tape tilt={-1.5} size={32} className="absolute -top-5 left-7">
          {project.name}
        </Tape>

        <PhotoSlot
          label={project.coverLabel}
          src={project.coverSrc}
          tone="paper"
          className="h-[280px] rounded-xl lg:col-span-7 lg:h-[440px]"
          sizes="(max-width: 1024px) 100vw, 58vw"
        />

        <div className="flex flex-col gap-5 lg:col-span-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[.06em] text-graphite">
              Featured
            </span>
            <StatusDot status={project.status} />
          </div>

          <h2 className="m-0 font-display text-3xl font-extrabold leading-tight tracking-[-.01em] lg:text-4xl">
            {project.title}
          </h2>

          <div className="flex flex-col gap-3.5">
            {lines.map(
              (line) =>
                line.text && (
                  <div key={line.label} className="flex flex-col gap-1">
                    <span className="font-mono text-[11px] uppercase tracking-[.06em] text-graphite">
                      {line.label}
                    </span>
                    <span className="line-clamp-3 text-base leading-snug text-[#2A2824]">
                      {line.text}
                    </span>
                  </div>
                )
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tool) => (
              <Chip key={tool}>{tool}</Chip>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap gap-3 pt-2">
            <Link
              href={`/projects/${project.slug}`}
              className="sky-button bg-ink px-[18px] py-3 text-[15px] font-semibold text-paper no-underline"
            >
              <span>
                {isBuild(project) ? 'Read the build log' : 'Read the write-up'}
              </span>
            </Link>
            {!isBuild(project) &&
              project.links
                .filter((l) => l.href.startsWith('http'))
                .slice(0, 1)
                .map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-ink px-[18px] py-[11px] text-[15px] font-semibold no-underline"
                  >
                    {link.label} ↗
                  </Link>
                ))}
          </div>
        </div>
      </article>
    </section>
  );
}
