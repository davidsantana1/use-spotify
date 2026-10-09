import type { Track } from "@/types/spotify";

interface TrackListProps {
  tracks: Track[];
  onSelect: (track: Track) => void;
}

export function TrackList({ tracks, onSelect }: TrackListProps) {
  return (
    <ol className="my-4 flex flex-col gap-4">
      {tracks.map((track, i) => (
        <li key={track.id}>
          {i + 1} -{" "}
          <button
            type="button"
            onClick={() => onSelect(track)}
            className="cursor-pointer text-left underline hover:text-spotify"
          >
            {track.name}
          </button>
        </li>
      ))}
    </ol>
  );
}
