// Shared copy for every "this needs a real login" tooltip in the nav.
// Spotify's Development Mode caps this app at 5 approved test accounts
// (see https://developer.spotify.com/documentation/web-api/concepts/quota-modes),
// so personal-data features are unavailable to everyone else. Written in
// plain language on purpose, not "Development Mode" API jargon - the point
// is a visitor immediately understands they personally can't log in here.
export const RESTRICTED_TOOLTIP =
  "You won't be able to log in here - Spotify only allows a handful of approved accounts on this app, so no other visitor can sign in or see their own playlists and library right now.";
