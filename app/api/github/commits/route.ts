import { fetchCommits } from '@/src/apiManagement/githubAPI';

export async function GET() {
  try {
    const res = await fetchCommits();

    if (!res) {
      return new Response(JSON.stringify({ error: 'No commits found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(res), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    // Narrow the type of the error
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';

    return new Response(
      JSON.stringify({
        error: 'Failed to fetch commit Info',
        details: errorMessage,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
