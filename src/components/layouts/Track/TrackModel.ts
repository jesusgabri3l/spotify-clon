import { Artist } from "../../cards/Artist/ArtistModel";
export interface Track {
  album?: any;
  artists: Artist[];
  available_markets?: string[];
  disc_number?: number;
  duration_ms?: number;
  explicit?: boolean;
  external_ids?: any;
  external_urls?: any;
  href?: string;
  id?: string;
  is_local?: boolean;
  name?: string;
  popularity?: number;
  preview_url?: string;
  track_number?: number;
  type?: string;
  uri?: string;
}
export interface Props {
  index?: number;
  track: Track;
  showArtist?: boolean;
  showAlbum?: boolean;
  showImage?: boolean;
}
