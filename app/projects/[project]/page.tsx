import React from 'react';
// const projectExample = {
//   id: 101,
//   title: 'Build a Birdhouse',
//   tags: ['woodworking', 'DIY', 'outdoors'],
//   featured: true,
//   description: 'A project to construct a wooden birdhouse for your backyard.',
//   details: [
//     {
//       order: 1,
//       id: 1,
//       title: 'Gather Materials',
//       detail: 'Collect all necessary tools and wood for the birdhouse.',
//     },
//     {
//       order: 2,
//       id: 2,
//       title: 'Cut and Assemble',
//       detail: 'Cut the wood into pieces and assemble the birdhouse structure.',
//     },
//     {
//       order: 3,
//       id: 3,
//       title: 'Paint and Decorate',
//       detail: 'Paint the birdhouse and add decorative elements.',
//     },
//   ],
//   images: [
//     'https://example.com/images/birdhouse1.jpg',
//     'https://example.com/images/birdhouse2.jpg',
//   ],
// };

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project } = await params; // If params.project needs async, handle it here

  return (
    <div>
      <h1>Project: {project}</h1>
    </div>
  );
}
