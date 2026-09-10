// Fetches a Client Credentials access token from our own /api/token
// (Vercel serverless function) for anonymous, catalog-only browsing.
// Cached in memory for the tab's lifetime; re-fetched once it's about to
// expire (the function itself also caches server-side, so this mostly just
// avoids one extra network round trip per request).

let cachedToken: { accessToken: string; expiresAt: number } | null = null;

export async function getPublicAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.accessToken;
  }
  const response = await fetch("/api/token");
  if (!response.ok) throw new Error("Failed to get a public access token");
  const data = await response.json();
  // No expires_in is returned here (kept server-side); refresh reasonably
  // often rather than trying to mirror the server's own cache lifetime.
  cachedToken = {
    accessToken: data.access_token,
    expiresAt: Date.now() + 5 * 60 * 1000,
  };
  return cachedToken.accessToken;
}
