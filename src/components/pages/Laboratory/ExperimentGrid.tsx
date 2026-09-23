'use client';

import { useState } from 'react';
import BoxCard from '@/src/components/reusable/UI/BoxCard';
import Chip from '@/src/components/reusable/UI/Chip';
import StatusDot, {
  statusLabel,
  type Status,
} from '@/src/components/reusable/UI/StatusDot';
import FilterPills from '@/src/components/reusable/UI/FilterPills';
import {
  experimentsByRecency,
  formatTouched,
  type Experiment,
} from '@/src/content/experiments';

/*
Every experiment, filterable by how far along it is.

An experiment with nowhere to go yet still gets a card — the question is
the point, not the demo.
*/

const FILTERS = ['All', 'Live', 'Prototype', 'Idea', 'Shelved'];

export default function ExperimentGrid() {
  const [filter, setFilter] = useState('All');
  const all = experimentsByRecency();

  const shown =
    filter === 'All'
      ? all
      : all.filter((e) => statusLabel(e.status) === filter);

  return (
    <>
      <div className="flex flex-col gap-4 px-6 pb-2 pt-10 sm:flex-row sm:items-center sm:justify-between lg:px-16">
        <FilterPills
          label="Filter experiments"
          options={FILTERS}
          value={filter}
          onChange={setFilter}
        />
        <span className="font-mono text-xs uppercase tracking-[.06em] text-graphite">
          Sorted by last touched
        </span>
      </div>

      <section className="grid grid-cols-1 gap-x-6 gap-y-12 px-6 pb-14 pt-10 sm:grid-cols-2 lg:grid-cols-3 lg:px-16">
        {shown.length === 0 ? (
          <p className="text-[15px] text-pencil">
            Nothing in that state right now.
          </p>
        ) : (
          shown.map((experiment) => (
            <ExperimentCard key={experiment.code} experiment={experiment} />
          ))
        )}
      </section>
    </>
  );
}

function ExperimentCard({ experiment }: { experiment: Experiment }) {
  return (
    <BoxCard
      label={experiment.name}
      tilt={experiment.tilt}
      labelSize={27}
      href={experiment.href}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-[.06em] text-graphite">
          {experiment.code}
        </span>
        <StatusDot status={experiment.status as Status} />
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="font-mono text-[11px] uppercase tracking-[.06em] text-graphite">
          Testing
        </span>
        <span className="text-[17px] leading-snug text-[#2A2824]">
          {experiment.question}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {experiment.stack.map((tool) => (
          <Chip key={tool}>{tool}</Chip>
        ))}
      </div>

      <div className="mt-auto flex justify-between border-t border-dashed border-rule pt-3.5">
        <span className="font-mono text-xs uppercase tracking-[.06em] text-graphite">
          {formatTouched(experiment)}
        </span>
        {experiment.href && (
          <span aria-hidden="true" className="text-lg">
            →
          </span>
        )}
      </div>
    </BoxCard>
  );
}
