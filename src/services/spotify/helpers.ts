// Type Guard function for the currently Playing Response since it returns either a Track or an Episode
export function isTrackObject(
  item: SpotifyApi.TrackObjectFull | SpotifyApi.EpisodeObject
): item is SpotifyApi.TrackObjectFull {
  return 'album' in item && 'artists' in item;
}

export function formatTrackData(
  track: SpotifyApi.TrackObjectFull,
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
    artist: track.artists.map((artist) => artist.name).join(', '),
    lastPlayed: isCurrentlyPlaying ? 'Currently Playing' : 'Last Listened To',
  };
}
