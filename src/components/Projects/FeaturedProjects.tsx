// 'use client'; // No longer needed at the top of this file
import BarebonesCard from '../cards/BarebonesCard';
import Link from 'next/link';
import ClientSideProjects from './ClientSideProjects';

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
  return (
    <BarebonesCard>
      <div className="flex flex-col">
        <h1 className="font-bold">
          <span className="">Featured Projects</span>
        </h1>
        <div className="gap-2 my-2 flex flex-wrap lg:flex-nowrap">
          {/* Pass mock project details to the client-side component */}
          <ClientSideProjects projects={mockProjectDetails} />
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
    </BarebonesCard>
  );
}
