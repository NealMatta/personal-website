import Link from 'next/link';

/*
Home / Projects / this thing.

The last crumb is the current page, so it's plain text rather than a link.
*/

export interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumb({ trail }: { trail: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2.5 font-mono text-xs uppercase tracking-[.06em] text-graphite"
    >
      {trail.map((crumb, i) => (
        <span key={crumb.label} className="flex items-center gap-2.5">
          {crumb.href ? (
            <Link
              href={crumb.href}
              className="text-graphite no-underline hover:text-ink"
            >
              {crumb.label}
            </Link>
          ) : (
            <span aria-current="page" className="text-ink">
              {crumb.label}
            </span>
          )}
          {i < trail.length - 1 && <span aria-hidden="true">/</span>}
        </span>
      ))}
    </nav>
  );
}
