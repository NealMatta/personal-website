'use client';

import { useEffect, useState } from 'react';

/*
Share a note: post it to LinkedIn, or copy the address.

Both need the note's own URL, and the site has no configured domain to
build one from, so this reads it off the window once the page is mounted.
Until then the LinkedIn link points at the composer without a URL
attached, which is still a working link rather than a broken one.
*/

const SHARE = 'https://www.linkedin.com/sharing/share-offsite/';

export default function ShareRow() {
  const [href, setHref] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setHref(window.location.href);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be refused; leave the label alone if it is.
    }
  }

  return (
    <div className="flex flex-col gap-2.5">
      <span className="font-mono text-xs uppercase tracking-[.06em] text-graphite">
        Share
      </span>
      <div className="flex gap-2">
        <a
          href={href ? `${SHARE}?url=${encodeURIComponent(href)}` : SHARE}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-ink px-3.5 py-3 text-sm font-semibold no-underline transition-colors hover:bg-[#0A66C2] hover:text-white"
        >
          LinkedIn
        </a>
        <button
          type="button"
          onClick={copy}
          className="h-11 rounded-lg border border-[#BDB5A5] px-3.5 text-sm font-semibold transition-colors hover:border-ink"
        >
          <span aria-live="polite">{copied ? 'Copied' : 'Copy link'}</span>
        </button>
      </div>
    </div>
  );
}
