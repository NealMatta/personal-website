import Link from 'next/link';
import ProjectCard from './Cards/ProjectCard';
import { ClientSideProjectsProps } from '@/src/types';

export default function ClientSideProjects({
  projects,
}: ClientSideProjectsProps) {
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

{
  /* <ProjectModal isOpen={isModalOpen} onClose={closeModal}>
{selectedProject && (
  <div className="overflow-scroll max-h-[calc(100vh-100px)]">
    <h2 ref={modalRef} className="font-bold text-xl">
      {selectedProject.title}
    </h2>
    <div className="flex flex-col md:flex-row gap-2">
      <div className="w-full md:w-1/2 flex flex-col gap-2">
        <div className="relative flex items-center justify-center w-full h-full rounded-lg bg-red-400">
          <FontAwesomeIcon icon={faUser} className="fa-icon" />
        </div>
        <div className="relative flex items-center justify-center w-full h-full rounded-lg bg-red-400">
          <FontAwesomeIcon icon={faUser} className="fa-icon" />
        </div>
        <div className="relative flex items-center justify-center w-full h-full rounded-lg bg-red-400">
          <FontAwesomeIcon icon={faUser} className="fa-icon" />
        </div>
        <div className="relative flex items-center justify-center w-full h-full rounded-lg bg-red-400">
          <FontAwesomeIcon icon={faUser} className="fa-icon" />
        </div>
        <div className="relative flex items-center justify-center w-full h-full rounded-lg bg-red-400">
          <FontAwesomeIcon icon={faUser} className="fa-icon" />
        </div>
      </div>

      <div className="w-full md:w-1/2 ">
        <div className="mb-2">
          <p>{selectedProject.description}</p>

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
</ProjectModal> */
}
