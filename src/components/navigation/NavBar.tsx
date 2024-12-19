import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 px-4 py-8 transition-all duration-300 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-16">
        <div className="container flex flex-wrap justify-between items-center">
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
          <div className="flex flex-wrap gap-x-8 gap-y-4 mt-4 sm:mt-0">
            <NavLink href="/projects" label="Projects" />
            <NavLink href="#" label="Playground" disabled={true} />
            <NavLink href="#" label="Cookbook" disabled={true} />
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
}: {
  href: string;
  label: string;
  disabled?: boolean;
}) => (
  <Link
    href={href}
    className={`${
      disabled
        ? 'text-red-500 line-through pointer-events-none'
        : 'text-gray-500 hover:text-gray-700 transition-colors duration-300'
    }`}
  >
    {label}
  </Link>
);
