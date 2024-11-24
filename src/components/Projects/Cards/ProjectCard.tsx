import React from 'react';
// import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ProjectCardProps } from '@/src/types';

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div
      className={
        'flex flex-col p-2 border-2 rounded shadow-sm bg-white hover:opacity-50 transition'
      }
    >
      {/* Image would go here */}
      <div className="flex h-48 w-full items-center justify-center rounded bg-red-400 ">
        <FontAwesomeIcon icon={faUser} />
      </div>
      <div className="pt-3">
        <h1 className="font-bold text-xl">{project.title}</h1>
        <p className="text-sm">{project.description}</p>
      </div>
    </div>
  );
}
