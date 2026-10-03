import type { Metadata } from 'next';
import '@/src/styles/globals.css';
import NavBar from '@/src/components/reusable/navigation/NavBar';
import Footer from '@/src/components/reusable/navigation/Footer';
import ReactQueryProvider from '@/src/lib/providers/ReactQueryProvider';
import CloudFilters from '@/src/components/reusable/sky/CloudFilters';
import SkyRoot from '@/src/components/reusable/sky/SkyRoot';
import ThemeRoot from '@/src/components/reusable/theme/ThemeRoot';
import { THEME_SCRIPT } from '@/src/lib/theme/theme';
import {
  Bricolage_Grotesque,
  Instrument_Sans,
  JetBrains_Mono,
  Caveat,
} from 'next/font/google';

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
      // The script below sets data-theme before React sees the page.
      suppressHydrationWarning
    >
      <head>
        {/* Day or night, decided before the first paint so a dark-mode
            visitor never sees the paper flash white. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="flex min-h-screen flex-col">
        {/* Referenced by id from every sky window on the page. */}
        <CloudFilters />
        {/* Puts the visitor's sky on <html>, where every hover reads it. */}
        <SkyRoot />
        {/* Follows the OS setting until the visitor flips the switch. */}
        <ThemeRoot />
        <ReactQueryProvider>
          <NavBar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
