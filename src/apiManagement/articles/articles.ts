import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { NotionPage } from '@/src/types/notion';

const notion = new Client({ auth: process.env.NOTION_SECRET });

function getPageMetaData(post: NotionPage) {
  const getTags = (tags: { name: string }[]) => {
    const allTags = tags.map((tag: { name: string }) => {
      return tag.name;
    });

    return allTags;
  };

  return {
    id: post.id,
    title: post.properties['Article Title'].title[0].plain_text,
    tags: getTags(post.properties.Tags.multi_select),
    description: post.properties.Description.rich_text[0].plain_text,
    date: post.properties['Date Posted'].date.start,
    slug: post.properties.Slug.rich_text[0].plain_text,
  };
}

// TODO - Implement Try Catch and error handling
export async function getArticles() {
  const notion = new Client({ auth: process.env.NOTION_SECRET });

  const response = await notion.databases.query({
    database_id: process.env.NOTION_BLOG_PAGE_ID!,
    filter: {
      property: 'Published',
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: 'Date Posted',
        direction: 'descending',
      },
    ],
  });

  const allPosts = response.results as NotionPage[];

  return allPosts.map((post) => {
    return getPageMetaData(post);
  });
}

export async function getArticle(articleId: string) {
  const n2m = new NotionToMarkdown({ notionClient: notion });

  //   const response = await notion.pages.retrieve({ page_id: articleId });
  const response = await notion.databases.query({
    database_id: process.env.NOTION_BLOG_PAGE_ID!,
    filter: {
      property: 'Slug',
      formula: {
        string: {
          equals: articleId,
        },
      },
    },
  });
  const page = response.results[0] as NotionPage;
  const metadata = getPageMetaData(page);
  const mdblocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdblocks);

  return {
    metadata,
    markdown: mdString,
  };
}
