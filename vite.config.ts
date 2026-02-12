import { defineConfig } from 'vite'
import { loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function spotifyDevApiPlugin(env: Record<string, string>) {
  return {
    name: 'spotify-dev-api',
    configureServer(server: { middlewares: { use: (path: string, fn: (req: { method?: string }, res: { setHeader: (name: string, value: string) => void; statusCode: number; end: (body?: string) => void }) => Promise<void>) => void } }) {
      server.middlewares.use('/api/spotify/recently-played', async (req, res) => {
        if (req.method && req.method !== 'GET' && req.method !== 'OPTIONS') {
          res.statusCode = 405
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        if (req.method === 'OPTIONS') {
          res.statusCode = 200
          res.end()
          return
        }

        const clientId = env.SPOTIFY_CLIENT_ID
        const clientSecret = env.SPOTIFY_CLIENT_SECRET
        const refreshToken = env.SPOTIFY_REFRESH_TOKEN

        if (!clientId || !clientSecret || !refreshToken) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: 'Missing Spotify env vars in .env' }))
          return
        }

        try {
          const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
            },
            body: new URLSearchParams({
              grant_type: 'refresh_token',
              refresh_token: refreshToken,
            }),
          })

          if (!tokenRes.ok) {
            const errorText = await tokenRes.text()
            res.statusCode = 500
            res.end(JSON.stringify({ error: `Spotify token error: ${errorText}` }))
            return
          }

          const tokenData = (await tokenRes.json()) as { access_token?: string }
          if (!tokenData.access_token) {
            res.statusCode = 500
            res.end(JSON.stringify({ error: 'Spotify token response missing access_token' }))
            return
          }

          const recentRes = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
            headers: { Authorization: `Bearer ${tokenData.access_token}` },
          })

          if (!recentRes.ok) {
            const errorText = await recentRes.text()
            res.statusCode = 500
            res.end(JSON.stringify({ error: `Spotify recently-played error: ${errorText}` }))
            return
          }

          const recentData = (await recentRes.json()) as {
            items?: Array<{
              played_at?: string
              track?: {
                name?: string
                artists?: Array<{ name?: string }>
                album?: { images?: Array<{ url?: string }> }
                external_urls?: { spotify?: string }
              }
            }>
          }

          const item = recentData.items?.[0]
          if (!item?.track) {
            res.statusCode = 404
            res.end(JSON.stringify({ error: 'No recently played track found' }))
            return
          }

          const playedAt = item.played_at ? new Date(item.played_at) : null
          const diffMins = playedAt ? Math.round((playedAt.getTime() - Date.now()) / 60000) : 0
          const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
          const playedAtText = Math.abs(diffMins) < 60 ? rtf.format(diffMins, 'minute') : rtf.format(Math.round(diffMins / 60), 'hour')

          const payload = {
            title: item.track.name ?? 'Unknown Title',
            artist: item.track.artists?.map((artist) => artist.name).filter(Boolean).join(', ') || 'Unknown Artist',
            albumArtUrl: item.track.album?.images?.[0]?.url ?? '',
            songUrl: item.track.external_urls?.spotify ?? '',
            playedAt: playedAtText,
          }

          res.setHeader('Content-Type', 'application/json')
          res.statusCode = 200
          res.end(JSON.stringify(payload))
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unknown error'
          res.statusCode = 500
          res.end(JSON.stringify({ error: message }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss(), spotifyDevApiPlugin(env)],
  }
})
