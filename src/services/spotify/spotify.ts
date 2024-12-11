// Base URL for Spotify API
const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

// Access token would be stored in redis alongside the expiration time.

import { isTrackObject, formatTrackData } from './helpers';
import { SpotifyOutput } from '@/src/types/spotify';
import { getAccessToken } from './tokenManager';

export async function getMostRecentTrack(): Promise<SpotifyOutput | null> {
  try {
    const accessToken = await getAccessToken();

    // console.log(accessToken);

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
      const currentlyPlayingData: SpotifyApi.CurrentPlaybackResponse =
        await currentlyPlayingResponse.json();
      if (
        currentlyPlayingData.item &&
        isTrackObject(currentlyPlayingData.item)
      ) {
        return formatTrackData(
          currentlyPlayingData.item,
          currentlyPlayingData.is_playing
        );
      }
    }
    console.warn('No recently played track found.');
    return null;
  } catch (error) {
    console.error(
      'Error fetching the most recent track:',
      error instanceof Error ? error.message : error
    );
    return null; // Return null to indicate failure
  }
}
