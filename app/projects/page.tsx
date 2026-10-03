import type { Metadata } from 'next';
import PageIntro from '@/src/components/reusable/UI/PageIntro';
import FeaturedProject from '@/src/components/pages/Projects/FeaturedProject';
import ProjectCard from '@/src/components/pages/Projects/ProjectCard';
import {
  PROJECTS,
  featuredProject,
  projectsByRecency,
} from '@/src/content/projects';

export const metadata: Metadata = {
  title: 'Projects — Neal Matta',
  description:
    'Finished work with the thinking written down: the problem, the approach, and what I’d do differently.',
};

export default function Projects() {
  const featured = featuredProject();
  const rest = projectsByRecency().filter((p) => p.slug !== featured?.slug);

  const fromLab = PROJECTS.filter((p) => p.origin.includes('EXP')).length;

  return (
    <>
      <PageIntro
        title="Projects"
        description="Finished work with the thinking written down: the problem, the approach, and what I’d do differently. Most of these started as experiments in the Lab."
        stats={[
          { value: PROJECTS.length, label: 'Shipped' },
          { value: fromLab, label: 'From the Lab' },
        ]}
      />

      {featured && <FeaturedProject project={featured} />}

      <section className="flex flex-col gap-10 px-6 pb-20 pt-[72px] lg:px-16">
        <div className="flex items-baseline justify-between">
          <h2 className="m-0 font-display text-4xl font-extrabold">
            Everything in the box
          </h2>
          <span className="font-mono text-xs uppercase tracking-[.06em] text-graphite">
            Newest first
          </span>
        </div>

        {rest.length === 0 ? (
          <p className="m-0 text-base text-pencil">
            Everything else is still in the Laboratory.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
