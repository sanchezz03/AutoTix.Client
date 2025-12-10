import type { DepartureDate } from "../../types/trip/departureDate";
import type { Direct } from "../../types/trip/direct";
import type { Trip } from "../../types/trip/trip";
import type { HttpClient } from "../httpClient";

export class TripService {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  getTripById(tripId: number): Promise<Direct> {
    return this.client.get<Direct>(`/api/trip/${tripId}`);
  }

  getTrip(
    stationFromId: number,
    stationToId: number,
    date: string,
    withTransfers = false
  ): Promise<Trip> {
    const params = new URLSearchParams({
      stationFromId: stationFromId.toString(),
      stationToId: stationToId.toString(),
      date,
      withTransfers: withTransfers.toString(),
    });

    return this.client.get<Trip>(`trips/api/trip?${params.toString()}`);
  }

  getDepartureDates(
    stationFromId: number,
    stationToId: number
  ): Promise<DepartureDate> {
    const params = new URLSearchParams({
      stationFromId: stationFromId.toString(),
      stationToId: stationToId.toString(),
    });

    return this.client.get<DepartureDate>(
      `trips/api/trip/departure-dates?${params.toString()}`
    );
  }
}
