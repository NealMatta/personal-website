import ProjectCardCompact from './Cards/ProjectCardCompact';
import BarebonesCard from '../cards/BarebonesCard';
import CardTitle from '../cards/CardTitle';
import Link from 'next/link';

export default function FeaturedProjects() {
  return (
    <BarebonesCard>
      <div className="flex flex-col">
        <CardTitle>
          <span className="lg:hidden">Featured Project</span>
          <span className="hidden lg:inline">Featured Projects</span>
        </CardTitle>
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
    </BarebonesCard>
  );
}
