import React from 'react';
// import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

interface ProjectCardProps {
  className?: string; // Optional prop to accept custom class names
}

export default function ProjectCard({ className }: ProjectCardProps) {
  return (
    <div className={`flex flex-col p-2 border-2 rounded-md ${className}`}>
      {/* Image would go here */}
      <div className="relative flex h-24 w-full items-center justify-center rounded-lg bg-red-400 ">
        <FontAwesomeIcon icon={faUser} className="w-12" />
      </div>
      <div className="pt-5">
        <h1 className="font-bold text-xl">Title</h1>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea rem totam
          similique sequi porro quam deleniti, eligendi temporibus quod soluta
          illum nemo earum recusandae est! Reprehenderit incidunt nesciunt at.
          Ab.
        </p>
      </div>
    </div>
  );
}
