import Image from "next/image";
import type { Ref } from "react";
import type { SimplifiedAlbum } from "@/types/spotify";
import { Panel } from "./Panel";

interface AlbumListProps {
  albums: SimplifiedAlbum[];
  onSelect: (id: string) => void;
  ref?: Ref<HTMLElement>;
}

export function AlbumList({ albums, onSelect, ref }: AlbumListProps) {
  return (
    <Panel ref={ref} aria-labelledby="suggestions-heading">
      <h2 id="suggestions-heading" className="mb-4">
        Suggestions
      </h2>
      <ul className="flex flex-col gap-4">
        {albums.map((album) => (
          <li key={album.id} className="border-b-2 border-divider last:border-none">
            <button
              type="button"
              onClick={() => onSelect(album.id)}
              className="flex w-full cursor-pointer items-center gap-3 p-2 text-left hover:bg-item-hover sm:gap-4"
            >
              {album.images[0] && (
                <Image
                  src={album.images[0].url}
                  alt=""
                  width={52}
                  height={52}
                  className="size-13 shrink-0 rounded-md object-cover"
                />
              )}
              {album.name}
            </button>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
