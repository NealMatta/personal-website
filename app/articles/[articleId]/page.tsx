import style from '@/src/styles/article.module.css';
import ReactMarkdown from 'react-markdown';

import { getArticle } from '@/src/apiManagement/articles/articles';
export default async function IndividualArticle({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const articleID = (await params).articleId;
  const post = await getArticle(articleID);

  return (
    <section className="flex flex-col gap-y-4">
      <div className="">
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
    </section>
  );
}
