'use client';

import { CHECK_IN_TEXT } from '@/src/components/pages/Curriculum/CheckInComposer';
import { useCurriculumKey } from '@/src/lib/curriculum/useCurriculumKey';

/*
The short way down to the composer.

The feed is the last thing on /curriculum, which is a long scroll on a
phone for a two-line note. Once this browser holds the key the masthead
gets this link: it brings the composer into view and puts the cursor in
it. A visitor never sees it.
*/

export default function CheckInJump() {
  const { unlocked } = useCurriculumKey();

  if (!unlocked) return null;

  return (
    <a
      href={`#${CHECK_IN_TEXT}`}
      className="sky-link self-start text-[15px] font-semibold no-underline"
      onClick={(event) => {
        const text = document.getElementById(CHECK_IN_TEXT);
        if (!text) return;

        event.preventDefault();
        const calm = window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches;
        text.scrollIntoView({
          behavior: calm ? 'auto' : 'smooth',
          block: 'center',
        });
        text.focus({ preventScroll: true });
      }}
    >
      Check in ↓
    </a>
  );
}
