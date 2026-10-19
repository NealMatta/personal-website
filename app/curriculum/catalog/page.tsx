import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/src/components/reusable/UI/Breadcrumb';
import PageIntro from '@/src/components/reusable/UI/PageIntro';
import CatalogEntry from '@/src/components/pages/Curriculum/CatalogEntry';
import { CATALOG } from '@/src/content/curriculum';

export const metadata: Metadata = {
  title: 'Course catalog — Neal Matta',
  description:
    'Classes with a syllabus written and waiting. Each quarter is planned by picking from here.',
};

/*
The course catalog.

Every class that's been written but not scheduled, in code order. A
quarter gets planned by picking from this list; once a class is in a
quarter it leaves the catalog and shows up there instead.
*/

export default function Catalog() {
  const courses = [...CATALOG].sort((a, b) => a.code.localeCompare(b.code));
  const credits = CATALOG.reduce((n, c) => n + c.credits, 0);

  return (
    <>
      <div className="mx-6 pt-10 lg:mx-16">
        <Breadcrumb
          trail={[
            { label: 'Home', href: '/' },
            { label: 'Curriculum', href: '/curriculum' },
            { label: 'Course catalog' },
          ]}
        />
      </div>

      <PageIntro
        title="Course catalog"
        description="Classes with a syllabus written and waiting. Each quarter is planned by picking from here, and a class leaves the catalog once it’s on a quarter."
        stats={[
          { value: CATALOG.length, label: 'Classes' },
          { value: credits, label: 'Credits offered' },
        ]}
      />

      {courses.length === 0 ? (
        <p className="m-0 px-6 py-12 text-base text-pencil lg:px-16">
          Nothing in the catalog right now. Every class written is on a quarter.
        </p>
      ) : (
        <section className="flex flex-col gap-4 px-6 pt-12 lg:px-16">
          {courses.map((course) => (
            <CatalogEntry key={course.slug} course={course} />
          ))}
        </section>
      )}

      <p className="m-0 px-6 pb-20 pt-10 text-base text-pencil lg:px-16">
        Already taking or taken:{' '}
        <Link href="/curriculum/transcript" className="sky-link no-underline">
          the transcript
        </Link>
        .
      </p>
    </>
  );
}
