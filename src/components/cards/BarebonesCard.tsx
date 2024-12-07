// Reusable wrapper with the background and padding set

import React from 'react';

interface BasicCardProps {
  title?: string | React.ReactNode;
  children: React.ReactNode;
}

export default function BarebonesCard({ title, children }: BasicCardProps) {
  // Max width needs to change. Need to figure that out
  const classValue = `block p-6 bg-white border rounded-lg shadow`;
  const textClasses = 'text-2xl font-bold';

  return (
    <div className={classValue}>
      {/* Render title only if it exists */}
      {title && (
        <div className="mb-2">
          {typeof title === 'string' ? (
            <h2 className={textClasses}>{title}</h2>
          ) : (
            <div className={textClasses}>{title} </div>
          )}
        </div>
      )}
      {/* Render the children */}
      {children}
    </div>
  );
}
