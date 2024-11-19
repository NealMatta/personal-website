import React from 'react';

interface PageHeaderProps {
  header: string;
  subHeader: string | (() => string); // Allow string or function to handle dynamic greeting
}

export default function PageHeader({ header, subHeader }: PageHeaderProps) {
  const resolveSubHeader = () =>
    typeof subHeader === 'function' ? subHeader() : subHeader;

  return (
    <div className="mb-4">
      <h1 className="text-3xl font-bold">{header}</h1>
      <h3 className="text-xl">{resolveSubHeader()}</h3>
    </div>
  );
}
