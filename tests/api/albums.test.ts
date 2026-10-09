import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "@/app/api/albums/[id]/route";
import { spotifyGet } from "@/lib/spotify";

vi.mock("@/lib/spotify", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/spotify")>()),
  spotifyGet: vi.fn(),
}));

const call = (id: string) =>
  GET(new NextRequest(`http://localhost/api/albums/${id}`), { params: Promise.resolve({ id }) } as never);

const ID = "4E7uOEtR9Ou8tKiRIZwhJ6";

beforeEach(() => {
  vi.mocked(spotifyGet).mockReset();
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("GET /api/albums/[id]", () => {
  it.each(["short", "../../etc/passwd", `${ID}x`, "4E7uOEtR9Ou8tKiRIZwh!!"])("400 on invalid id %s", async (id) => {
    expect((await call(id)).status).toBe(400);
    expect(spotifyGet).not.toHaveBeenCalled();
  });

  it("returns the mapped album", async () => {
    vi.mocked(spotifyGet).mockResolvedValue({
      id: ID,
      name: "Parachutes",
      images: [],
      release_date: "2000-07-10",
      uri: `spotify:album:${ID}`,
      album_type: "album",
      total_tracks: 0,
      external_urls: { spotify: "" },
      artists: [],
      tracks: { items: [] },
      label: "Parlophone",
    });

    const res = await call(ID);

    expect(spotifyGet).toHaveBeenCalledWith(`/albums/${ID}`);
    expect(res.status).toBe(200);
    expect(await res.json()).not.toHaveProperty("label");
  });

  it("502 when Spotify fails", async () => {
    vi.mocked(spotifyGet).mockRejectedValue(new Error("boom"));
    expect((await call(ID)).status).toBe(502);
  });
});
