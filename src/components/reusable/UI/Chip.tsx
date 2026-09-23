/*
A small outlined tag: the tools something was built with, or the topic a
note belongs to. Two grounds, because these sit on paper in most places
and on the dark build note in one.
*/

interface ChipProps {
  children: React.ReactNode;
  /** `dark` for chips inside the ⓘ build note. */
  tone?: 'paper' | 'dark';
  className?: string;
}

export default function Chip({
  children,
  tone = 'paper',
  className = '',
}: ChipProps) {
  const tones = {
    paper: 'border-[#CFC8B9] bg-paper text-pencil',
    dark: 'border-[#3A3833] text-[#E8DDC4]',
  };

  return (
    <span
      className={`rounded border px-2 py-[3px] font-mono text-[11px] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
