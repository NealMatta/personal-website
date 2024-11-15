import type { Metadata } from 'next';

import '@/src/styles/globals.css';
import NavBar from '@/src/components/navigation/NavBar';

export const metadata: Metadata = {
  title: 'Neal Matta',
  description: 'Everything about Neal Matta',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
          {children}
        </div>
      </body>
    </html>
  );
}
