import type { NextRequest } from "next/server";
import { cachedJson } from "@/lib/api-response";
import { SEARCH_MAX_OFFSET, SEARCH_PAGE_SIZE } from "@/lib/search";
import { spotifyGet, toSimplifiedAlbum } from "@/lib/spotify";
import type { SearchResponse } from "@/types/spotify";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const q = params.get("q")?.trim();
  if (!q) return Response.json({ error: "Missing q" }, { status: 400 });

  const offset = Number(params.get("offset") ?? 0);
  if (!Number.isInteger(offset) || offset < 0 || offset >= SEARCH_MAX_OFFSET) {
    return Response.json({ error: "Invalid offset" }, { status: 400 });
  }

  return cachedJson(async () => {
    const data = await spotifyGet<SearchResponse>("/search", {
      q,
      type: "album",
      limit: String(SEARCH_PAGE_SIZE),
      offset: String(offset),
    });
    return data.albums.items.map(toSimplifiedAlbum);
  });
}
