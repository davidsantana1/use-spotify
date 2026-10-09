"use client";

import { useRef, useState } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useAlbum, useAlbumSearch } from "@/hooks/useSpotify";
import { AlbumDetails } from "./AlbumDetails";
import { AlbumList } from "./AlbumList";
import { NavBar } from "./NavBar";

const SEARCH_DEBOUNCE_MS = 300;

export function SpotifySearch() {
  const [query, setQuery] = useState("");
  const [albumId, setAlbumId] = useState<string | null>(null);
  const listRef = useRef<HTMLElement>(null);

  const hasQuery = query.trim() !== "";
  const { data: albums = [] } = useAlbumSearch(useDebouncedValue(query, SEARCH_DEBOUNCE_MS));
  const { data: album } = useAlbum(albumId);

  function handleQueryChange(next: string) {
    setQuery(next);
    listRef.current?.scrollTo({ top: 0 });
  }

  return (
    <>
      <NavBar query={query} onQueryChange={handleQueryChange} resultCount={hasQuery ? albums.length : 0} />
      {hasQuery ? (
        <main className="mx-auto grid max-w-160 grid-cols-1 gap-4 px-4 sm:gap-8 sm:px-6 lg:max-w-228 lg:grid-cols-2 lg:px-16">
          <AlbumList ref={listRef} albums={albums} onSelect={setAlbumId} />
          {album && <AlbumDetails key={album.id} album={album} />}
        </main>
      ) : (
        <h1 className="text-center text-[2em] font-bold">Search a Song!</h1>
      )}
    </>
  );
}
