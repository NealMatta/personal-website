import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { NotionPage, MultiSelect } from '@/src/types/notion';

const notion = new Client({ auth: process.env.NOTION_SECRET });

function getToday(datestring) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let date = new Date();

  if (datestring) {
    date = new Date(datestring);
  }

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const today = `${month} ${day}, ${year}`;

  return today;
}

function getPageMetaData(post) {
  // console.log('title', post.properties['Article Title'].title[0]);
  // console.log('tags', post.properties.Tags);
  // console.log('desc', post.properties.Description);
  // console.log('date posted', post.properties['Date Posted']);
  // console.log('slug', post.properties.Slug);

  const getTags = (tags) => {
    const allTags = tags.map((tag) => {
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

  const allPosts = response.results;

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
  const page = response.results[0];
  const metadata = getPageMetaData(page);
  const mdblocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdblocks);

  return {
    metadata,
    markdown: mdString,
  };
}
