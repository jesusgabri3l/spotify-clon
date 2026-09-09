import { Image } from "../../../models/GlobalModels";

export interface Playlist {
  collaborative?: boolean;
  description?: string;
  external_urls?: any;
  href?: string;
  id?: string;
  images?: Image[];
  name?: string;
  owner?: any;
  primary_color?: string;
  public?: boolean;
  snapshot_id?: string;
  tracks?: any[];
  type?: string;
  uri?: string;
}
