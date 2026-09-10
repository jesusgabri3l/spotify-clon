import axios, { AxiosResponse } from "axios";
import querystring from "query-string";
import { TokenBody, RefreshTokenBody } from "./AuthModels";
import { UserStore } from "../store/UserStore";
import { generateCodeChallenge, generateRandomToken } from "../utils/pkce";

const AuthURL: string = import.meta.env.VITE_AUTH_SPOTIFY_URI;

const clientID: string = import.meta.env.VITE_CLIENT_ID;
const scope: string =
  "user-read-private user-read-email user-library-read user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative";
const redirectURI: string = import.meta.env.VITE_REDIRECT_URI;
const CODE_VERIFIER_KEY = "pkce_code_verifier";

export const api = axios.create({
  baseURL: AuthURL,
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // Must re-reject: swallowing this made a failed token refresh resolve
    // with `undefined` instead of rejecting, so callers (api.ts) couldn't
    // tell a refresh had failed and log the user out.
    return Promise.reject(error);
  },
);

export default {
  async sendRequestToAuth(): Promise<void> {
    const state: string = generateRandomToken();
    const codeVerifier = generateRandomToken();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    sessionStorage.setItem(CODE_VERIFIER_KEY, codeVerifier);
    window.location.replace(
      AuthURL +
        "authorize?" +
        querystring.stringify({
          response_type: "code",
          client_id: clientID,
          scope,
          redirect_uri: redirectURI,
          state,
          code_challenge_method: "S256",
          code_challenge: codeChallenge,
        }),
    );
  },
  getToken(code: string): Promise<AxiosResponse> {
    const codeVerifier = sessionStorage.getItem(CODE_VERIFIER_KEY) ?? "";
    sessionStorage.removeItem(CODE_VERIFIER_KEY);
    const body: TokenBody = {
      code,
      redirect_uri: redirectURI,
      grant_type: "authorization_code",
      client_id: clientID,
      code_verifier: codeVerifier,
    };
    return api.post("api/token", querystring.stringify(body), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  },
  refreshToken(): Promise<AxiosResponse> {
    const body: RefreshTokenBody = {
      refresh_token: UserStore.getRefreshToken(),
      grant_type: "refresh_token",
      client_id: clientID,
    };
    return api.post("api/token", querystring.stringify(body), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  },
};
