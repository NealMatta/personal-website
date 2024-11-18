import ProjectCardCompact from './Cards/ProjectCardCompact';
import BasicCard from '../card/BasicCard';
import Link from 'next/link';

export default function FeaturedProjects() {
  return (
    <BasicCard>
      <div className="flex flex-col">
        <h1 className="font-bold">Featured Projects</h1>
        <div className="flex gap-2 my-2">
          <ProjectCardCompact />
          <ProjectCardCompact />
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
