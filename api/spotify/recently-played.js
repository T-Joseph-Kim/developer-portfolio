/* global process, Buffer */

const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_RECENT_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

function getRequiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function toRelativePlayedAt(isoDate) {
  const playedDate = new Date(isoDate);
  const diffMs = playedDate.getTime() - Date.now();
  const diffMins = Math.round(diffMs / 60000);
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (Math.abs(diffMins) < 60) return rtf.format(diffMins, 'minute');
  const diffHours = Math.round(diffMins / 60);
  if (Math.abs(diffHours) < 24) return rtf.format(diffHours, 'hour');
  const diffDays = Math.round(diffHours / 24);
  return rtf.format(diffDays, 'day');
}

async function getAccessToken() {
  const clientId = getRequiredEnv('SPOTIFY_CLIENT_ID');
  const clientSecret = getRequiredEnv('SPOTIFY_CLIENT_SECRET');
  const refreshToken = getRequiredEnv('SPOTIFY_REFRESH_TOKEN');

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${basicAuth}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Spotify token request failed (${response.status}): ${errText}`);
  }

  const data = await response.json();
  if (!data.access_token) {
    throw new Error('Spotify token response missing access_token');
  }
  return data.access_token;
}

function mapRecentTrack(payload) {
  const item = payload?.items?.[0];
  if (!item?.track) {
    return null;
  }

  const track = item.track;
  const artists = Array.isArray(track.artists) ? track.artists.map((a) => a.name).join(', ') : 'Unknown Artist';
  const albumImage = Array.isArray(track.album?.images) && track.album.images.length > 0 ? track.album.images[0].url : '';

  return {
    title: track.name || 'Unknown Title',
    artist: artists,
    albumArtUrl: albumImage,
    songUrl: track.external_urls?.spotify || '',
    playedAt: item.played_at ? toRelativePlayedAt(item.played_at) : 'Recently',
  };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const accessToken = await getAccessToken();
    const recentResponse = await fetch(SPOTIFY_RECENT_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!recentResponse.ok) {
      const errText = await recentResponse.text();
      throw new Error(`Spotify recent request failed (${recentResponse.status}): ${errText}`);
    }

    const recentPayload = await recentResponse.json();
    const mappedTrack = mapRecentTrack(recentPayload);

    if (!mappedTrack) {
      return res.status(404).json({ error: 'No recently played track found' });
    }

    return res.status(200).json(mappedTrack);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ error: message });
  }
}
