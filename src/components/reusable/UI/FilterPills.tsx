'use client';

/*
A row of pills for narrowing a list — experiment status, note topic.

Real buttons with `aria-pressed`, so the filter state is announced rather
than just colored in.
*/

interface FilterPillsProps {
  label: string;
  options: string[];
  value: string;
  onChange: (next: string) => void;
  /** Stack them vertically, as the Field notes archive does. */
  vertical?: boolean;
}

export default function FilterPills({
  label,
  options,
  value,
  onChange,
  vertical = false,
}: FilterPillsProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className={`flex gap-2 ${vertical ? 'flex-col items-start' : 'flex-wrap'}`}
    >
      {options.map((option) => {
        const active = option === value;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option)}
            className={`h-11 rounded-full border px-4 text-sm font-medium transition-colors ${
              active
                ? 'border-ink bg-ink text-paper'
                : 'border-[#BDB5A5] bg-transparent text-ink hover:border-ink'
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
