import type { Station } from "../../types/station/station";
import type { StationBoard } from "../../types/station/stationBoard";
import type { HttpClient } from "../httpClient";

export class StationService {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  getStations(): Promise<Station[]> {
    return this.client.get<Station[]>("/api/station");
  }

  getStationBoards(): Promise<Station[]> {
    return this.client.get<Station[]>("/api/station/boards");
  }

  getStationBoard(stationId: number): Promise<StationBoard> {
    return this.client.get<StationBoard>(`/api/station/boards/${stationId}`);
  }
}
