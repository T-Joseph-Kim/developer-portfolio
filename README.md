# Developer Portfolio

Modern personal portfolio built with React + Vite + TypeScript, with animated sections, live Spotify "recently played", global likes, and weather in an Activity Hub.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion
- Lucide Icons + React Icons
- Vercel serverless API routes

## Features

- Animated landing experience with terminal-style loader
- Experience timeline with expandable role details
- Activity Hub:
- Spotify recently played embed (via Spotify API + refresh token flow)
- GitHub contribution graph
- Community likes counter (globally shared, persisted via Vercel KV/Upstash REST)
- Gainesville weather snapshot
- Projects, Skills marquee (2-row infinite scroll), and contact form
- Dark/light theming

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create `.env` in the project root.

Use `.env.example` as a base, then add:

```env
# Frontend
VITE_SPOTIFY_RECENT_ENDPOINT=/api/spotify/recently-played

# Spotify API (required for recently played endpoint)
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=

# Likes API (required for globally shared likes)
# Either UPSTASH_* OR KV_* works
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# OR (Vercel KV naming)
KV_REST_API_URL=
KV_REST_API_TOKEN=
```

### 3. Run development server

```bash
npm run dev
```

## Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint

## API Routes

### `GET /api/spotify/recently-played`

Returns:

```json
{
  "title": "Track name",
  "artist": "Artist name",
  "albumArtUrl": "https://...",
  "songUrl": "https://open.spotify.com/track/...",
  "playedAt": "5 minutes ago"
}
```

### `GET /api/likes`

Returns current global likes:

```json
{ "value": 42 }
```

### `POST /api/likes`

Increments and returns current global likes:

```json
{ "value": 43 }
```

## Spotify Setup (Refresh Token)

To enable recently played:

1. Create a Spotify app in Spotify Developer Dashboard.
2. Add a redirect URI (must match exactly).
3. Authorize with scope:
- `user-read-recently-played`
4. Exchange one-time auth `code` for tokens.
5. Save `refresh_token` as `SPOTIFY_REFRESH_TOKEN`.

Notes:
- `authorization_code` is one-time/short-lived.
- `refresh_token` is what this project uses long-term server-side.

## Vercel Deployment

1. Push repository to GitHub.
2. Import project into Vercel.
3. Add environment variables in Vercel Project Settings.
4. Ensure Vercel KV / Upstash storage is connected for likes.
5. Deploy.

Recommended verification after deploy:

- `/api/spotify/recently-played` returns JSON
- `/api/likes` returns JSON
- Clicking heart increments globally across devices

## Assets

Place static files in `public/`.

### Resume

- File: `public/resume.pdf`
- Used by Activity Hub "Download Resume" button

### Experience logos

Expected paths:

- `public/experience/florida-blue.png`
- `public/experience/uf-sase.png`
- `public/experience/courselynx.png`

## Project Structure

```txt
src/
  components/
    ActivityHubSection.tsx
    ExperienceSection.tsx
    ProjectsSection.tsx
    SkillsSection.tsx
    ContactSection.tsx
  App.tsx
api/
  spotify/recently-played.js
  likes.js
public/
  resume.pdf
  experience/...
```