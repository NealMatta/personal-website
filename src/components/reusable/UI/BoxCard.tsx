import Link from 'next/link';
import Tape from './Tape';

/*
A labeled box.

One kind of thing per box, with a strip of tape on the corner saying
what's inside. If it has an href the whole box is the link.
*/

interface BoxCardProps {
  label: string;
  tilt?: number;
  /** Tape size; smaller boxes want a smaller label. */
  labelSize?: number;
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export default function BoxCard({
  label,
  tilt = -2,
  labelSize = 28,
  href,
  className = '',
  children,
}: BoxCardProps) {
  const shell = [
    'relative flex flex-col gap-4 rounded-box border border-rule bg-card',
    // Top padding leaves room for the tape hanging over the edge.
    'px-6 pb-5 pt-9',
    href &&
      'no-underline transition-shadow hover:shadow-[0_10px_28px_rgba(28,27,25,.10)]',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const body = (
    <>
      <Tape
        tilt={tilt}
        size={labelSize}
        className="absolute -top-[18px] left-5"
      >
        {label}
      </Tape>
      {children}
    </>
  );

  if (href) {
    const external = href.startsWith('http');
    return (
      <Link
        href={href}
        className={shell}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {body}
      </Link>
    );
  }

  return <div className={shell}>{body}</div>;
}
