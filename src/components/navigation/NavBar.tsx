import Link from 'next/link';
import React from 'react';

export default function NavBar() {
  return (
    <nav className="bg-slate-900">
      <div className="max-w-7xl mx-auto p-2 sm:px-6 lg:px-16">
        <div className="flex justify-between">
          <div>
            <Link
              href="/"
              className="text-white uppercase tracking-widest font-bold "
            >
              Neal Matta
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link href="/projects" className="text-white">
              Projects
            </Link>
            {/* <Link href="#" className="text-white">
              Playground
            </Link> */}
            {/* <Link href="#" className="text-white">
              Cookbook
            </Link> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
