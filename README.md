# useSpotify

Search Spotify albums, browse tracklists and read lyrics.

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)

Built with Next.js (App Router), TypeScript and Tailwind CSS. Lyrics come from [LRCLIB](https://lrclib.net).

![useSpotify screenshot](docs/screenshot.jpg)

## Setup

Create a Spotify app in the [developer dashboard](https://developer.spotify.com/dashboard), then add its credentials to `.env.local`:

```env
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
```

Install and run:

```bash
pnpm install
pnpm dev
```

The app runs at http://localhost:3000.

## Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Dev server |
| `pnpm build` | Production build |
| `pnpm start` | Serve production build |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript check |

## API

Spotify credentials stay server-side. The client calls:

- `GET /api/search?q=<query>`: matching albums, paginated
- `GET /api/albums/<id>`: album with tracks

## Layout

```
app/          routes, layout, API route handlers
components/   UI components
hooks/        data fetching and UI hooks
lib/          Spotify client, lyrics, formatting helpers
types/        shared types
```
