import Link from 'next/link';
import { CONTACT, SOCIALS } from '@/src/content/about';

/*
The dark block at the bottom of the About page: my email, and the four
places I actually post.
*/

export default function Contact() {
  return (
    <section
      id="contact"
      className="mx-6 mb-24 grid grid-cols-1 gap-10 rounded-xl bg-ink p-8 text-paper sm:p-14 lg:mx-16 lg:grid-cols-12 lg:gap-x-6"
    >
      <div className="flex flex-col gap-5 lg:col-span-6">
        <span className="font-mono text-xs uppercase tracking-[.06em] text-[#BDB5A5]">
          Say hi
        </span>

        <h2 className="m-0 font-display text-4xl font-extrabold leading-tight tracking-[-.015em] lg:text-[56px]">
          The best way to reach me
        </h2>

        <p className="m-0 max-w-[460px] text-lg leading-relaxed text-[#CFC8B9]">
          Want to play volleyball, trade recipes, or talk about something on
          this site? Send me a note.
        </p>

        <Link
          href={`mailto:${CONTACT.email}`}
          className="mt-2 self-start break-all rounded-lg bg-tape px-5 py-3.5 text-base font-semibold text-ink no-underline"
        >
          {CONTACT.email}
        </Link>
      </div>

      <nav
        aria-label="Social"
        className="flex flex-col border-t border-[#3A3833] lg:col-span-5 lg:col-start-8"
      >
        {SOCIALS.map((social) => (
          <Link
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between border-b border-[#3A3833] py-4 text-lg font-medium text-paper no-underline hover:text-tape"
          >
            {social.label}
            <span className="font-mono text-xs uppercase tracking-[.06em] text-[#9A948A]">
              {social.handle ? `${social.handle} ↗` : '↗'}
            </span>
          </Link>
        ))}
      </nav>
    </section>
  );
}
