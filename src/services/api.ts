import axios, { AxiosResponse } from "axios";
import { UserStore } from "../store/UserStore";
import auth from "./auth";
import { getPublicAccessToken } from "./publicAuth";

const apiURL: string = import.meta.env.VITE_AUTH_SPOTIFY_API as string;

function getHeaders() {
  return {
    Authorization: "Bearer " + UserStore.getAccessToken(),
    "Content-Type": "application/json",
  };
}

// Catalog endpoints (search, artist, album, playlist) work for anonymous
// visitors too: use the logged-in user's token when there is one (no extra
// round trip), otherwise fall back to the Client Credentials token from our
// own /api/token function. "me/*" endpoints always require a real login and
// keep using getHeaders() directly.
async function getPublicHeaders() {
  const token = UserStore.getAccessToken() || (await getPublicAccessToken());
  return {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };
}

function getMarket(): string {
  return UserStore.user.country || "US";
}

export const api = axios.create({
  baseURL: apiURL,
});

function logoutAndReload(): void {
  UserStore.Logout();
  location.reload();
}

api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response?.status === 401) {
      // Anonymous (Client Credentials) requests have no refresh token and
      // nothing to log out of - just surface the error as-is.
      if (!UserStore.getAccessToken()) {
        return Promise.reject(error);
      }
      if (originalRequest._retried) {
        // Refresh "succeeded" but Spotify still 401s the retried request -
        // treat it the same as a failed refresh rather than 401ing forever.
        logoutAndReload();
        return Promise.reject(error);
      }
      if (!UserStore.getRefreshToken()) {
        logoutAndReload();
        return Promise.reject(error);
      }
      originalRequest._retried = true;
      try {
        const { data } = await auth.refreshToken();
        UserStore.setAuth({
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
        });
        originalRequest.headers.Authorization = "Bearer " + data.access_token;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token expired/revoked (e.g. after long inactivity) - every
        // request would otherwise keep 401ing forever with no way out.
        logoutAndReload();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default {
  URL,
  getCurrentUserInfo(endpoint = ""): Promise<AxiosResponse> {
    return api.get("me" + endpoint, { headers: getHeaders() });
  },
  putCurrentUserInfo(endpoint = ""): Promise<AxiosResponse> {
    return api.put("me" + endpoint, {}, { headers: getHeaders() });
  },
  deleteCurrentUserInfo(endpoint = ""): Promise<AxiosResponse> {
    return api.delete("me" + endpoint, { headers: getHeaders() });
  },
  async getArtistInfo(id: string, endpoint = ""): Promise<AxiosResponse> {
    return api.get(`artists/${id}${endpoint}`, {
      headers: await getPublicHeaders(),
    });
  },
  // Spotify removed GET /artists/{id}/top-tracks with no replacement, so this
  // approximates it via Search's own relevance ranking (popularity is no
  // longer returned on track objects, so results can't be re-sorted by it).
  async getArtistTopTracksApprox(artistName: string): Promise<AxiosResponse> {
    return api.get(
      `search/?q=${encodeURIComponent(`artist:"${artistName}"`)}&type=track&limit=10&market=${getMarket()}`,
      { headers: await getPublicHeaders() },
    );
  },
  async getAlbumInfo(id: string): Promise<AxiosResponse> {
    return api.get(`albums/${id}`, { headers: await getPublicHeaders() });
  },
  async getPlaylistInfo(id: string, endpoint = "/"): Promise<AxiosResponse> {
    return api.get(`playlists/${id}${endpoint}`, {
      headers: await getPublicHeaders(),
    });
  },
  // The playlist object no longer embeds its track list; it has to be
  // fetched separately (renamed from /tracks to /items). Spotify also
  // restricts this to playlists the current user owns for non-extended
  // apps, returning 403 for other users' playlists (and, anonymously, for
  // every playlist - there's no "owner" at all under Client Credentials).
  async getPlaylistItems(id: string, limit = 50): Promise<AxiosResponse> {
    return api.get(`playlists/${id}/items?limit=${limit}`, {
      headers: await getPublicHeaders(),
    });
  },
  async getSearchInfo(q: string): Promise<AxiosResponse> {
    return api.get(
      `search/?q=${q}&type=artist,album,playlist&limit=8&market=${getMarket()}`,
      { headers: await getPublicHeaders() },
    );
  },
  async getSearchInfoTracks(q: string): Promise<AxiosResponse> {
    return api.get(`search/?q=${q}&type=track&limit=5&market=${getMarket()}`, {
      headers: await getPublicHeaders(),
    });
  },
};
