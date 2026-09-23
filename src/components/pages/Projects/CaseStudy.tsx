import Link from 'next/link';
import Breadcrumb from '@/src/components/reusable/UI/Breadcrumb';
import Chip from '@/src/components/reusable/UI/Chip';
import StatusDot, { statusLabel } from '@/src/components/reusable/UI/StatusDot';
import PhotoSlot from '@/src/components/reusable/UI/PhotoSlot';
import Tape from '@/src/components/reusable/UI/Tape';
import ProseSection from '@/src/components/reusable/UI/ProseSection';
import TableOfContents from '@/src/components/reusable/UI/TableOfContents';
import SpecList from './SpecList';
import type { SoftwareProject } from '@/src/content/projects';

/*
The write-up for something I built in software: what was wrong, what I
did about it, how it's wired, and the part I'd do differently.
*/

export default function CaseStudy({ project }: { project: SoftwareProject }) {
  const approachSection = project.sections.find((s) => s.id === 'the-approach');

  return (
    <>
      <section className="grid grid-cols-1 gap-8 px-6 pb-12 pt-12 lg:grid-cols-12 lg:gap-x-6 lg:px-16">
        <div className="lg:col-span-12">
          <Breadcrumb
            trail={[
              { label: 'Home', href: '/' },
              { label: 'Projects', href: '/projects' },
              { label: project.name },
            ]}
          />
        </div>

        <div className="flex flex-col gap-6 lg:col-span-8 lg:pt-10">
          <h1 className="m-0 font-display text-4xl font-extrabold leading-tight tracking-[-.02em] sm:text-5xl lg:text-[72px]">
            {project.title}
          </h1>
          <p className="m-0 max-w-[720px] text-lg leading-relaxed text-pencil lg:text-[22px]">
            {project.dek}
          </p>
        </div>

        <div className="lg:col-span-3 lg:col-start-10">
          <SpecList
            items={[
              {
                label: 'Status',
                value: (
                  <span className="flex items-center gap-2">
                    <StatusDot status={project.status} bare />
                    {statusLabel(project.status)}
                  </span>
                ),
              },
              { label: 'Built', value: project.built },
              { label: 'Role', value: project.role },
              {
                label: 'Stack',
                value: (
                  <span className="flex flex-wrap gap-1.5">
                    {project.stack.map((tool) => (
                      <Chip key={tool}>{tool}</Chip>
                    ))}
                  </span>
                ),
              },
            ]}
          />
        </div>
      </section>

      <figure className="mx-6 flex flex-col gap-3 lg:mx-16">
        <PhotoSlot
          label={project.coverLabel}
          src={project.coverSrc}
          className="h-[320px] rounded-3xl lg:h-[620px]"
          sizes="100vw"
        />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <figcaption className="font-mono text-xs text-graphite">
            {project.name}
          </figcaption>
          <div className="flex gap-4">
            {project.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                className="text-[15px] font-semibold"
              >
                {link.label} {link.href.startsWith('http') ? '↗' : '→'}
              </Link>
            ))}
          </div>
        </div>
      </figure>

      <section className="grid grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-12 lg:gap-x-6 lg:px-16">
        <aside className="hidden lg:col-span-2 lg:block">
          <TableOfContents sections={project.sections} />
        </aside>

        <article className="prose flex flex-col gap-6 lg:col-span-7 lg:col-start-3">
          {project.sections.map((section) => (
            <ProseSection
              key={section.id}
              section={section}
              /* The approach cards belong under their own heading. */
              extra={
                section.id === approachSection?.id && project.approach ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {project.approach.map((card) => (
                      <div
                        key={card.label}
                        className="relative flex flex-col gap-2.5 rounded-box border border-rule bg-card px-4 pb-4 pt-8"
                      >
                        <Tape
                          tilt={card.tilt}
                          size={20}
                          className="absolute -top-3.5 left-3"
                        >
                          {card.label}
                        </Tape>
                        <span className="text-[15px] leading-relaxed text-[#2A2824]">
                          {card.text}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : section.id === 'how-its-built' && project.dataPath ? (
                  <div className="flex flex-col gap-3 rounded-xl bg-ink p-6 text-paper">
                    <span className="font-mono text-xs uppercase tracking-[.06em] text-[#BDB5A5]">
                      Data path
                    </span>
                    <span className="font-mono text-sm leading-[1.9] text-[#E8DDC4]">
                      {project.dataPath}
                    </span>
                  </div>
                ) : null
              }
            />
          ))}
        </article>

        <aside className="flex flex-col gap-8 lg:col-span-3">
          {project.fromLab && project.fromLab.length > 0 && (
            <div className="relative flex flex-col gap-3.5 rounded-box border border-rule bg-card px-5 pb-5 pt-8">
              <Tape tilt={1.5} size={22} className="absolute -top-4 left-4">
                Started in the Lab
              </Tape>
              {project.fromLab.map((exp) => (
                <Link
                  key={exp.code}
                  href="/lab"
                  className="flex justify-between text-[15px] font-semibold no-underline"
                >
                  <span>{exp.name}</span>
                  <span className="font-mono text-[11px] text-graphite">
                    {exp.code}
                  </span>
                </Link>
              ))}
            </div>
          )}

          {project.relatedNotes && project.relatedNotes.length > 0 && (
            <div className="relative flex flex-col gap-3 rounded-box border border-rule bg-card px-5 pb-5 pt-8">
              <Tape tilt={-1.5} size={22} className="absolute -top-4 left-4">
                Related notes
              </Tape>
              {project.relatedNotes.map((note) => (
                <Link
                  key={note.slug}
                  href={`/writing/${note.slug}`}
                  className="text-[15px] font-semibold leading-snug no-underline"
                >
                  {note.title}
                </Link>
              ))}
            </div>
          )}
        </aside>
      </section>
    </>
  );
}
