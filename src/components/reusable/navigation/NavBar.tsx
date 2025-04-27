import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 px-4 py-8 transition-all duration-300 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-16">
        <div className="container flex flex-wrap justify-between items-center">
          {/* Logo Section */}
          <div>
            <Link href="/" className="uppercase tracking-widest font-bold">
              Neal Matta
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 mt-4 sm:mt-0">
            <NavLink href="/projects" label="Projects" />
            <NavLink href="/lab" label="Laboratory" />
            <NavLink
              href="https://nealmatta.notion.site/678c6cac55d144a6a3e4f5d6aadd880d?v=e35eeb4db6eb447aba852c45b3771cfb"
              label="Cookbook"
              external={true}
            />
            <NavLink href="#" label="Articles" disabled={true} />
          </div>
        </div>
      </div>
    </nav>
  );
}

/* Reusable NavLink Component */
const NavLink = ({
  href,
  label,
  disabled = false,
  external = false,
}: {
  href: string;
  label: string;
  disabled?: boolean;
  external?: boolean;
}) => (
  <Link
    href={href}
    className={`${
      disabled
        ? 'line-through pointer-events-none'
        : 'hover:text-primary transition-colors duration-300'
    }`}
    target={external ? '_blank' : undefined}
  >
    {label}
  </Link>
);
