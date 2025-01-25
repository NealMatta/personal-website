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
    <>
      <section>
        <h2>{post.metadata.title}</h2>
        <span>{post.metadata.date}</span>
        <p>{post.metadata.tags.join(', ')}</p>
        <div className={style.notion}>
          <ReactMarkdown>{post.markdown.parent}</ReactMarkdown>
        </div>
      </section>
    </>
  );
}
