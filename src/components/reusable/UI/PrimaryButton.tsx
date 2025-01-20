import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  linkTo: string;
  children: ReactNode;
  className?: string; // Optional with a default value
  target?: string;
}

export default function Button({
  linkTo,
  className = '',
  target = '_blank',

  children,
}: ButtonProps) {
  return (
    <Link
      href={linkTo}
      target={target}
      className={`bg-primary hover:bg-primary-dark focus:bg-primary-light text-white font-bold py-2 px-4 rounded-full ${className}`}
    >
      {children}
    </Link>
  );
}
