import type { NextRequest } from "next/server";
import { cachedJson } from "@/lib/api-response";
import { spotifyGet, toAlbum } from "@/lib/spotify";
import type { Album } from "@/types/spotify";

const SPOTIFY_ID = /^[A-Za-z0-9]{22}$/;

export async function GET(_: NextRequest, ctx: RouteContext<"/api/albums/[id]">) {
  const { id } = await ctx.params;
  if (!SPOTIFY_ID.test(id)) return Response.json({ error: "Invalid id" }, { status: 400 });

  return cachedJson(async () => toAlbum(await spotifyGet<Album>(`/albums/${id}`)));
}
