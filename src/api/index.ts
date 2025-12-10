import { HttpClient } from "./httpClient";
import { AuthService } from "./services/authService";
import { OrderService } from "./services/orderService";
import { StationService } from "./services/stationService";
import { TripService } from "./services/tripService";

export const tokenStorage = {
  get: () => localStorage.getItem("token"),
  set: (token: string) => localStorage.setItem("token", token),
  clear: () => localStorage.removeItem("token"),
};

export const userStorage = {
  getUserId: () => localStorage.getItem("userId"),
  setUserId: (userId: string) => localStorage.setItem("userId", userId),
  getName: () => localStorage.getItem("userName"),
  setName: (name: string) => localStorage.setItem("userName", name),
  clear: () => {
    localStorage.removeItem("userName"), localStorage.removeItem("userId");
  },
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
  baseUrl: "http://localhost:7000/",
  getToken: tokenStorage.get,
  onUnauthorized: handleUnauthorized,
});

export const authService = new AuthService(client);
export const stationService = new StationService(client);
export const tripService = new TripService(client);
export const orderService = new OrderService(client);
