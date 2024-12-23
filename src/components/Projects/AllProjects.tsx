import Link from 'next/link';
import ProjectCard from './ProjectCard';
import { AllProjectProps } from '@/src/types';

export default function AllProjects({ projects }: AllProjectProps) {
  return (
    <>
      {projects.map((project) => (
        <Link key={project.id} href={`/projects/${project.id}`} passHref>
          <div className="cursor-pointer grow">
            <ProjectCard project={project} />
          </div>
        </Link>
      ))}
    </>
  );
}
