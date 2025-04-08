// app/LayoutShell.tsx
'use client';

import { usePathname } from 'next/navigation';
import NavBar from '@/src/components/reusable/navigation/NavBar';
import Footer from '@/src/components/reusable/navigation/Footer';

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLabDashboard = pathname.startsWith('/lab/dashboard');

  return (
    <>
      {!isLabDashboard && <NavBar />}
      <div
        className={
          isLabDashboard ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-16'
        }
      >
        <div className={isLabDashboard ? '' : 'mt-5'}>{children}</div>
      </div>
      {!isLabDashboard && <Footer />}
    </>
  );
}
