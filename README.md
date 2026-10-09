# useSpotify

Search Spotify albums and read song lyrics. Built with Next.js (App Router), TypeScript and Tailwind CSS.

## Setup

1. Create a Spotify app at https://developer.spotify.com/dashboard.
2. Add credentials to `.env.local`:

   ```
   SPOTIFY_CLIENT_ID=...
   SPOTIFY_CLIENT_SECRET=...
   ```

3. Install and run:

   ```
   pnpm install
   pnpm dev
   ```

## Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Dev server at http://localhost:3000 |
| `pnpm build` | Production build |
| `pnpm start` | Serve production build |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript check |

## API

Spotify credentials stay server-side. The client calls:

- `GET /api/search?q=<query>` — matching albums
- `GET /api/albums/<id>` — album with tracks

Lyrics come from [LRCLIB](https://lrclib.net).
