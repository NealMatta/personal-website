import React from 'react';
// import Image from 'next/image';
import ProjectTags from './ProjectTags';
import { Database } from '@/src/types/supabase'; // Adjust the import path as needed

type Project = Database['public']['Tables']['projects']['Row'];

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className={
        'flex flex-col p-2 border-2 rounded shadow-md bg-white hover:opacity-50 transition'
      }
    >
      {/* Image would go here */}
      <div className="flex h-60 w-full items-center justify-center rounded bg-red-400 ">
        {/* <FontAwesomeIcon icon={faUser} className="fa-icon" /> */}
      </div>
      <div className="pt-3">
        <h1 className="font-bold text-3xl mb-1.5">{project.title}</h1>
        <div className="flex flex-wrap gap-x-3">
          <ProjectTags tags={project.tags} />
        </div>
      </div>
    </div>
  );
}
