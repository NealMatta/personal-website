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
      <body className="container mx-auto">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
