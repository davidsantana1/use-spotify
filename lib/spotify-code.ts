const FALLBACK_BG = "000000";

export function spotifyCodeUrl(uri: string, bgHex?: string) {
  const bg = bgHex?.replace("#", "").slice(0, 6) || FALLBACK_BG;
  return `https://scannables.scdn.co/uri/plain/png/${bg}/white/260/${uri}`;
}
