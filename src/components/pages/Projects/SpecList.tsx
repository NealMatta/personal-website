/*
The spec rail beside a write-up's title: status, dates, role, stack — or
dimensions, build time and cost for something I made by hand.
*/

interface SpecListProps {
  items: Array<{ label: string; value: React.ReactNode }>;
  /** Builds show their specs two-up; case studies run them down a column. */
  columns?: 1 | 2;
}

export default function SpecList({ items, columns = 1 }: SpecListProps) {
  return (
    <dl
      className={`m-0 self-end border-l-2 border-ink pl-5 ${
        columns === 2
          ? 'grid grid-cols-2 gap-x-4 gap-y-[18px]'
          : 'flex flex-col gap-4'
      }`}
    >
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-1">
          <dt className="font-mono text-[11px] uppercase tracking-[.06em] text-graphite">
            {item.label}
          </dt>
          <dd className="m-0 font-semibold">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
