import type { Metadata } from 'next';
import '@/src/styles/globals.css';
import NavBar from '@/src/components/reusable/navigation/NavBar';
import Footer from '@/src/components/reusable/navigation/Footer';
import ReactQueryProvider from '@/src/lib/providers/ReactQueryProvider';
import { Rubik, Lora } from 'next/font/google';
// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */
// import { headers } from 'next/headers';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Referer does not work as it is spotty. I need to add in my own middleware that creates the field x-pathname so that I can access it server side

  // const headersList = await headers();
  // // console.log(headersList.values());
  // console.log('Full headers:', Array.from(headersList.entries()));
  // const referer = headersList.get('referer') || '';
  // const pathname = referer ? new URL(referer).pathname : '';
  // const isLabDashboard = pathname.match('/lab/dashboard');
  // console.log(pathname);

  const isLabDashboard = false;

  return (
    <html
      lang="en"
      className={`${primaryText.variable} ${secondaryText.variable}`}
    >
      <body>
        <ReactQueryProvider>
          {!isLabDashboard && <NavBar />}
          <div
            className={
              isLabDashboard ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-16'
            }
          >
            <div className={isLabDashboard ? '' : 'mt-5'}>{children}</div>
          </div>
          {!isLabDashboard && <Footer />}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
