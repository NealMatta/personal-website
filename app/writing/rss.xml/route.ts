import { publishedPosts } from '@/src/content/posts';

/*
The Field notes feed.

The site has no configured domain, so the absolute links a reader needs
come from the request itself. Everything else reads from the same content
file the pages do, which means a new note appears here the moment it's
published.
*/

/** XML has five characters it will not take literally. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET(request: Request) {
  const { origin } = new URL(request.url);
  const posts = publishedPosts();

  const items = posts
    .map((post) => {
      const url = `${origin}/writing/${post.slug}`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <category>${escapeXml(post.topic)}</category>
      <pubDate>${new Date(`${post.publishedAt}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(post.dek)}</description>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Field notes — Neal Matta</title>
    <link>${origin}/writing</link>
    <atom:link href="${origin}/writing/rss.xml" rel="self" type="application/rss+xml" />
    <description>Notes on architecture, APIs and staying organized.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
