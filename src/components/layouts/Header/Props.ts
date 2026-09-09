import { Image } from "../../../models/GlobalModels";

interface User {
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
  following?: boolean;
}
export interface Props {
  user: User;
  type?: string;
  actions?: any;
}
