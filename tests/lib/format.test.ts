import { describe, expect, it } from "vitest";
import { albumTypeLabel, formatDuration, pluralize, releaseYear } from "@/lib/format";

describe("formatDuration", () => {
  it.each([
    [0, "0:00"],
    [5_000, "0:05"],
    [65_000, "1:05"],
    [600_000, "10:00"],
    [59_600, "1:00"],
  ])("%i ms -> %s", (ms, expected) => {
    expect(formatDuration(ms)).toBe(expected);
  });
});

describe("pluralize", () => {
  it("keeps singular for 1", () => expect(pluralize(1, "track")).toBe("1 track"));
  it("pluralizes 0 and many", () => {
    expect(pluralize(0, "track")).toBe("0 tracks");
    expect(pluralize(12, "track")).toBe("12 tracks");
  });
});

describe("albumTypeLabel", () => {
  it("labels compilations", () => {
    expect(albumTypeLabel({ album_type: "compilation", total_tracks: 20 })).toBe("Compilation");
  });
  it("splits singles into Single and EP at 4 tracks", () => {
    expect(albumTypeLabel({ album_type: "single", total_tracks: 3 })).toBe("Single");
    expect(albumTypeLabel({ album_type: "single", total_tracks: 4 })).toBe("EP");
  });
  it("defaults to Album", () => {
    expect(albumTypeLabel({ album_type: "album", total_tracks: 10 })).toBe("Album");
  });
});

describe("releaseYear", () => {
  it("takes the year from full and partial dates", () => {
    expect(releaseYear("2000-07-10")).toBe("2000");
    expect(releaseYear("2000")).toBe("2000");
  });
});
