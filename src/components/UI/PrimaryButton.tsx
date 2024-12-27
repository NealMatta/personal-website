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
      className={`bg-primary hover:bg-primary-dark focus:bg-primary-light text-white font-bold py-2 px-4 rounded-full ${className}`}
    >
      {children}
    </Link>
  );
}
