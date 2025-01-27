import React, { Suspense } from 'react';
import style from '@/src/styles/article.module.css';
import ReactMarkdown from 'react-markdown';
import { getArticle } from '@/src/apiManagement/articles/articles';

// Component to fetch article data
const ArticleContent = async ({ articleID }: { articleID: string }) => {
  const post = await getArticle(articleID);
  return (
    <>
      <div>
        <h1 className="text-4xl font-bold">{post.metadata.title}</h1>
        <div className="flex space-x-2">
          <p>{post.metadata.date}</p>
          <p>-</p>
          <p className="italic">{post.metadata.tags.join(', ')}</p>
        </div>
      </div>
      <hr />
      <div className={style.notion}>
        <ReactMarkdown>{post.markdown.parent}</ReactMarkdown>
      </div>
    </>
  );
};

// Main component
export default async function IndividualArticle({
  params,
}: {
  params: { articleId: string };
}) {
  const articleId = (await params).articleId;
  return (
    <section className="flex flex-col gap-y-4">
      <Suspense
        fallback={<div className="text-center">Loading article...</div>}
      >
        <ArticleContent articleID={articleId} />
      </Suspense>
    </section>
  );
}
