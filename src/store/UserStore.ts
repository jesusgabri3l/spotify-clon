import { makeObservable, observable, action } from "mobx";
import { Auth, User } from "./UserStoreModels";
const accessToken: string = localStorage.getItem("accessToken") || "";
const refreshToken: string = localStorage.getItem("refreshToken") || "";

export class UserStoreImpl {
  auth: Auth = {};
  user: User = {};

  constructor(auth: Auth, user: User) {
    makeObservable(this, {
      auth: observable,
      user: observable,
      setAuth: action,
      setUser: action,
      Logout: action,
    });
    this.auth = auth;
    this.user = user;
  }

  setAuth(authResponse: Auth): void {
    this.auth = authResponse;
    localStorage.setItem("accessToken", authResponse.accessToken as string);
    localStorage.setItem("refreshToken", authResponse.refreshToken as string);
  }

  setUser(userResponse: User): void {
    this.user = userResponse;
  }

  Logout(): void {
    this.user = {};
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  getUserCountry(): string {
    return this.user.country!;
  }

  getAccessToken(): string {
    return this.auth.accessToken!;
  }

  getRefreshToken(): string {
    return this.auth.refreshToken!;
  }
}

export const UserStore = new UserStoreImpl({ accessToken, refreshToken }, {});
