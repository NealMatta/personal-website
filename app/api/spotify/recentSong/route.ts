import { getMostRecentTrack } from '@/src/services/spotify/spotifyAPI';

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
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch recent track',
        details: error.message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
