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
  duration_ms: number;
  artists: Artist[];
  external_urls: { spotify: string };
}

export interface SimplifiedAlbum {
  id: string;
  name: string;
  images: SpotifyImage[];
  artists: Artist[];
  release_date: string;
}

export interface Album extends SimplifiedAlbum {
  uri: string;
  album_type: "album" | "single" | "compilation";
  total_tracks: number;
  external_urls: { spotify: string };
  tracks: { items: Track[] };
}

export interface SearchResponse {
  albums: { items: SimplifiedAlbum[] };
}

export interface Lyrics {
  plainLyrics: string | null;
}
