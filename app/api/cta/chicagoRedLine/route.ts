/* Notes
- Calling the getChicagoRedLineStatus function here ensures that I'm executing the API on the server side
*/

import { getChicagoRedLineStatus } from '@/src/apiManagement/cta/cta';

export async function GET() {
  try {
    const res = await getChicagoRedLineStatus();

    if (!res) {
      return new Response(
        JSON.stringify({ error: 'No CTA information found' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
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
