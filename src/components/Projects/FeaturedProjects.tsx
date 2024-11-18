import ProjectCardCompact from './Cards/ProjectCardCompact';
import BasicCard from '../card/BasicCard';
import Link from 'next/link';

export default function FeaturedProjects() {
  return (
    <BasicCard>
      <div className="flex flex-col">
        <h1 className="font-bold">
          <span className="lg:hidden">Featured Project</span>
          <span className="hidden lg:inline">Featured Projects</span>
        </h1>
        <div className="gap-2 my-2 flex flex-wrap lg:flex-nowrap">
          {/* Both cards are displayed for larger screens */}
          <ProjectCardCompact className="w-full lg:w-auto" />
          <ProjectCardCompact className="hidden lg:block" />
        </div>
        <div className="ml-auto text-right">
          <Link
            href="/projects"
            className="text-xs italic underline text-blue-500 hover:text-blue-950"
          >
            Check out all my Projects
          </Link>
        </div>
      </div>
    </BasicCard>
  );
}
