'use client';
import React from 'react';

interface PageHeaderProps {
  header: string | (() => string) | React.ReactNode;
  subHeader: string | (() => string);
}

const PageHeader: React.FC<PageHeaderProps> = ({ header, subHeader }) => {
  // Function to resolve the prop value if it's a function or return the string directly
  const resolveValue = (value: string | (() => string) | React.ReactNode) => {
    return typeof value === 'function' ? value() : value;
  };

  return (
    <div className="page-header">
      <h1 className="text-4xl font-bold">{resolveValue(header)}</h1>
      <h3 className="text-2xl secondary-font">{resolveValue(subHeader)}</h3>
    </div>
  );
};

export default PageHeader;
