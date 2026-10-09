import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "@/app/api/search/route";
import { spotifyGet } from "@/lib/spotify";

vi.mock("@/lib/spotify", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/spotify")>()),
  spotifyGet: vi.fn(),
}));

const request = (qs: string) => new NextRequest(`http://localhost/api/search${qs}`);

const rawAlbum = {
  id: "a",
  name: "Parachutes",
  images: [],
  release_date: "2000-07-10",
  artists: [{ id: "1", name: "Coldplay", href: "x" }],
  available_markets: ["US"],
};

beforeEach(() => {
  vi.mocked(spotifyGet).mockReset();
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("GET /api/search", () => {
  it.each(["", "?q=", "?q=%20%20"])("400 on missing query %j", async (qs) => {
    expect((await GET(request(qs))).status).toBe(400);
    expect(spotifyGet).not.toHaveBeenCalled();
  });

  it.each(["-1", "1000", "1.5", "abc"])("400 on invalid offset %s", async (offset) => {
    expect((await GET(request(`?q=coldplay&offset=${offset}`))).status).toBe(400);
  });

  it("accepts the last valid offset", async () => {
    vi.mocked(spotifyGet).mockResolvedValue({ albums: { items: [] } });
    expect((await GET(request("?q=coldplay&offset=999"))).status).toBe(200);
  });

  it("queries Spotify and returns trimmed albums with cache headers", async () => {
    vi.mocked(spotifyGet).mockResolvedValue({ albums: { items: [rawAlbum] } });

    const res = await GET(request("?q=%20coldplay%20&offset=20"));

    expect(spotifyGet).toHaveBeenCalledWith("/search", { q: "coldplay", type: "album", limit: "20", offset: "20" });
    expect(res.headers.get("Cache-Control")).toContain("s-maxage=3600");
    expect(await res.json()).toEqual([
      { id: "a", name: "Parachutes", images: [], release_date: "2000-07-10", artists: [{ id: "1", name: "Coldplay" }] },
    ]);
  });

  it("502 when Spotify fails", async () => {
    vi.mocked(spotifyGet).mockRejectedValue(new Error("boom"));
    const res = await GET(request("?q=coldplay"));
    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ error: "Spotify request failed" });
  });
});
