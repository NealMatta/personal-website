const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';

// Environment variables (replace these with your process.env values)
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!; // Could also move this to supabase as well

const ACCESS_TOKEN = {
  accessToken: process.env.TEMP_SPOTIFY_ACCESS_TOKEN,
  expiryDate: '01/01/1997',
};

// Checks validity of access token
export function accessTokenValid(expiryDate: string): boolean {
  const now = new Date();
  const expiry = new Date(expiryDate);
  return now < expiry;
}

// Refreshes access token
// TODO: Implement retries or fallback mechanisms in case the token refresh fails
export async function refreshAccessToken(): Promise<string> {
  try {
    const response = await fetch(SPOTIFY_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: REFRESH_TOKEN,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh access token');
    }

    // TODO: Reset the access token in Redis and store expiry time as well
    const data = await response.json();
    const newAccessToken = data.access_token;

    console.log('Access token refreshed successfully!');
    return newAccessToken;
  } catch (error) {
    console.error(
      'Error refreshing access token:',
      error instanceof Error ? error.message : error
    );
    throw error; // Propagate the error to stop further retries
  }
}

export async function getAccessToken(): Promise<string> {
  // TODO: Pull from redis store the access token and the expiry time
  /* const tokenData = await redis.get('spotify_access_token');
    if (tokenData) {
      const { accessToken, expiryDate } = JSON.parse(tokenData);
      if (accessTokenValid(expiryDate)) {
        return accessToken;
      }
    }
    return await refreshAccessToken(); */

  // Change to NOT to get the refresh piece to work
  if (!accessTokenValid(ACCESS_TOKEN.expiryDate)) {
    return await refreshAccessToken();
  }

  return ACCESS_TOKEN.accessToken!;
}
