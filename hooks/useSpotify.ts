import useSWRImmutable from "swr/immutable";
import useSWRInfinite from "swr/infinite";
import { fetchJson } from "@/lib/fetcher";
import { lyricsUrl } from "@/lib/lyrics";
import { SEARCH_MAX_OFFSET, SEARCH_PAGE_SIZE } from "@/lib/search";
import type { Album, Lyrics, SimplifiedAlbum, Track } from "@/types/spotify";

export function useAlbumSearch(query: string) {
  const q = query.trim();
  const { data, size, setSize, isLoading, error } = useSWRInfinite<SimplifiedAlbum[]>(
    (index, prev: SimplifiedAlbum[] | null) => {
      const offset = index * SEARCH_PAGE_SIZE;
      if (!q || offset >= SEARCH_MAX_OFFSET || (prev && prev.length < SEARCH_PAGE_SIZE)) return null;
      return `/api/search?${new URLSearchParams({ q, offset: String(offset) })}`;
    },
    fetchJson,
    { keepPreviousData: true }
  );

  const pages = data ?? [];
  const albums = [...new Map(pages.flat().map((album) => [album.id, album])).values()];
  const hasMore = pages.at(-1)?.length === SEARCH_PAGE_SIZE && pages.length * SEARCH_PAGE_SIZE < SEARCH_MAX_OFFSET;

  return {
    albums,
    error,
    isLoading,
    hasMore,
    isLoadingMore: size > pages.length,
    loadMore: () => setSize(size + 1),
  };
}

export function useAlbum(id: string | null) {
  return useSWRImmutable<Album>(id ? `/api/albums/${id}` : null, fetchJson, {
    keepPreviousData: true,
  });
}

export function useLyrics(track: Track | null) {
  return useSWRImmutable<Lyrics>(track ? lyricsUrl(track) : null, fetchJson);
}
