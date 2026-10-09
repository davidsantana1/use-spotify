import type { Album } from "@/types/spotify";

export function formatDuration(ms: number) {
  const totalSeconds = Math.round(ms / 1000);
  return `${Math.floor(totalSeconds / 60)}:${String(totalSeconds % 60).padStart(2, "0")}`;
}

export function pluralize(count: number, word: string) {
  return `${count} ${count === 1 ? word : `${word}s`}`;
}

const EP_MIN_TRACKS = 4;

export function albumTypeLabel({ album_type, total_tracks }: Pick<Album, "album_type" | "total_tracks">) {
  if (album_type === "compilation") return "Compilation";
  if (album_type === "single") return total_tracks >= EP_MIN_TRACKS ? "EP" : "Single";
  return "Album";
}

export function releaseYear(date: string) {
  return date.slice(0, 4);
}
