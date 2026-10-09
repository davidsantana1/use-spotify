import type { Track } from "@/types/spotify";

export function lyricsUrl(track: Track) {
  const params = new URLSearchParams({
    artist_name: track.artists[0]?.name ?? "",
    track_name: track.name,
  });
  return `https://lrclib.net/api/get?${params}`;
}
