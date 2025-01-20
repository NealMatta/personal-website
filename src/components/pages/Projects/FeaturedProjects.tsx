import BarebonesCard from '../../reusable/cards/BarebonesCard';
import Link from 'next/link';
import AllProjects from './AllProjects';
import { getAllProjects } from '@/src/apiManagement/projects/project';

export default async function FeaturedProjects() {
  const allProjects = await getAllProjects();
  // Dummy Data but same logic
  const featuredProjects =
    allProjects && allProjects.filter((project) => project.featured);

  return (
    <BarebonesCard title="Featured Projects">
      <div className="flex flex-col">
        <div className="grid gap-4 my-4 grid-cols-1 lg:grid-cols-2 ">
          <AllProjects projects={featuredProjects} />
        </div>
        <div className="ml-auto text-right">
          <Link
            href="/projects"
            className="text-md italic underline text-primary hover:text-primary-dark"
          >
            Check out all my Projects
          </Link>
        </div>
      </div>
    </BarebonesCard>
  );
}
