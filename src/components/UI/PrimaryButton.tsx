import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  linkTo: string;
  children: ReactNode;
  className?: string; // Optional with a default value
}

export default function Button({
  linkTo,
  className = '',
  children,
}: ButtonProps) {
  return (
    <Link
      href={linkTo}
      target="_blank"
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ${className}`}
    >
      {children}
    </Link>
  );
}
