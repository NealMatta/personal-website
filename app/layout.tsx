import type { Metadata } from 'next';
import '@/src/styles/globals.css';
import ReactQueryProvider from '@/src/lib/providers/ReactQueryProvider';
// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
import { primaryText, secondaryText } from '@/src/components/reusable/UI/Fonts';
config.autoAddCss = false; /* eslint-disable import/first */
import LayoutShell from '@/src/components/reusable/navigation/LayoutShell';

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
    <html
      lang="en"
      className={`${primaryText.variable} ${secondaryText.variable}`}
    >
      <body>
        <ReactQueryProvider>
          <LayoutShell>{children}</LayoutShell>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
