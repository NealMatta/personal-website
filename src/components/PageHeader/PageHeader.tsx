import React from 'react';

interface PageHeaderProps {
  header: string | (() => string); // Allow string or function for dynamic greeting
  subHeader: string | (() => string); // Allow string or function for dynamic date
}

export default function PageHeader({ header, subHeader }: PageHeaderProps) {
  // Helper function to resolve prop values
  const resolve = (value: string | (() => string)) =>
    typeof value === 'function' ? value() : value;

  return (
    <div className="mb-4">
      <h1 className="text-3xl font-bold">{resolve(header)}</h1>
      <h3 className="text-xl">{resolve(subHeader)}</h3>
    </div>
  );
}
