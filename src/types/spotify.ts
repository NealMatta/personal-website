export interface SpotifyOutput {
  albumCover: string;
  songName: string;
  artist: string;
  album: string;
  /** Link to the track on Spotify. */
  url: string;
  /** Human label for the card header: currently playing, or last listened. */
  lastPlayed: string;
  isPlaying: boolean;
  /** ISO timestamp the track finished, when it isn't playing now. */
  playedAt: string | null;
}
