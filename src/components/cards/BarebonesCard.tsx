// Reusable wrapper with the background and padding set

import React from 'react';

interface BasicCardProps {
  title?: string | React.ReactNode;
  children: React.ReactNode;
  wip?: boolean;
}

export default function BarebonesCard({
  title,
  children,
  wip = false,
}: BasicCardProps) {
  // Max width needs to change. Need to figure that out
  const classValue = `relative block p-6 bg-white border rounded-lg shadow`;
  const workInProgressClasses = 'opacity-50 pointer-events-none';
  const textClasses = `text-2xl font-bold ${wip ? 'text-gray-500' : 'text-black'}`;

  return (
    <div className={classValue}>
      {/* Overlay for WIP */}
      {wip && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
          <p className="uppercase tracking-widest font-bold text-gray-900 text-md text-center">
            Work in Progress
          </p>
        </div>
      )}

      <div className={wip ? workInProgressClasses : ''}>
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
    </div>
  );
}
