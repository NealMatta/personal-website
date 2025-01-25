import PageHeader from '@/src/components/reusable/pageHeader/PageHeader';
import Card from '@/src/components/pages/Articles/Card';
import Link from 'next/link';
import { getArticles } from '@/src/apiManagement/articles/articles';

export default async function Articles() {
  const articles = await getArticles();

  return (
    <>
      <PageHeader
        header={'Articles'}
        subHeader={'My (semi) unfiltered thoughts'}
      />
      <div className="grid gap-4 my-4 grid-cols-1">
        {/* TODO - Add type validation to article via Notion Types */}
        {articles.map((article) => (
          <Link key={article.id} href={`/articles/${article.id}`} passHref>
            <Card
              key={article.id} // Always include a key when mapping elements
              title={
                article.properties['Article Title']?.title[0]?.plain_text || ''
              }
              details={
                article.properties['Description'].rich_text[0]?.plain_text
              }
              imageUrl={article.properties['Featured Image']?.files[0]?.name}
              postedDate={article.properties['Date Posted'].date.start}
            />
          </Link>
        ))}
      </div>
    </>
  );
}
