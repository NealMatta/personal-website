import Link from 'next/link';
import Breadcrumb from '@/src/components/reusable/UI/Breadcrumb';
import PhotoSlot from '@/src/components/reusable/UI/PhotoSlot';
import StatusDot, { statusLabel } from '@/src/components/reusable/UI/StatusDot';
import ProseSection from '@/src/components/reusable/UI/ProseSection';
import TableOfContents from '@/src/components/reusable/UI/TableOfContents';
import Tape from '@/src/components/reusable/UI/Tape';
import ShareRow from './ShareRow';
import { formatPostDay, type Post } from '@/src/content/posts';

/*
One field note.

Same bones as a project case study — rail on the left, writing in the
middle, the thing it's about on the right — but narrower, because a note
is one idea and a case study is a whole build.
*/

const LINKEDIN = 'https://www.linkedin.com/in/nealmatta/';

export default function FieldNote({ post }: { post: Post }) {
  const byline = [
    `Published ${formatPostDay(post.publishedAt)}`,
    post.updatedAt ? `Updated ${formatPostDay(post.updatedAt)}` : null,
    `${post.readingMinutes} min read`,
  ]
    .filter(Boolean)
    .join(' · ');

  /* The figure goes under the second heading, or the only one there is.
     An untitled opening doesn't count as a heading. */
  const headed = post.sections
    .map((section, i) => (section.heading ? i : -1))
    .filter((i) => i !== -1);
  const figureAfter =
    headed[Math.min(1, headed.length - 1)] ?? post.sections.length - 1;

  return (
    <>
      <section className="grid grid-cols-1 gap-10 px-6 pb-10 pt-12 lg:grid-cols-12 lg:gap-x-6 lg:px-16">
        <div className="lg:col-span-12">
          <Breadcrumb
            trail={[
              { label: 'Home', href: '/' },
              { label: 'Field notes', href: '/writing' },
              { label: post.topic },
            ]}
          />
        </div>

        <div className="flex flex-col gap-6 lg:col-span-8 lg:col-start-3">
          <h1 className="m-0 font-display text-4xl font-extrabold leading-tight tracking-[-.02em] sm:text-5xl lg:text-[68px]">
            {post.title}
          </h1>
          <p className="m-0 max-w-[720px] text-lg leading-relaxed text-pencil lg:text-[22px]">
            {post.dek}
          </p>

          <div className="flex items-center gap-4 pt-2">
            <PhotoSlot
              label="Neal Matta"
              className="h-12 w-12 shrink-0 rounded-lg"
              tone="card"
              sizes="48px"
            />
            <div className="flex flex-col gap-1">
              <span className="text-base font-semibold">Neal Matta</span>
              <span className="font-mono text-xs uppercase tracking-[.06em] text-graphite">
                {byline}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-10 px-6 py-14 lg:grid-cols-12 lg:gap-x-6 lg:px-16">
        <aside className="hidden lg:col-span-2 lg:block">
          <TableOfContents sections={post.sections} />
        </aside>

        <article className="prose flex flex-col gap-6 lg:col-span-7 lg:col-start-3">
          {post.sections.map((section, i) => (
            <ProseSection
              key={section.id}
              section={section}
              /*
              Two things ride along inside the writing: the data path
              under the opening heading, where the note says what talks
              to what, and the figure one heading later, so the picture
              lands mid-note rather than trailing off the end of it.
              */
              extra={
                <>
                  {i === 0 && post.dataPath && (
                    <div className="flex flex-col gap-3 rounded-xl bg-ink p-6 text-paper">
                      <span className="font-mono text-xs uppercase tracking-[.06em] text-[#BDB5A5]">
                        Data path
                      </span>
                      <span className="font-mono text-sm leading-[1.9] text-[#E8DDC4]">
                        {post.dataPath}
                      </span>
                    </div>
                  )}

                  {i === figureAfter && (
                    <figure className="m-0 flex flex-col gap-2.5">
                      <PhotoSlot
                        label={post.coverLabel}
                        src={post.coverSrc}
                        className="h-[220px] rounded-xl"
                        tone="card"
                        sizes="(max-width: 1024px) 100vw, 55vw"
                      />
                      <figcaption className="font-mono text-xs text-graphite">
                        Fig. 1 — {post.coverLabel}
                      </figcaption>
                    </figure>
                  )}
                </>
              }
            />
          ))}
        </article>

        <aside className="flex flex-col gap-6 lg:col-span-3">
          {post.relatedLab && (
            <div className="relative flex flex-col gap-3 rounded-box border border-rule bg-card px-5 pb-5 pt-8">
              <Tape tilt={1.5} size={22} className="absolute -top-4 left-4">
                Related in the Lab
              </Tape>
              <Link
                href="/lab"
                className="text-base font-semibold no-underline"
              >
                {post.relatedLab.name}
              </Link>
              <span className="text-sm leading-relaxed text-pencil">
                {post.relatedLab.blurb}
              </span>
              <StatusDot
                status={post.relatedLab.status}
                label={`${post.relatedLab.code} · ${statusLabel(
                  post.relatedLab.status
                )}`}
              />
            </div>
          )}

          {post.relatedProject && (
            <div className="relative flex flex-col gap-3 rounded-box border border-rule bg-card px-5 pb-5 pt-8">
              <Tape tilt={-1.5} size={22} className="absolute -top-4 left-4">
                From this project
              </Tape>
              <Link
                href={`/projects/${post.relatedProject.slug}`}
                className="text-base font-semibold no-underline"
              >
                {post.relatedProject.name}
              </Link>
            </div>
          )}

          <ShareRow />
        </aside>
      </section>

      <section className="grid grid-cols-1 gap-10 px-6 pb-16 lg:grid-cols-12 lg:gap-x-6 lg:px-16">
        <div className="flex items-center gap-6 rounded-xl border border-rule bg-card p-7 lg:col-span-8 lg:col-start-3">
          <PhotoSlot
            label="Neal Matta"
            className="h-[88px] w-[88px] shrink-0 rounded-[10px]"
            tone="paper"
            sizes="88px"
          />
          <div className="flex flex-grow flex-col gap-2">
            <span className="font-display text-[22px] font-bold">
              I&rsquo;m Neal Matta
            </span>
            <span className="text-[15px] leading-relaxed text-pencil">
              Based in Chicago. I write about building small, well-labeled
              systems.
            </span>
          </div>
          <Link
            href={LINKEDIN}
            target="_blank"
            rel="noreferrer"
            className="hidden whitespace-nowrap rounded-lg bg-ink px-[18px] py-3 text-sm font-semibold text-paper no-underline transition-colors hover:bg-[#0A66C2] sm:block"
          >
            Follow on LinkedIn
          </Link>
        </div>
      </section>
    </>
  );
}
