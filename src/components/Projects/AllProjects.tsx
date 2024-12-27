import Link from 'next/link';
import ProjectCard from './ProjectCard';
import { Project } from '@/src/types';

export default function AllProjects({
  projects,
}: {
  projects: Project[] | null;
}) {
  return (
    <>
      {projects && !projects.length && (
        <h3 className="text-xl italic">
          Nothing to see ... <span className="font-black">yet</span>
        </h3>
      )}
      {projects &&
        projects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`} passHref>
            <div className="cursor-pointer grow">
              <ProjectCard project={project} />
            </div>
          </Link>
        ))}
    </>
  );
}
