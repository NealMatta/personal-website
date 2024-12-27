import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Neal Matta - Projects and Experiments',
  description:
    'Explore a collection of Neal Matta’s personal and professional projects, showcasing creativity, technical skills, and innovative experiments.',
  keywords:
    'Neal Matta, projects, portfolio, experiments, web development, personal projects',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
