import Link from 'next/link';
import Breadcrumb from '@/src/components/reusable/UI/Breadcrumb';
import Chip from '@/src/components/reusable/UI/Chip';
import PhotoSlot from '@/src/components/reusable/UI/PhotoSlot';
import Tape from '@/src/components/reusable/UI/Tape';
import SpecList from './SpecList';
import { KIND_STYLE, type BuildProject } from '@/src/content/projects';

/*
The write-up for something I made with my hands: what it needed to do,
how the build actually went, and what I got wrong.

Where a case study has architecture, this has a cut list.
*/

export default function BuildLog({ project }: { project: BuildProject }) {
  const kind = KIND_STYLE[project.kind];
  const steps = project.steps ?? [];

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

        <div className="flex flex-col gap-5 lg:col-span-8 lg:pt-10">
          <span
            className="self-start rounded-md px-2.5 py-[5px] font-mono text-xs font-medium"
            style={{ background: kind.background, color: kind.color }}
          >
            {kind.label}
          </span>
          <h1 className="m-0 font-display text-4xl font-extrabold leading-none tracking-[-.02em] sm:text-6xl lg:text-[80px]">
            {project.name}
          </h1>
          <p className="m-0 max-w-[720px] text-lg leading-relaxed text-pencil lg:text-[22px]">
            {project.dek}
          </p>
        </div>

        <div className="lg:col-span-3 lg:col-start-10">
          <SpecList columns={2} items={project.specs} />
        </div>
      </section>

      <figure className="mx-6 flex flex-col gap-3 lg:mx-16">
        <PhotoSlot
          label={project.coverLabel}
          src={project.coverSrc}
          className="h-[320px] rounded-3xl lg:h-[640px]"
          sizes="100vw"
        />
        <figcaption className="font-mono text-xs text-graphite">
          {project.name}
        </figcaption>
      </figure>

      <section className="grid grid-cols-1 items-start gap-10 px-6 py-16 lg:grid-cols-12 lg:px-16">
        <article className="prose flex flex-col gap-6 lg:col-span-8">
          {project.sections.map((section) => (
            <div key={section.id} className="contents">
              <h2 id={section.id} className="scroll-mt-8">
                {section.heading}
              </h2>
              {section.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}

              {/* The build log proper hangs off its own heading. */}
              {section.id === 'build-log' &&
                steps.map((step, i) => (
                  <div
                    key={step.title}
                    className="grid grid-cols-1 items-start gap-6 border-t border-rule py-6 lg:grid-cols-[minmax(0,1fr)_300px]"
                  >
                    <div className="flex flex-col gap-2.5">
                      <span
                        className="font-mono text-xs font-medium uppercase tracking-[.06em]"
                        style={{ color: kind.color }}
                      >
                        Step {i + 1}
                      </span>
                      <span className="font-display text-[26px] font-bold">
                        {step.title}
                      </span>
                      <span className="text-[17px] leading-relaxed text-[#2A2824]">
                        {step.body}
                      </span>
                    </div>
                    <PhotoSlot
                      label={step.photoLabel}
                      className="h-[200px] rounded-lg"
                      sizes="300px"
                    />
                  </div>
                ))}
            </div>
          ))}

          {project.detailPhotoLabels &&
            project.detailPhotoLabels.length > 0 && (
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {project.detailPhotoLabels.map((label) => (
                  <PhotoSlot
                    key={label}
                    label={label}
                    className="h-[220px] rounded-lg"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                ))}
              </div>
            )}
        </article>

        <aside className="flex flex-col gap-8 lg:col-span-4">
          <div className="relative flex flex-col gap-3.5 rounded-box border border-rule bg-card px-5 pb-5 pt-8">
            <Tape tilt={1.5} size={22} className="absolute -top-4 left-4">
              Made with
            </Tape>
            {project.materials.map((material) => (
              <div key={material.label} className="flex flex-col gap-0.5">
                <span className="font-mono text-[11px] uppercase tracking-[.06em] text-graphite">
                  {material.label}
                </span>
                <span className="text-base">{material.value}</span>
              </div>
            ))}
            {project.tools.length > 0 && (
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[11px] uppercase tracking-[.06em] text-graphite">
                  Tools
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tools.map((tool) => (
                    <Chip key={tool}>{tool}</Chip>
                  ))}
                </div>
              </div>
            )}
          </div>

          {project.cutList && project.cutList.length > 0 && (
            <div className="flex flex-col gap-3 rounded-box border border-rule px-5 py-6">
              <h2 className="m-0 font-display text-[22px] font-extrabold">
                Cut list
              </h2>
              <div className="grid grid-cols-[minmax(0,1fr)_40px_110px] gap-2.5 border-b border-rule pb-1.5 font-mono text-[10px] uppercase tracking-[.06em] text-graphite">
                <span>Part</span>
                <span>Qty</span>
                <span>Size</span>
              </div>
              {project.cutList.map((cut) => (
                <div
                  key={cut.part}
                  className="grid grid-cols-[minmax(0,1fr)_40px_110px] gap-2.5 text-[15px]"
                >
                  <span>{cut.part}</span>
                  <span>{cut.qty}</span>
                  <span className="font-mono text-[11px] text-pencil">
                    {cut.size}
                  </span>
                </div>
              ))}
              {project.downloads && project.downloads.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.downloads.map((file, i) => (
                    <Link
                      key={file.href}
                      href={file.href}
                      className={`rounded-lg px-3.5 py-[11px] text-sm font-semibold no-underline ${
                        i === 0
                          ? 'bg-ink text-paper'
                          : 'border border-ink py-2.5'
                      }`}
                    >
                      {file.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {project.fromCurriculum && (
            <div className="relative flex flex-col gap-2.5 rounded-box border border-rule bg-card px-5 pb-5 pt-8">
              <Tape tilt={-1.5} size={22} className="absolute -top-4 left-4">
                From the Curriculum
              </Tape>
              <span className="text-[15px] leading-relaxed text-pencil">
                This one was a class final.
              </span>
              <span className="text-[15px] font-semibold text-graphite">
                {project.fromCurriculum.code} · {project.fromCurriculum.name}
              </span>
            </div>
          )}
        </aside>
      </section>
    </>
  );
}
