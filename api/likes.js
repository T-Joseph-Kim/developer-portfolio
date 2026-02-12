/* global process */

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const KEY = 'activity_hub_likes';

function assertEnv() {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) {
    throw new Error('Missing REST URL/TOKEN env vars. Expected UPSTASH_REDIS_REST_* or KV_REST_API_*');
  }
}

async function upstash(command) {
  assertEnv();
  const response = await fetch(`${UPSTASH_URL}/${command.join('/')}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Upstash error (${response.status}): ${text}`);
  }

  const data = await response.json();
  if (data.error) {
    throw new Error(`Upstash command error: ${data.error}`);
  }
  return data.result;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (req.method === 'GET') {
      const result = await upstash(['GET', KEY]);
      const value = Number(result ?? 0);
      return res.status(200).json({ value });
    }

    const result = await upstash(['INCR', KEY]);
    const value = Number(result ?? 0);
    return res.status(200).json({ value });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ error: message });
  }
}
