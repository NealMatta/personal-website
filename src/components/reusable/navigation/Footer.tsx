import Link from 'next/link';

/*
The dark strip at the bottom of every page. Name, city, and the four
places I actually post.
*/

const SOCIAL = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nealmatta/' },
  { label: 'GitHub', href: 'https://github.com/NealMatta' },
  { label: 'TikTok', href: '#' },
  { label: 'Instagram', href: '#' },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-ink px-6 py-8 text-paper lg:px-16">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-mono text-xs uppercase tracking-[.06em] text-[#9A948A]">
          Neal Matta · Chicago
        </span>
        <nav aria-label="Social" className="flex flex-wrap gap-6">
          {SOCIAL.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
              className="font-mono text-xs uppercase tracking-[.06em] text-[#CFC8B9] no-underline hover:text-tape"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
