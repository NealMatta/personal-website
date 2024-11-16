import type { Metadata } from 'next';

import '@/src/styles/globals.css';
import NavBar from '@/src/components/navigation/NavBar';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
// import { faLink } from '@fortawesome/free-solid-svg-icons';

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
