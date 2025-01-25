import PageHeader from '@/src/components/reusable/pageHeader/PageHeader';
import Card from '@/src/components/pages/Articles/Card';
import Link from 'next/link';

export default async function Cookbook() {
  const res = await fetch('http://localhost:3000/api/blog/allPosts');
  const articles = await res.json();
  console.log(articles);

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
