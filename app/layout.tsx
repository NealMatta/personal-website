import type { Metadata } from 'next';
import '@/src/styles/globals.css';
import NavBar from '@/src/components/navigation/NavBar';
import Footer from '@/src/components/navigation/Footer';
import ReactQueryProvider from '@/src/components/providers/ReactQueryProvider';
import { Rubik, Lora } from 'next/font/google';
// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */

export const metadata: Metadata = {
  title: 'Neal Matta',
  description: 'Everything about Neal Matta',
};

const primaryText = Rubik({
  subsets: ['latin'],
  weight: ['400', '700'], // Specify weights for Rubik
  variable: '--font-primary-font', // CSS variable for easy usage
});

const secondaryText = Lora({
  subsets: ['latin'],
  weight: ['400', '700'], // Specify weights for Lora
  style: ['normal', 'italic'], // Add italic if needed
  variable: '--font-secondary-font', // CSS variable for Lora
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${primaryText.variable} ${secondaryText.variable}`}
    >
      <body>
        <ReactQueryProvider>
          <NavBar />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
            <div className="mt-5">{children}</div>
          </div>
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
