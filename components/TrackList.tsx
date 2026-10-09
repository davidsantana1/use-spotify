import { formatDuration } from "@/lib/format";
import type { Track } from "@/types/spotify";

interface TrackListProps {
  tracks: Track[];
  onSelect: (track: Track) => void;
}

export function TrackList({ tracks, onSelect }: TrackListProps) {
  return (
    <ol className="my-4 flex flex-col gap-1">
      {tracks.map((track, i) => (
        <li key={track.id}>
          <button type="button" onClick={() => onSelect(track)} className="row-button group hover:bg-accent/12">
            <span className="w-6 shrink-0 text-right text-sm text-muted tabular-nums">{i + 1}</span>
            <span className="min-w-0 flex-1 truncate transition-colors group-hover:text-accent">{track.name}</span>
            <span className="shrink-0 text-sm font-normal text-muted tabular-nums">
              {formatDuration(track.duration_ms)}
            </span>
          </button>
        </li>
      ))}
    </ol>
  );
}
