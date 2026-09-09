import { Image } from "../models/GlobalModels";
import { Playlist } from "../components/cards/Playlist/PlaylistModel";
export interface Auth {
  accessToken?: string;
  refreshToken?: string;
}
export interface User {
  country?: string;
  display_name?: string;
  email?: string;
  explicit_content?: any;
  external_urls?: any;
  followers?: any;
  href?: string;
  id?: string;
  images?: Image[];
  product?: string;
  type?: string;
  uri?: string;
  playlists?: Playlist[];
}
