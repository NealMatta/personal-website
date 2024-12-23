import React from 'react';
import PageHeader from '@/src/components/PageHeader/PageHeader';
import { Project } from '@/src/types/projects';
import BarebonesCard from '@/src/components/cards/BarebonesCard';

export default async function ProjectPage(
  {
    // params,
  }: {
    params: Promise<{ project: string }>;
  }
) {
  // const { project } = await params;
  // Code above will come into play when I need to pull from teh database

  // Run some code to grab the project information from the database

  const projectExample: Project = {
    id: 101,
    title: 'Build a Birdhouse',
    tags: ['woodworking', 'DIY', 'outdoors'],
    featured: true,
    description: 'A project to construct a wooden birdhouse for your backyard.',
    details: [
      {
        order: 1,
        id: 1,
        title: 'Gather Materials',
        detail: 'Collect all necessary tools and wood for the birdhouse.',
      },
      {
        order: 2,
        id: 2,
        title: 'Cut and Assemble',
        detail:
          'Cut the wood into pieces and assemble the birdhouse structure.',
      },
      {
        order: 3,
        id: 3,
        title: 'Paint and Decorate',
        detail: 'Paint the birdhouse and add decorative elements.',
      },
    ],
    images: [
      'https://example.com/images/birdhouse1.jpg',
      'https://example.com/images/birdhouse2.jpg',
    ],
  };

  return (
    <div>
      <PageHeader
        header={`${projectExample.title}`}
        subHeader={projectExample.description}
      />
      <div className="flex space-x-3">
        {projectExample.tags?.map((tag, index) => (
          <p
            key={index}
            className="border border-foreground px-2 py-1 rounded-md uppercase text-xs tracking-wider italic mb-3"
          >
            {tag}
          </p>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column */}
        <div className="flex-1 space-y-4">
          {projectExample.details
            .sort((a, b) => a.order - b.order) // Sort by the 'order' property
            .map((detail) => (
              <BarebonesCard key={detail.id}>
                <h3 className="font-bold text-lg mb-2">{detail.title}</h3>
                <p>{detail.detail}</p>
              </BarebonesCard>
            ))}
        </div>

        {/* Right Column */}
        <div className="flex-1 space-y-4">
          {projectExample.images.map((image, index) => (
            <div
              key={index}
              className="w-full h-full bg-gray-200 rounded-md overflow-hidden"
            >
              <img
                src={image}
                alt={`Project Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
