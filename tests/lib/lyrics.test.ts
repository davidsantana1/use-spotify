import { describe, expect, it } from "vitest";
import { lyricsUrl } from "@/lib/lyrics";
import type { Track } from "@/types/spotify";

const track = (name: string, artists: string[]): Track => ({
  id: "t",
  name,
  uri: "spotify:track:t",
  duration_ms: 1000,
  artists: artists.map((n, i) => ({ id: String(i), name: n })),
  external_urls: { spotify: "" },
});

describe("lyricsUrl", () => {
  it("uses the first artist and encodes params", () => {
    const url = new URL(lyricsUrl(track("Don't Panic & Go", ["Coldplay", "Other"])));
    expect(url.origin + url.pathname).toBe("https://lrclib.net/api/get");
    expect(url.searchParams.get("artist_name")).toBe("Coldplay");
    expect(url.searchParams.get("track_name")).toBe("Don't Panic & Go");
  });

  it("falls back to empty artist", () => {
    expect(new URL(lyricsUrl(track("x", []))).searchParams.get("artist_name")).toBe("");
  });
});
