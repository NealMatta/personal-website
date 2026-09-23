import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Laboratory — Neal Matta',
  description:
    'Where I try APIs, patterns and ideas before they earn a spot on the shelf. Each experiment says what I’m testing, what it runs on, and whether it works yet.',
  keywords:
    'Neal Matta, experiments, prototypes, APIs, web development, Next.js, Supabase',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
