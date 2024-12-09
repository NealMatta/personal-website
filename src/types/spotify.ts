interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

interface SpotifyAlbum {
  name: string;
  images: SpotifyImage[];
}

interface SpotifyArtist {
  name: string;
}

interface SpotifyTrack {
  name: string;
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  duration_ms: number;
}

interface SpotifyDevice {
  id: string;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: string;
  volume_percent: number;
}

export interface SpotifyCurrentlyPlaying {
  timestamp: number;
  context: null | {
    type: string;
    href: string;
    external_urls: {
      spotify: string;
    };
  };
  progress_ms: number;
  item: SpotifyTrack;
  currently_playing_type: string;
  is_playing: boolean;
  device: SpotifyDevice;
}
