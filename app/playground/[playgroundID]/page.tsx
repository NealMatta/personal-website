export default async function SinglePlayground({
  params,
}: {
  params: Promise<{ playgroundID: string }>;
}) {
  const projectID = (await params).playgroundID;

  return <div>{projectID}</div>;
}
