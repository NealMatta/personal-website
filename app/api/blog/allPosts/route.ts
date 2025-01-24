import { Client } from '@notionhq/client';

export async function GET() {
  const notion = new Client({ auth: process.env.NOTION_SECRET });

  const response = await notion.databases.query({
    database_id: process.env.NOTION_BLOG_PAGE_ID!,
  });

  const data = response.results;

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
