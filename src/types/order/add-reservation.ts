import type { Trip } from "./trip";

export interface AddReservationRequest {
  trip: Trip;
  quantity: number;
}
