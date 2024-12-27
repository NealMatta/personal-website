export default function ProjectTags({
  tags,
}: {
  tags: string[] | null;
}): JSX.Element {
  return (
    <>
      {tags?.map((tag, index) => (
        <p
          key={index}
          className="border border-foreground px-2 py-1 rounded-md uppercase text-xs tracking-wider italic mb-3"
        >
          {tag}
        </p>
      ))}
    </>
  );
}
