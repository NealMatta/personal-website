import React from 'react';
import PageHeader from '@/src/components/PageHeader/PageHeader';
import PROJECTS from '@/src/mockData/projects.json';
import ClientSideProjects from '@/src/components/Projects/ClientSideProjects';

const Projects = () => {
  return (
    <>
      <PageHeader
        header="Projects"
        subHeader="A glimpse into my passions and progress — from coding and creative
          pursuits to personal growth and volleyball goals."
      />

      <div className="grid gap-4 my-4 grid-cols-1 sm:grid-cols-2 ">
        {/* Pass mock project details to the client-side component */}
        <ClientSideProjects projects={PROJECTS} />
      </div>
    </>
  );
};

export default Projects;
