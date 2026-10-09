import Image from "next/image";
import { useRef, useState } from "react";
import { useExtractColors } from "react-extract-colors";
import { useLyrics } from "@/hooks/useSpotify";
import { spotifyCodeUrl } from "@/lib/spotify-code";
import type { Album, Track } from "@/types/spotify";
import { Panel } from "./Panel";
import { TrackList } from "./TrackList";

export function AlbumDetails({ album }: { album: Album }) {
  const [track, setTrack] = useState<Track | null>(null);
  const panelRef = useRef<HTMLElement>(null);
  const { data: lyrics, isLoading: isLoadingLyrics } = useLyrics(track);

  const image = album.images[0]?.url;
  const { colors } = useExtractColors(image ?? "", { format: "hex" });

  const current = track ?? album;
  const lyricsText = lyrics?.plainLyrics?.trim();

  function selectTrack(next: Track | null) {
    setTrack(next);
    panelRef.current?.scrollTo({ top: 0 });
  }

  return (
    <Panel ref={panelRef} className="flex flex-col">
      {track && (
        <button
          type="button"
          onClick={() => selectTrack(null)}
          className="mb-5 flex w-fit cursor-pointer items-center gap-1 rounded-xl bg-spotify px-3 py-1.5 text-sm text-black hover:bg-spotify-hover"
        >
          <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back
        </button>
      )}

      {image && (
        <Image
          src={image}
          alt={album.name}
          width={640}
          height={640}
          sizes="(min-width: 60rem) 400px, 100vw"
          className="mb-3 w-full max-w-100 rounded-xl"
        />
      )}

      <p className="mb-2 flex flex-wrap items-center gap-1 text-sm text-muted">
        {album.artists[0]?.name} <span aria-hidden="true">&#9679;</span> {album.release_date.slice(0, 4)}
        {!track && (
          <>
            {" "}
            <span aria-hidden="true">&#9679;</span> {album.total_tracks} songs
          </>
        )}
      </p>

      <h2
        className="highlight mb-4 max-w-fit text-2xl"
        style={colors.length > 1 ? { backgroundImage: `linear-gradient(90deg, ${colors.slice(0, 3).join(", ")})` } : undefined}
      >
        {current.name}
      </h2>

      <a href={current.external_urls.spotify} target="_blank" rel="noreferrer" className="mb-1 w-fit">
        <Image
          src={spotifyCodeUrl(current.uri, colors[1])}
          alt={`Spotify Code for ${current.name}`}
          width={640}
          height={160}
          unoptimized
          className="h-auto w-full max-w-55 rounded-xl"
        />
      </a>

      {!track ? (
        <TrackList tracks={album.tracks.items} onSelect={selectTrack} />
      ) : isLoadingLyrics ? (
        <p className="my-4">Loading lyrics…</p>
      ) : lyricsText ? (
        <section className="my-4 whitespace-pre-line wrap-anywhere">
          <h3 className="mb-4">Lyrics</h3>
          {lyricsText}
        </section>
      ) : (
        <p className="my-4">No lyrics found.</p>
      )}
    </Panel>
  );
}
