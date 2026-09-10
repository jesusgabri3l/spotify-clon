// Client Credentials flow: lets anonymous visitors browse the public catalog
// (search, artist, album, playlist) without logging in, so the app isn't
// gated behind Spotify's Development Mode 5-user whitelist for every visitor.
// This has to run server-side because it requires SPOTIFY_CLIENT_SECRET,
// which must never reach the browser bundle - unlike the PKCE flow the
// logged-in user path uses, Client Credentials has no per-request secret.

let cachedToken: { accessToken: string; expiresAt: number } | null = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Vercel injects res.status()/res.json() at runtime; typing this properly needs @vercel/node, which isn't worth the extra dependency for one small function.
export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now) {
    res.status(200).json({ access_token: cachedToken.accessToken });
    return;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    res.status(500).json({ error: 'Server is missing Spotify credentials' });
    return;
  }

  const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString(
    'base64',
  );
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${authHeader}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    res.status(response.status).json({ error: 'Failed to get Spotify token' });
    return;
  }

  const data = await response.json();
  // Refresh a bit early (60s) rather than exactly at expiry.
  cachedToken = {
    accessToken: data.access_token,
    expiresAt: now + (data.expires_in - 60) * 1000,
  };
  res.status(200).json({ access_token: data.access_token });
}
