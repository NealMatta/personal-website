import { getMostRecentTrack } from '@/src/services/spotify/spotify';

export async function GET() {
  try {
    const track = await getMostRecentTrack();

    if (!track) {
      return new Response(JSON.stringify({ error: 'No recent track found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(track), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    // Narrow the type of the error
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';

    return new Response(
      JSON.stringify({
        error: 'Failed to fetch recent track',
        details: errorMessage,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
