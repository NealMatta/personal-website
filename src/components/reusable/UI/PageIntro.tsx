/*
The masthead every section page opens with: a big title, a line about
what's in here, and an optional set of counts on the right, over a heavy
rule.
*/

interface Stat {
  value: string | number;
  label: string;
}

interface PageIntroProps {
  title: string;
  description: React.ReactNode;
  stats?: Stat[];
}

export default function PageIntro({
  title,
  description,
  stats,
}: PageIntroProps) {
  return (
    <section className="mx-6 grid grid-cols-1 items-end gap-8 border-b-2 border-ink pb-12 pt-14 lg:mx-16 lg:grid-cols-12 lg:gap-x-6">
      <div className="flex flex-col gap-5 lg:col-span-8">
        <h1 className="m-0 font-display text-5xl font-extrabold leading-none tracking-[-.02em] sm:text-7xl lg:text-[88px]">
          {title}
        </h1>
        <p className="m-0 max-w-[640px] text-lg leading-relaxed text-pencil lg:text-xl">
          {description}
        </p>
      </div>

      {stats && stats.length > 0 && (
        <dl
          className="m-0 grid gap-4 lg:col-span-4"
          style={{
            gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))`,
          }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <dd className="m-0 font-display text-5xl font-semibold leading-none">
                {stat.value}
              </dd>
              <dt className="font-mono text-[11px] uppercase tracking-[.06em] text-graphite">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
