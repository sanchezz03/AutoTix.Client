import { HttpClient } from "./httpClient";
import { AuthService } from "./services/authService";

export const tokenStorage = {
  get: () => localStorage.getItem("token"),
  set: (token: string) => localStorage.setItem("token", token),
  clear: () => localStorage.removeItem("token"),
};

export const userStorage = {
  getName: () => localStorage.getItem("userName"),
  setName: (name: string) => localStorage.setItem("userName", name),
  clear: () => localStorage.removeItem("userName"),
};

export const clearAuth = () => {
  tokenStorage.clear();
  userStorage.clear();
};

export const client = new HttpClient({
  baseUrl: "https://localhost:7046",
  getToken: tokenStorage.get,
  onUnauthorized: () => {
    tokenStorage.clear();
    window.location.href = "/login";
  },
});

export const authService = new AuthService(client);
