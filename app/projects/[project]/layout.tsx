import React from 'react';
import PageHeader from '@/src/components/PageHeader/PageHeader';

export default function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { project: string };
}) {
  return (
    <>
      <PageHeader
        header={`Project: ${params.project}`}
        subHeader="Some detail about the project"
      />
      <main>{children}</main>
    </>
  );
}
