// Shared copy for every "this needs a real login" tooltip in the nav.
// Spotify's Development Mode caps this app at 5 approved test accounts
// (see https://developer.spotify.com/documentation/web-api/concepts/quota-modes),
// so personal-data features are unavailable to everyone else.
export const RESTRICTED_TOOLTIP =
  "Restricted: Spotify limits this app to a handful of approved test accounts (Development Mode), so personal library features aren't available to other visitors.";
