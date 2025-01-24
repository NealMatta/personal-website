import { Client } from '@notionhq/client';

export async function GET() {
  const notion = new Client({ auth: process.env.NOTION_SECRET });

  const data = await notion.blocks.children.list({
    block_id: process.env.NOTION_COOKBOOK_PAGE_ID!,
  });

  console.log(data);

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
