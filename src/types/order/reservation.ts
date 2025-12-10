import type { Trip } from "./trip";

export interface Reservation {
  id: string;
  quantity: number;
  trip: Trip;
}
