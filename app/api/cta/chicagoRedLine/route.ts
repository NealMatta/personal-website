/* Notes
- Calling the getChicagoRedLineStatus function here ensures that I'm executing the API on the server side
*/

import { getChicagoRedLineStatus } from '@/src/services/cta/cta';

export async function GET() {
  try {
    const track = await getChicagoRedLineStatus();

    // A null value would be returned if no songs were able to be found or the Spotify API is erroring out
    if (!track) {
      return new Response(
        JSON.stringify({ error: 'No CTA information found' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
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
        error: 'Failed to fetch CTA Info',
        details: errorMessage,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
