"use client";

import { useRef, useState } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useAlbum, useAlbumSearch } from "@/hooks/useSpotify";
import { AlbumDetails } from "./AlbumDetails";
import { AlbumList } from "./AlbumList";
import { Backdrop } from "./Backdrop";
import { NavBar } from "./NavBar";
import { Panel } from "./Panel";
import { AlbumDetailsSkeleton } from "./Skeleton";
import { StatusMessage } from "./StatusMessage";

const SEARCH_DEBOUNCE_MS = 300;
const STACKED_LAYOUT = "(max-width: 59.99rem)";

export function SpotifySearch() {
  const [query, setQuery] = useState("");
  const [albumId, setAlbumId] = useState<string | null>(null);
  const listRef = useRef<HTMLElement>(null);
  const detailsRef = useRef<HTMLElement>(null);

  const debouncedQuery = useDebouncedValue(query, SEARCH_DEBOUNCE_MS);
  const hasQuery = query.trim() !== "";
  const search = useAlbumSearch(debouncedQuery);
  const isSearching = query.trim() !== debouncedQuery.trim() || search.isLoading;
  const album = useAlbum(albumId);

  function handleQueryChange(next: string) {
    setQuery(next);
    listRef.current?.scrollTo({ top: 0 });
  }

  function handleSelect(id: string) {
    setAlbumId(id);
    if (window.matchMedia(STACKED_LAYOUT).matches) {
      requestAnimationFrame(() => detailsRef.current?.scrollIntoView({ block: "start" }));
    }
  }

  return (
    <div className="flex min-h-dvh flex-col lg:h-dvh">
      <Backdrop image={hasQuery ? album.data?.images.at(-1)?.url : undefined} />
      <NavBar
        query={query}
        onQueryChange={handleQueryChange}
      />
      {hasQuery ? (
        <main className="mx-auto grid w-full max-w-160 grid-cols-1 gap-4 px-4 pb-8 sm:gap-8 sm:px-6 lg:min-h-0 lg:max-w-7xl lg:flex-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:grid-rows-[minmax(0,1fr)] lg:px-12">
          <AlbumList
            ref={listRef}
            albums={search.albums}
            query={query}
            selectedId={albumId}
            isLoading={isSearching}
            hasError={!!search.error}
            hasMore={search.hasMore}
            isLoadingMore={search.isLoadingMore}
            onLoadMore={search.loadMore}
            onSelect={handleSelect}
          />
          {albumId && (
            <Panel ref={detailsRef} aria-label="Album details" aria-busy={album.isLoading} className="scroll-mt-4">
              {album.isLoading ? (
                <AlbumDetailsSkeleton />
              ) : album.data ? (
                <AlbumDetails key={album.data.id} album={album.data} />
              ) : (
                <StatusMessage icon="warning" title="Couldn’t load this album" hint="Pick it again or try another one." />
              )}
            </Panel>
          )}
        </main>
      ) : (
        <main className="px-4 pt-8">
          <StatusMessage
            icon="musicNote"
            title={<h1 className="text-[2em]">Search a Song!</h1>}
            hint="Find an album, pick a track, read the lyrics."
          />
        </main>
      )}
    </div>
  );
}
