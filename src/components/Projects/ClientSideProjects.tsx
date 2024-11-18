'use client';

import { useState } from 'react';
import ProjectCardCompact from './Cards/ProjectCardCompact';
import ProjectModal from './ProjectModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function ClientSideProjects({
  projects,
}: {
  projects: { id: number; title: string; description: string }[];
}) {
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
    <>
      {/* Right now this works because there are only two projects that I'm passing in. 
    When I get to the database management stuff, I'll need to add a boolean that states whether or not the 
    project is a featured project and then the API I run needs to only look at projects that have that filter */}
      {projects.map((project) => (
        <div
          key={project.id}
          onClick={() => openModal(project)}
          className="cursor-pointer"
        >
          <ProjectCardCompact className="w-full lg:w-auto" />
        </div>
      ))}
      {/* Modal for Project Details */}
      <ProjectModal isOpen={isModalOpen} onClose={closeModal}>
        {selectedProject && (
          <div className="overflow-scroll max-h-[calc(100vh-100px)]">
            <h2 className="font-bold text-xl">{selectedProject.title}</h2>
            <div className="flex flex-col md:flex-row gap-2">
              <div className="w-full md:w-1/2 flex flex-col gap-2">
                <div className="relative flex items-center justify-center w-full h-full rounded-lg bg-red-400">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="relative flex items-center justify-center w-full h-full rounded-lg bg-red-400">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="relative flex items-center justify-center w-full h-full rounded-lg bg-red-400">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="relative flex items-center justify-center w-full h-full rounded-lg bg-red-400">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="relative flex items-center justify-center w-full h-full rounded-lg bg-red-400">
                  <FontAwesomeIcon icon={faUser} />
                </div>
              </div>

              <div className="w-full md:w-1/2 ">
                {/* <p>{selectedProject.description}</p> */}
                <div className="mb-2">
                  <h3 className="font-bold text-lg">What is It?</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quis, unde nulla voluptatibus alias iste incidunt nihil
                    ipsam molestiae sint nisi eveniet, dolorum in officia magnam
                    doloremque corrupti autem repudiandae provident. Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Quis, unde
                    nulla voluptatibus alias iste incidunt nihil ipsam molestiae
                    sint nisi eveniet, dolorum in officia magnam doloremque
                    corrupti autem repudiandae provident. ipsam molestiae sint
                    nisi eveniet, dolorum in officia magnam doloremque corrupti
                    autem repudiandae provident. Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Quis, unde nulla voluptatibus
                    alias iste incidunt nihil ipsam molestiae sint nisi eveniet,
                    dolorum in officia magnam doloremque corrupti autem
                    repudiandae provident.ipsam molestiae sint nisi eveniet,
                    dolorum in officia magnam doloremque corrupti autem
                    repudiandae provident. Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Quis, unde nulla voluptatibus
                    alias iste incidunt nihil ipsam molestiae sint nisi eveniet,
                    dolorum in officia magnam doloremque corrupti autem
                    repudiandae provident.ipsam molestiae sint nisi eveniet,
                    dolorum in officia magnam doloremque corrupti autem
                    repudiandae provident. Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Quis, unde nulla voluptatibus
                    alias iste incidunt nihil ipsam molestiae sint nisi eveniet,
                    dolorum in officia magnam doloremque corrupti autem
                    repudiandae provident.
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
    </>
  );
}
