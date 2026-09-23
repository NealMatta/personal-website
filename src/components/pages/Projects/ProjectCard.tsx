import BoxCard from '@/src/components/reusable/UI/BoxCard';
import Chip from '@/src/components/reusable/UI/Chip';
import PhotoSlot from '@/src/components/reusable/UI/PhotoSlot';
import {
  KIND_STYLE,
  formatFinished,
  type Project,
} from '@/src/content/projects';

/*
One project on the index: a labeled box with its cover, what kind of thing
it is, and where it came from.
*/

export default function ProjectCard({ project }: { project: Project }) {
  const kind = KIND_STYLE[project.kind];

  return (
    <BoxCard
      label={project.name}
      tilt={project.tilt}
      labelSize={26}
      href={`/projects/${project.slug}`}
    >
      <PhotoSlot
        label={project.coverLabel}
        src={project.coverSrc}
        tone="paper"
        className="h-[200px] rounded-lg"
        sizes="(max-width: 640px) 100vw, 33vw"
      />

      <div className="flex items-center justify-between gap-2">
        <span
          className="rounded px-2 py-1 font-mono text-[11px]"
          style={{ background: kind.background, color: kind.color }}
        >
          {kind.label}
        </span>
        <span className="truncate font-mono text-[11px] uppercase tracking-[.06em] text-graphite">
          {project.origin}
        </span>
      </div>

      <span className="text-[17px] leading-snug text-[#2A2824]">
        {project.summary}
      </span>

      <div className="flex flex-wrap gap-1.5">
        {project.stack.slice(0, 3).map((tool) => (
          <Chip key={tool}>{tool}</Chip>
        ))}
      </div>

      <div className="mt-auto flex justify-between border-t border-dashed border-rule pt-3.5">
        <span className="font-mono text-xs uppercase tracking-[.06em] text-graphite">
          {formatFinished(project)}
        </span>
        <span className="text-[15px] font-semibold">Write-up →</span>
      </div>
    </BoxCard>
  );
}
