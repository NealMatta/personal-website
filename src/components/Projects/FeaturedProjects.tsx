'use client';
import { useState } from 'react';
import ProjectCardCompact from './Cards/ProjectCardCompact';
import BarebonesCard from '../cards/BarebonesCard';
import ProjectModal from './ProjectModal';
import Link from 'next/link';
// import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const mockProjectDetails = [
  {
    id: 1,
    title: 'Project 1',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea rem totamsimilique sequi porro quam deleniti, eligendi temporibus quod solutaillum nemo earum recusandae est! Reprehenderit incidunt nesciunt at.Ab.',
  },
  { id: 2, title: 'Project 2', description: 'Details about Project 2' },
];

export default function FeaturedProjects() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<{
    id: number;
    title: string;
    description: string;
  } | null>(null);

  const openModal = (project: {
    id: number;
    title: string;
    description: string;
  }) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <BarebonesCard>
      <div className="flex flex-col">
        <h1 className="font-bold">
          <span className="">Featured Projects</span>
        </h1>
        <div className="gap-2 my-2 flex flex-wrap lg:flex-nowrap">
          {/* Render Project Cards */}
          {mockProjectDetails.map((project) => (
            <div
              key={project.id}
              onClick={() => openModal(project)}
              className="cursor-pointer"
            >
              <ProjectCardCompact className="w-full lg:w-auto" />
            </div>
          ))}
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

      {/* Modal for Project Details */}
      <ProjectModal isOpen={isModalOpen} onClose={closeModal}>
        {selectedProject && (
          <div>
            <h2 className="font-bold text-xl">{selectedProject.title}</h2>
            <div className="flex flex-col md:flex-row gap-2">
              <div className="md:w-1/3 w-full flex flex-col gap-2">
                <div className="relative flex w-full h-full items-center justify-center rounded-lg bg-red-400 ">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="relative flex w-full h-full items-center justify-center rounded-lg bg-red-400 ">
                  <FontAwesomeIcon icon={faUser} />
                </div>
              </div>

              <div className="w-full md:w-2/3 ">
                {/* <p>{selectedProject.description}</p> */}
                <div className="mb-2">
                  <h3 className="font-bold text-lg">What is It?</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quis, unde nulla voluptatibus alias iste incidunt nihil
                    ipsam molestiae sint nisi eveniet, dolorum in officia magnam
                    doloremque corrupti autem repudiandae provident.
                  </p>
                </div>
                <div className="mb-2">
                  <h3 className="font-bold text-lg">Why I did It?</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quis, unde nulla voluptatibus alias iste incidunt nihil
                    ipsam molestiae sint nisi eveniet, dolorum in officia magnam
                    doloremque corrupti autem repudiandae provident.
                  </p>
                </div>
                <div className="mb-2">
                  <h3 className="font-bold text-lg">What I Learned?</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quis, unde nulla voluptatibus alias iste incidunt nihil
                    ipsam molestiae sint nisi eveniet, dolorum in officia magnam
                    doloremque corrupti autem repudiandae provident.
                  </p>
                </div>
                <div className="mb-2">
                  <h3 className="font-bold text-lg">Future</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quis, unde nulla voluptatibus alias iste incidunt nihil
                    ipsam molestiae sint nisi eveniet, dolorum in officia magnam
                    doloremque corrupti autem repudiandae provident.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </ProjectModal>
    </BarebonesCard>
  );
}
