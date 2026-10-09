import Image from "next/image";
import { Search, TriangleAlert } from "lucide-react";
import { type Ref, useEffect, useRef } from "react";
import { useInView } from "@/hooks/useInView";
import { releaseYear } from "@/lib/format";
import type { SimplifiedAlbum } from "@/types/spotify";
import { MetaLine } from "./MetaLine";
import { Panel } from "./Panel";
import { SkeletonRows } from "./Skeleton";
import { StatusMessage } from "./StatusMessage";

interface AlbumListProps {
  albums: SimplifiedAlbum[];
  query: string;
  selectedId: string | null;
  isLoading: boolean;
  hasError: boolean;
  hasMore: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
  onSelect: (id: string) => void;
  ref?: Ref<HTMLElement>;
}

export function AlbumList({
  albums,
  query,
  selectedId,
  isLoading,
  hasError,
  hasMore,
  isLoadingMore,
  onLoadMore,
  onSelect,
  ref,
}: AlbumListProps) {
  const endRef = useRef<HTMLDivElement>(null);
  const isEndInView = useInView(endRef);

  useEffect(() => {
    if (isEndInView && hasMore && !isLoadingMore) onLoadMore();
  }, [isEndInView, hasMore, isLoadingMore, onLoadMore]);

  return (
    <Panel ref={ref} aria-labelledby="suggestions-heading" aria-busy={isLoading}>
      <h2 id="suggestions-heading" className="mb-4">
        Suggestions
      </h2>
      {albums.length > 0 ? (
        <ul className={`flex flex-col gap-1 transition-opacity ${isLoading ? "opacity-60" : ""}`}>
          {albums.map((album) => (
            <li key={album.id}>
              <button
                type="button"
                onClick={() => onSelect(album.id)}
                aria-current={album.id === selectedId || undefined}
                className="row-button sm:gap-4"
              >
                {album.images[0] ? (
                  <Image
                    src={album.images[0].url}
                    alt=""
                    width={52}
                    height={52}
                    className="size-13 shrink-0 rounded-md object-cover"
                  />
                ) : (
                  <div className="size-13 shrink-0 rounded-md bg-input" />
                )}
                <span className="min-w-0">
                  <span className="line-clamp-2">{album.name}</span>
                  <MetaLine items={[album.artists[0]?.name, releaseYear(album.release_date)]} />
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : hasError ? (
        <StatusMessage icon={TriangleAlert} title="Something went wrong" hint="Couldn’t reach Spotify. Try again in a moment." />
      ) : isLoading ? (
        <SkeletonRows count={6} withThumb />
      ) : (
        <StatusMessage icon={Search} title={`No albums found for “${query.trim()}”`} hint="Check the spelling or try another artist." />
      )}
      {isLoadingMore && <SkeletonRows count={2} withThumb />}
      <div ref={endRef} aria-hidden="true" />
    </Panel>
  );
}
