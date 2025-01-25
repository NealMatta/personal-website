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
          <Link key={article.slug} href={`/articles/${article.slug}`} passHref>
            <Card
              key={article.slug} // Always include a key when mapping elements
              title={article.title}
              details={article.description}
              // imageUrl={article.properties['Featured Image']?.files[0]?.name}
              postedDate={article.date}
            />
          </Link>
        ))}
      </div>
    </>
  );
}
