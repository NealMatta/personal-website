import Link from 'next/link';
import React from 'react';

export default function NavBar() {
  return (
    <nav className="bg-red-500 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="text-white">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className="text-white">
            About
          </Link>
        </li>
        <li>
          <Link href="/contact" className="text-white">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
