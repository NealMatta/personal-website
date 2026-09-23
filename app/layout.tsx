import type { Metadata } from 'next';
import '@/src/styles/globals.css';
import NavBar from '@/src/components/reusable/navigation/NavBar';
import Footer from '@/src/components/reusable/navigation/Footer';
import ReactQueryProvider from '@/src/lib/providers/ReactQueryProvider';
import CloudFilters from '@/src/components/reusable/sky/CloudFilters';
import {
  Bricolage_Grotesque,
  Instrument_Sans,
  JetBrains_Mono,
  Caveat,
} from 'next/font/google';
// Still needed by the pages that haven't been redesigned yet (Lab, Projects).
// Prevents the icon server-side rendering flash:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */

export const metadata: Metadata = {
  title: 'Neal Matta',
  description:
    'My second brain: part lab, part notebook, and the place I practice building. Everything here is labeled, shelved, and findable.',
};

/* Headlines. */
const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
});

/* Everything you read top to bottom. */
const body = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-body',
});

/* Metadata: dates, codes, counts, data paths. */
const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

/* Tape labels only. Never body copy. */
const label = Caveat({
  subsets: ['latin'],
  variable: '--font-label',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} ${label.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        {/* Referenced by id from every sky window on the page. */}
        <CloudFilters />
        <ReactQueryProvider>
          <NavBar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
