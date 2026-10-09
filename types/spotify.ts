export interface SpotifyImage {
  url: string;
  width: number | null;
  height: number | null;
}

export interface Artist {
  id: string;
  name: string;
}

export interface Track {
  id: string;
  name: string;
  uri: string;
  artists: Artist[];
  external_urls: { spotify: string };
}

export interface SimplifiedAlbum {
  id: string;
  name: string;
  images: SpotifyImage[];
}

export interface Album extends SimplifiedAlbum {
  uri: string;
  release_date: string;
  total_tracks: number;
  artists: Artist[];
  external_urls: { spotify: string };
  tracks: { items: Track[] };
}

export interface SearchResponse {
  albums: { items: SimplifiedAlbum[] };
}

export interface Lyrics {
  plainLyrics: string | null;
}
