import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { fetchJson } from "@/lib/fetcher";
import { lyricsUrl } from "@/lib/lyrics";
import type { Album, Lyrics, SimplifiedAlbum, Track } from "@/types/spotify";

export function useAlbumSearch(query: string) {
  const q = query.trim();
  return useSWR<SimplifiedAlbum[]>(
    q ? `/api/search?${new URLSearchParams({ q })}` : null,
    fetchJson,
    { keepPreviousData: true }
  );
}

export function useAlbum(id: string | null) {
  return useSWRImmutable<Album>(id ? `/api/albums/${id}` : null, fetchJson, {
    keepPreviousData: true,
  });
}

export function useLyrics(track: Track | null) {
  return useSWRImmutable<Lyrics>(track ? lyricsUrl(track) : null, fetchJson);
}
