import { UserStoreImpl } from "../store/UserStore";

export interface Image {
  height?: number;
  url?: string;
  width?: number;
}
export interface PropsObserver {
  UserStore: UserStoreImpl;
  index?: number;
}
