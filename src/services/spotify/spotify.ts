import { isTrackObject, formatTrackData } from './helpers';
import { SpotifyOutput } from '@/src/types/spotify';
import { getAccessToken } from './tokenManager';

// Base URL for Spotify API
const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

export async function getMostRecentTrack(): Promise<SpotifyOutput | null> {
  try {
    const accessToken = await getAccessToken();

    const currentlyPlayingResponse = await fetch(
      `${SPOTIFY_API_URL}/me/player/currently-playing`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Succesfully runs if I'm playing a song or recently played a song
    // Otherwise, a response with the 200 value is returned but not body
    if (currentlyPlayingResponse.ok && currentlyPlayingResponse.body !== null) {
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
      throw new Error(
        `Spotify Recently Played API error: ${recentlyPlayedResponse.status}`
      );
    }

    const recentlyPlayedData: SpotifyApi.UsersRecentlyPlayedTracksResponse =
      await recentlyPlayedResponse.json();
    const firstItem: SpotifyApi.PlayHistoryObject = recentlyPlayedData.items[0];
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
