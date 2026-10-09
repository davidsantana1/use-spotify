import Image from "next/image";
import { type CSSProperties, useRef, useState } from "react";
import { useExtractColors } from "react-extract-colors";
import { useInView } from "@/hooks/useInView";
import { useLyrics } from "@/hooks/useSpotify";
import { paletteGradient } from "@/lib/colors";
import { albumTypeLabel, pluralize, releaseYear } from "@/lib/format";
import { spotifyCodeUrl } from "@/lib/spotify-code";
import type { Album, Track } from "@/types/spotify";
import { ChevronLeft, ChevronRight, ExternalLink, Music } from "lucide-react";
import { MetaLine } from "./MetaLine";
import { SkeletonRows } from "./Skeleton";
import { StatusMessage } from "./StatusMessage";
import { TrackList } from "./TrackList";

export function AlbumDetails({ album }: { album: Album }) {
  const [track, setTrack] = useState<Track | null>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isScrolled = !useInView(sentinelRef, true);
  const { data: lyrics, isLoading: isLoadingLyrics } = useLyrics(track);

  const image = album.images[0]?.url;
  const thumb = album.images.at(-1)?.url;
  const { colors } = useExtractColors(image ?? "", { format: "hex" });
  const titleGradient = paletteGradient(colors);
  const barGradient = paletteGradient(colors, 45);

  const current = track ?? album;
  const lyricsText = lyrics?.plainLyrics?.trim();

  function selectTrack(next: Track | null) {
    setTrack(next);
    const panel = topRef.current?.parentElement;
    panel?.scrollTo({ top: 0 });
    panel?.scrollIntoView({ block: "nearest" });
    headingRef.current?.focus({ preventScroll: true });
  }

  const albumCrumb = (
    <>
      {thumb && <Image src={thumb} alt="" width={32} height={32} className="size-8 shrink-0 rounded-md" />}
      <span className="truncate group-hover:underline">{album.name}</span>
    </>
  );

  return (
    <div ref={topRef} className="flex min-h-full flex-col" style={{ "--accent": colors[1] ?? colors[0] } as CSSProperties}>
      <div ref={sentinelRef} aria-hidden="true" />
      <nav
        aria-label="Breadcrumb"
        className={`sticky -top-4 z-10 -mx-4 -mt-4 mb-4 flex items-center gap-3 rounded-t-[19px] border-b px-4 py-2.5 transition-[border-color,box-shadow] duration-300 sm:-top-8 sm:-mx-8 sm:-mt-8 sm:mb-6 sm:px-8 ${
          isScrolled ? "border-white/10 shadow-[0_8px_24px_rgb(0_0_0/0.35)]" : "border-transparent"
        }`}
      >
        <span
          aria-hidden="true"
          className={`absolute inset-0 -z-10 rounded-t-[19px] bg-surface transition-opacity duration-300 ${isScrolled ? "opacity-100" : "opacity-0"}`}
          style={barGradient ? { backgroundImage: barGradient } : undefined}
        />
        {track && (
          <button
            type="button"
            onClick={() => selectTrack(null)}
            aria-label={`Back to ${album.name}`}
            className="focus-ring grid size-8 shrink-0 cursor-pointer place-items-center rounded-full bg-white/10 transition-colors hover:bg-accent hover:text-black"
          >
            <ChevronLeft aria-hidden="true" className="size-4" strokeWidth={3} />
          </button>
        )}
        <ol className="flex min-w-0 flex-1 items-center gap-1.5 text-sm">
          <li className="min-w-0">
            {track ? (
              <button
                type="button"
                onClick={() => selectTrack(null)}
                className="focus-ring group flex max-w-full cursor-pointer items-center gap-3 rounded-md font-medium text-muted transition-colors hover:text-accent"
              >
                {albumCrumb}
              </button>
            ) : (
              <span aria-current="page" className="flex items-center gap-3">
                {albumCrumb}
              </span>
            )}
          </li>
          {track && (
            <li aria-current="page" className="flex min-w-0 items-center gap-1.5">
              <ChevronRight aria-hidden="true" className="size-3.5 shrink-0 text-muted" strokeWidth={3} />
              <span className="truncate">{track.name}</span>
            </li>
          )}
        </ol>
      </nav>

      <header className="flex flex-col xl:flex-row xl:items-end xl:gap-6">
        {image && (
          <Image
            src={image}
            alt={album.name}
            width={640}
            height={640}
            sizes="(min-width: 80rem) 224px, (min-width: 60rem) 400px, 100vw"
            className="mb-3 w-full max-w-100 rounded-xl shadow-[0_8px_32px_rgb(0_0_0/0.5)] xl:mb-0 xl:w-56 xl:shrink-0"
          />
        )}

        <div className="min-w-0 flex-1">
          <p className="eyebrow mb-1">{track ? "Song" : albumTypeLabel(album)}</p>
          <MetaLine
            className="mb-2"
            items={[album.artists[0]?.name, releaseYear(album.release_date), track ? undefined : pluralize(album.total_tracks, "song")]}
          />

          <h2
            ref={headingRef}
            tabIndex={-1}
            className="mb-4 text-2xl leading-tight font-extrabold tracking-tight text-balance focus:outline-none sm:text-3xl 2xl:text-4xl"
          >
            <span
              className="highlight box-decoration-clone"
              style={titleGradient ? { backgroundImage: titleGradient } : undefined}
            >
              {current.name}
            </span>
          </h2>

          <a
            href={current.external_urls.spotify}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${current.name} in Spotify (opens in a new tab)`}
            className="focus-ring mb-1 block w-fit rounded-xl transition-opacity hover:opacity-80"
          >
            <Image
              src={spotifyCodeUrl(current.uri, colors[1])}
              alt=""
              width={640}
              height={160}
              unoptimized
              className="h-auto w-full max-w-55 rounded-xl"
            />
          </a>
        </div>
      </header>

      {!track ? (
        <TrackList tracks={album.tracks.items} onSelect={selectTrack} />
      ) : isLoadingLyrics ? (
        <div className="my-4" role="status" aria-label="Loading lyrics">
          <SkeletonRows count={8} />
        </div>
      ) : lyricsText ? (
        <section className="my-4 whitespace-pre-line wrap-anywhere">
          <h3 className="eyebrow mb-4">Lyrics</h3>
          <p className="leading-relaxed">{lyricsText}</p>
        </section>
      ) : (
        <StatusMessage
          icon={Music}
          title="No lyrics for this one"
          hint={`We couldn’t find lyrics for “${track.name}”. It might be instrumental, or just not transcribed yet.`}
        >
          <a href={track.external_urls.spotify} target="_blank" rel="noreferrer" className="pill-primary">
            Listen on Spotify
            <ExternalLink aria-hidden="true" className="size-3.5" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <button type="button" onClick={() => selectTrack(null)} className="pill-ghost">
            Back to tracks
          </button>
        </StatusMessage>
      )}
    </div>
  );
}
