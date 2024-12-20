import React from 'react';

export default function ProjectPage({
  params,
}: {
  params: { project: string };
}) {
  return (
    <div>
      <p>
        Welcome to the <strong>{params.project}</strong> project!
      </p>
    </div>
  );
}
