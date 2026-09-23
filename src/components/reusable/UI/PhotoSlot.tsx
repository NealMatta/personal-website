/*
A labeled empty frame where a photo will go.

The redesign is ahead of the photography, so rather than shipping a grey
box the slot says what belongs in it. Give it a real `src` and it becomes
the picture.
*/

import Image from 'next/image';

interface PhotoSlotProps {
  /** What the photo shows. Doubles as alt text once there's a src. */
  label: string;
  src?: string | null;
  className?: string;
  style?: React.CSSProperties;
  /** Sizes hint for next/image. */
  sizes?: string;
  /** Solid card ground instead of paper, for slots sitting on paper. */
  tone?: 'paper' | 'card';
}

export default function PhotoSlot({
  label,
  src,
  className = '',
  style,
  sizes = '(max-width: 1024px) 100vw, 50vw',
  tone = 'card',
}: PhotoSlotProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`} style={style}>
        <Image
          src={src}
          alt={label}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={label}
      className={`flex flex-col items-center justify-center gap-2.5 border border-dashed border-[#BDB5A5] ${
        tone === 'card' ? 'bg-card' : 'bg-paper'
      } ${className}`}
      style={style}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--graphite)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="2" />
        <path d="M21 16l-5-5-9 9" />
      </svg>
      <span className="px-4 text-center font-mono text-xs uppercase tracking-[.06em] text-graphite">
        {label}
      </span>
    </div>
  );
}
