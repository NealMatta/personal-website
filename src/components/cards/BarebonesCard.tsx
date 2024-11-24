// Reusable wrapper with the background and padding set

import React from 'react';

interface BasicCardProps {
  title?: string;
  children: React.ReactNode;
}

export default function BarebonesCard({ title, children }: BasicCardProps) {
  // Max width needs to change. Need to figure that out
  const classValue = `block p-6 bg-white border rounded-lg shadow`;

  return (
    <div className={classValue}>
      {title && <h2 className="font-bold mb-2">{title}</h2>}
      {children}
    </div>
  );
}
