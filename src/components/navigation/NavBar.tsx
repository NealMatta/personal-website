'use client'; // For client-side interactivity

import Link from 'next/link';
import React, { useState, useEffect } from 'react';

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled more than 50px
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 px-4 py-4 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-16">
        <div className="container flex justify-between items-center ">
          {/* Logo Section */}
          <div>
            <Link
              href="/"
              className="text-slate-900 uppercase tracking-widest font-bold"
            >
              Neal Matta
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-8">
            <NavLink href="#" label="Projects" />
            <NavLink href="#" label="Playground" />
            <NavLink href="#" label="Cookbook" />
            <NavLink href="#" label="Articles" />
          </div>
        </div>
      </div>
    </nav>
  );
}

/* Reusable NavLink Component */
const NavLink = ({ href, label }: { href: string; label: string }) => (
  <Link
    href={href}
    className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
  >
    {label}
  </Link>
);
