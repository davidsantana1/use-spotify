import type { NextRequest } from "next/server";
import { cachedJson } from "@/lib/api-response";
import { spotifyGet, toSimplifiedAlbum } from "@/lib/spotify";
import type { SearchResponse } from "@/types/spotify";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim();
  if (!q) return Response.json({ error: "Missing q" }, { status: 400 });

  return cachedJson(async () => {
    const data = await spotifyGet<SearchResponse>("/search", { q, type: "album" });
    return data.albums.items.map(toSimplifiedAlbum);
  });
}
