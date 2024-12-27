import React from 'react';

export default function Loading() {
  return (
    <>
      <div className="animate-pulse">
        {/* Placeholder for PageHeader */}
        <div className="mb-4">
          <div className="h-8 w-1/3 bg-gray-300 rounded-md"></div>
          <div className="h-4 w-1/2 bg-gray-300 rounded-md mt-2"></div>
        </div>

        {/* Placeholder for Projects Grid */}
        <div className="grid gap-4 my-4 grid-cols-1 sm:grid-cols-2">
          <div key={1} className="h-40 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </>
  );
}
