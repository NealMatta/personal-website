import React from 'react';
import PageHeader from '@/src/components/reusable/pageHeader/PageHeader';
import AllProjects from '@/src/components/pages/Projects/AllProjects';
import { getAllProjects } from '@/src/apiManagement/projects/project';

export default async function Projects() {
  const allProjects = await getAllProjects();
  return (
    <>
      <PageHeader
        header="Projects"
        subHeader="A glimpse into my passions and progress — from coding and creative
          pursuits to personal growth and volleyball goals."
      />

      <div className="grid gap-4 my-4 grid-cols-1 sm:grid-cols-2">
        {/* Pass mock project details to the client-side component */}
        <AllProjects projects={allProjects} />
      </div>
    </>
  );
}
