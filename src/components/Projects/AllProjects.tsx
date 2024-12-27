import Link from 'next/link';
import ProjectCard from './ProjectCard';
import { Database } from '@/src/types/supabase'; // Adjust the import path as needed

type Project = Database['public']['Tables']['projects']['Row'];

export default function AllProjects({
  projects,
}: {
  projects: Project[] | string;
}) {
  if (typeof projects === 'string') {
    // If `projects` is a string, return the string value
    return <p>{projects}</p>;
  }

  // If `projects` is an array, render the list
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
