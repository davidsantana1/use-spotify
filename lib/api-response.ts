import "server-only";

const CACHE_HEADERS = { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" };

export async function cachedJson(load: () => Promise<unknown>) {
  try {
    return Response.json(await load(), { headers: CACHE_HEADERS });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Spotify request failed" }, { status: 502 });
  }
}
