// Base URL for Spotify API
const SPOTIFY_API_URL = 'https://api.spotify.com/v1';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';

// Environment variables (replace these with your process.env values)
const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN!; // Could also move this to supabase as well
import { SpotifyRecentlyPlayed } from '@/src/types/spotify';
// Access token would be stored in redis alongside the expiration time.
const ACCESS_TOKEN = {
  accessToken: process.env.NEXT_PUBLIC_TEMP_SPOTIFY_ACCESS_TOKEN,
  expiryDate: '01/01/1997',
};

export async function getMostRecentTrack(): Promise<{
  albumCover: string;
  songName: string;
  artist: string;
  lastPlayed: string;
} | null> {
  try {
    const accessToken = await getAccessToken();

    // First, try to get the currently playing track
    const currentlyPlayingResponse = await fetch(
      `${SPOTIFY_API_URL}/me/player/currently-playing`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (currentlyPlayingResponse.ok) {
      const currentlyPlayingData = await currentlyPlayingResponse.json();

      if (currentlyPlayingData.item) {
        return formatTrackData(currentlyPlayingData.item, true);
      }
    }

    // If nothing is playing, fall back to recently played
    const recentlyPlayedResponse = await fetch(
      `${SPOTIFY_API_URL}/me/player/recently-played?limit=1`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!recentlyPlayedResponse.ok) {
      throw new Error(`Spotify API error: ${recentlyPlayedResponse.status}`);
    }

    const recentlyPlayedData: SpotifyRecentlyPlayed =
      await recentlyPlayedResponse.json();
    const firstItem = recentlyPlayedData.items[0];
    if (!firstItem) {
      console.warn('No recently played track found.');
      return null;
    }

    return formatTrackData(firstItem.track);
  } catch (error) {
    console.error(
      'Error fetching the most recent track:',
      error instanceof Error ? error.message : error
    );
    return null; // Return null to indicate failure
  }
}

function formatTrackData(
  track: any,
  isCurrentlyPlaying: boolean = false
): {
  albumCover: string;
  songName: string;
  artist: string;
  lastPlayed: string;
} {
  return {
    albumCover: track.album.images[0]?.url || '',
    songName: track.name,
    artist: track.artists.map((artist: any) => artist.name).join(', '),
    lastPlayed: isCurrentlyPlaying
      ? 'Currently Playing'
      : new Date(track.played_at).toLocaleString(),
  };
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

  if (accessTokenValid(ACCESS_TOKEN.expiryDate)) {
    return refreshAccessToken();
  }

  return ACCESS_TOKEN.accessToken!;
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
