import axios, { AxiosResponse } from "axios";
import { UserStore } from "../store/UserStore";
import auth from "./auth";

const apiURL: string = import.meta.env.VITE_AUTH_SPOTIFY_API as string;

function getHeaders() {
  return {
    Authorization: "Bearer " + UserStore.getAccessToken(),
    "Content-Type": "application/json",
  };
}

export const api = axios.create({
  baseURL: apiURL,
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error) {
      const originalRequest = error.config;
      if (
        error.response.status === 401 &&
        UserStore.getRefreshToken() &&
        error.response.data.error.message === "The access token expired"
      ) {
        const { data } = await auth.refreshToken();
        UserStore.setAuth({
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
        });
        const accessToken = getHeaders();
        originalRequest.headers.Authorization = accessToken.Authorization;
        return api(originalRequest);
      } else {
        return Promise.reject(error);
      }
    }
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
  getArtistInfo(id: string, endpoint = ""): Promise<AxiosResponse> {
    return api.get(`artists/${id}${endpoint}`, { headers: getHeaders() });
  },
  getArtistTopTracks(id: string): Promise<AxiosResponse> {
    return api.get(
      `artists/${id}/top-tracks/?market=${UserStore.getUserCountry()}`,
      { headers: getHeaders() },
    );
  },
  getAlbumInfo(id: string): Promise<AxiosResponse> {
    return api.get(`albums/${id}`, { headers: getHeaders() });
  },
  getPlaylistInfo(id: string, endpoint = "/"): Promise<AxiosResponse> {
    return api.get(`playlists/${id}${endpoint}`, { headers: getHeaders() });
  },
  getSearchInfo(q: string): Promise<AxiosResponse> {
    return api.get(
      `search/?q=${q}&type=artist,album,playlist&limit=8&market=${UserStore.getUserCountry()}`,
      { headers: getHeaders() },
    );
  },
  getSearchInfoTracks(q: string): Promise<AxiosResponse> {
    return api.get(
      `search/?q=${q}&type=track&limit=5&market=${UserStore.getUserCountry()}`,
      { headers: getHeaders() },
    );
  },
};
