import "server-only";
import { env } from "./env";
import { fetchJson } from "./fetcher";
import type { Album, Artist, SimplifiedAlbum } from "@/types/spotify";

const API_URL = "https://api.spotify.com/v1";
const TOKEN_URL = "https://accounts.spotify.com/api/token";
const EXPIRY_MARGIN_MS = 60_000;

interface TokenResponse {
  access_token: string;
  expires_in: number;
}

let cached: { token: string; expiresAt: number } | null = null;

async function getToken() {
  if (cached && Date.now() < cached.expiresAt) return cached.token;

  const credentials = Buffer.from(
    `${env.spotifyClientId}:${env.spotifyClientSecret}`
  ).toString("base64");

  const data = await fetchJson<TokenResponse>(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${credentials}`,
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  cached = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000 - EXPIRY_MARGIN_MS,
  };
  return cached.token;
}

export async function spotifyGet<T>(path: string, params?: Record<string, string>) {
  const query = params ? `?${new URLSearchParams(params)}` : "";
  return fetchJson<T>(`${API_URL}${path}${query}`, {
    headers: { Authorization: `Bearer ${await getToken()}` },
    cache: "no-store",
  });
}

function toArtist({ id, name }: Artist): Artist {
  return { id, name };
}

export function toSimplifiedAlbum({ id, name, images, artists, release_date }: SimplifiedAlbum): SimplifiedAlbum {
  return { id, name, images, artists: artists.map(toArtist), release_date };
}

export function toAlbum(album: Album): Album {
  return {
    ...toSimplifiedAlbum(album),
    uri: album.uri,
    album_type: album.album_type,
    total_tracks: album.total_tracks,
    external_urls: album.external_urls,
    tracks: {
      items: album.tracks.items.map(({ id, name, uri, duration_ms, artists, external_urls }) => ({
        id,
        name,
        uri,
        duration_ms,
        artists: artists.map(toArtist),
        external_urls,
      })),
    },
  };
}
