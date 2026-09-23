import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CaseStudy from '@/src/components/pages/Projects/CaseStudy';
import BuildLog from '@/src/components/pages/Projects/BuildLog';
import {
  PROJECTS,
  getProject,
  isBuild,
  projectsByRecency,
} from '@/src/content/projects';

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};

  return {
    title: `${project.name} — Neal Matta`,
    description: project.dek,
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  // "Next project" wraps around, so the last one leads back to the first.
  const ordered = projectsByRecency();
  const index = ordered.findIndex((p) => p.slug === project.slug);
  const next = ordered[(index + 1) % ordered.length];

  return (
    <>
      {isBuild(project) ? (
        <BuildLog project={project} />
      ) : (
        <CaseStudy project={project} />
      )}

      <section className="grid grid-cols-1 gap-6 px-6 pb-[72px] lg:grid-cols-2 lg:px-16">
        <Link
          href="/projects"
          className="flex flex-col gap-2 border-t-2 border-ink py-6 no-underline"
        >
          <span className="font-mono text-xs uppercase tracking-[.06em] text-graphite">
            ← Back to
          </span>
          <span className="font-display text-[22px] font-semibold">
            All projects
          </span>
        </Link>

        {next && next.slug !== project.slug && (
          <Link
            href={`/projects/${next.slug}`}
            className="flex flex-col gap-2 border-t-2 border-ink py-6 no-underline lg:text-right"
          >
            <span className="font-mono text-xs uppercase tracking-[.06em] text-graphite">
              Next project →
            </span>
            <span className="font-display text-[22px] font-semibold">
              {next.name}
            </span>
          </Link>
        )}
      </section>
    </>
  );
}
