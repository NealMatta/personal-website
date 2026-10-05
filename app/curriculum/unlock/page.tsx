import type { Metadata } from 'next';
import Breadcrumb from '@/src/components/reusable/UI/Breadcrumb';
import UnlockForm from '@/src/components/pages/Curriculum/UnlockForm';

export const metadata: Metadata = {
  title: 'Unlock — Neal Matta',
  robots: { index: false, follow: false },
};

/*
The back door.

Nothing links here: it's the page I type the address of when I'm on a new
browser and want to tick a step off. Everyone else reads the curriculum
exactly as before.
*/
export default function Unlock() {
  return (
    <>
      <div className="mx-6 pt-10 lg:mx-16">
        <Breadcrumb
          trail={[
            { label: 'Home', href: '/' },
            { label: 'Curriculum', href: '/curriculum' },
            { label: 'Unlock' },
          ]}
        />
      </div>

      <section className="mx-6 flex max-w-[520px] flex-col gap-6 pb-[72px] pt-14 lg:mx-16">
        <h1 className="m-0 font-display text-5xl font-extrabold leading-none tracking-[-.02em]">
          Unlock
        </h1>
        <p className="m-0 text-lg leading-relaxed text-pencil">
          The curriculum is mine to mark. If you&rsquo;re not me, there&rsquo;s
          nothing behind this door but checkboxes.
        </p>
        <UnlockForm />
      </section>
    </>
  );
}
