export default function IndividualArticle({
  params,
}: {
  params: { articleId: string };
}) {
  const articleId = params.articleId;
  return (
    <>
      <h1>{articleId}</h1>
    </>
  );
}
