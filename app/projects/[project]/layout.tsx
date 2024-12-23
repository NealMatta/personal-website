import React from 'react';
import PageHeader from '@/src/components/PageHeader/PageHeader';

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ project: string }>;
}) {
  const { project } = await params;
  return (
    <>
      <PageHeader
        header={`Project: ${project}`}
        subHeader="Some detail about the project"
      />
      <main>{children}</main>
    </>
  );
}
