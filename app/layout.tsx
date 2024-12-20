import type { Metadata } from 'next';
import '@/src/styles/globals.css';
import NavBar from '@/src/components/navigation/NavBar';
import ReactQueryProvider from '@/src/components/providers/ReactQueryProvider';
import { Rubik, Lora } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Neal Matta',
  description: 'Everything about Neal Matta',
};

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '700'], // Specify weights for Rubik
  variable: '--font-rubik', // CSS variable for easy usage
});

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '700'], // Specify weights for Lora
  style: ['normal', 'italic'], // Add italic if needed
  variable: '--font-lora', // CSS variable for Lora
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${rubik.variable} ${lora.variable}`}>
      <body className={rubik.className}>
        <ReactQueryProvider>
          <NavBar />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
            <div className="mt-5">{children}</div>
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
