'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSky } from '@/src/lib/sky/useSky';

/*
The top bar.

The logo mark is one of the three places color is allowed on the page: it
carries the current sky, so the site's only accent changes through the
day. The nav is numbered because the whole site is a set of labeled boxes
and these are the first four.
*/

interface NavItem {
  number: string;
  label: string;
  href: string;
  /** Sections the redesign hasn't built yet. */
  soon?: boolean;
}

const ITEMS: NavItem[] = [
  { number: '01', label: 'Curriculum', href: '/curriculum' },
  { number: '02', label: 'Projects', href: '/projects' },
  { number: '03', label: 'Laboratory', href: '/lab' },
  { number: '04', label: 'Field notes', href: '/writing' },
];

const LINKEDIN = 'https://www.linkedin.com/in/nealmatta/';

export default function NavBar() {
  const { phase } = useSky();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-rule">
      <div className="flex items-center justify-between px-6 py-5 lg:px-16 lg:py-6">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <span
            className="h-7 w-7 rounded-md"
            style={{ background: phase.gradient }}
            aria-hidden="true"
          />
          <span className="font-display text-lg font-extrabold tracking-[.02em]">
            NEAL MATTA
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden gap-8 lg:flex">
          {ITEMS.map((item) => (
            <NavLink key={item.label} item={item} pathname={pathname} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={LINKEDIN}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-lg bg-ink px-[18px] py-3 text-sm font-semibold text-paper no-underline transition-colors hover:bg-[#0A66C2] hover:text-white focus-visible:bg-[#0A66C2] lg:block"
          >
            Connect on LinkedIn
          </Link>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-rule lg:hidden"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? (
                <>
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Primary"
          className="flex flex-col gap-1 border-t border-rule px-6 py-4 lg:hidden"
        >
          {ITEMS.map((item) => (
            <NavLink
              key={item.label}
              item={item}
              pathname={pathname}
              onNavigate={() => setOpen(false)}
            />
          ))}
          <Link
            href={LINKEDIN}
            target="_blank"
            rel="noreferrer"
            className="mt-3 rounded-lg bg-ink px-[18px] py-3 text-center text-sm font-semibold text-paper no-underline"
          >
            Connect on LinkedIn
          </Link>
        </nav>
      )}
    </header>
  );
}

function NavLink({
  item,
  pathname,
  onNavigate,
}: {
  item: NavItem;
  pathname: string;
  onNavigate?: () => void;
}) {
  const number = (
    <span className="font-mono text-xs uppercase tracking-[.06em] text-graphite">
      {item.number}
    </span>
  );

  if (item.soon) {
    return (
      <span
        aria-disabled="true"
        title="Coming in the next pass of the redesign"
        className="flex items-baseline gap-1.5 py-2.5 text-[15px] font-medium text-graphite"
      >
        {number}
        {item.label}
      </span>
    );
  }

  const current =
    pathname === item.href || pathname.startsWith(`${item.href}/`);

  /*
  The page you are on is already underlined in ink, so it keeps that and
  sits out the hover; every other entry opens its own sliver of sky.
  */
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={current ? 'page' : undefined}
      className={`flex items-baseline gap-1.5 py-2.5 text-[15px] font-medium no-underline ${
        current ? 'underline underline-offset-[6px]' : 'sky-link'
      }`}
    >
      {number}
      {item.label}
    </Link>
  );
}
