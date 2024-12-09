// Base URL for Spotify API
const SPOTIFY_API_URL = 'https://api.spotify.com/v1';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';

// Environment variables (replace these with your process.env values)
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!; // Could also move this to supabase as well
import { SpotifyCurrentlyPlaying } from '@/src/types/spotify';
// Access token would be stored in redis alongside the expiration time.
const ACCESS_TOKEN = { accessToken: 'abc', expiryDate: '01/01/1997' };

export async function getCurrentlyPlaying(): Promise<SpotifyCurrentlyPlaying | null> {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(
      `${SPOTIFY_API_URL}/me/player/currently-playing`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(
      'Error fetching currently playing:',
      error instanceof Error ? error.message : error
    );
    return null; // Return null to indicate failure
  }
}

async function getAccessToken(): Promise<string> {
  // TODO: Pull from redis store the access token and the expiry time
  /* const tokenData = await redis.get('spotify_access_token');
  if (tokenData) {
    const { accessToken, expiryDate } = JSON.parse(tokenData);
    if (accessTokenValid(expiryDate)) {
      return accessToken;
    }
  }
  return await refreshAccessToken(); */

  if (!accessTokenValid(ACCESS_TOKEN.expiryDate)) {
    return refreshAccessToken();
  }
  return ACCESS_TOKEN.accessToken;
}

function accessTokenValid(expiryDate: string): boolean {
  const now = new Date();
  const expiry = new Date(expiryDate);
  return now < expiry;
}

// TODO: Implement retries or fallback mechanisms in case the token refresh fails
async function refreshAccessToken(): Promise<string> {
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
