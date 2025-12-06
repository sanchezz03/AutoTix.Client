import { HttpClient } from "./httpClient";
import { AuthService } from "./services/authService";
import { StationService } from "./services/stationService";

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

const handleUnauthorized = () => {
  clearAuth();
  window.location.href = "/login";
};

export const client = new HttpClient({
  baseUrl: "https://localhost:7046",
  getToken: tokenStorage.get,
  onUnauthorized: handleUnauthorized,
});

export const stationsClient = new HttpClient({
  baseUrl: "https://localhost:7134",
  getToken: tokenStorage.get,
  onUnauthorized: handleUnauthorized,
});

export const authService = new AuthService(client);
export const stationService = new StationService(stationsClient);
