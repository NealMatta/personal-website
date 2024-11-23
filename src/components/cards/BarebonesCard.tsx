// Reusable wrapper with the background and padding set

import React from 'react';

interface BasicCardProps {
  children: React.ReactNode;
}

export default function BarebonesCard({ children }: BasicCardProps) {
  // Max width needs to change. Need to figure that out
  const classValue = `block p-6 bg-white border rounded-lg shadow`;

  return <div className={classValue}>{children}</div>;
}
