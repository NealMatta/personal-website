import BarebonesCard from '../cards/BarebonesCard';
import Link from 'next/link';
import AllProjects from './AllProjects';
import PROJECTS from '@/src/mockData/projects.json';

export default function FeaturedProjects() {
  // Dummy Data but same logic
  const featuredProjects = PROJECTS.filter((project) => project.featured);

  return (
    <BarebonesCard title="Featured Projects" wip={true}>
      <div className="flex flex-col">
        <div className="flex flex-col lg:flex-row gap-2 my-2">
          {/* Pass mock project details to the client-side component */}
          <AllProjects projects={featuredProjects} />
        </div>
        <div className="ml-auto text-right">
          <Link
            href="/projects"
            className="text-md italic underline text-blue-500 hover:text-blue-950"
          >
            Check out all my Projects
          </Link>
        </div>
      </div>
    </BarebonesCard>
  );
}
