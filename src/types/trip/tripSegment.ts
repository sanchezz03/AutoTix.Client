import type { Monitoring } from "./monitoring";
import type { Train } from "./train";

export interface TripSegment {
  id: number;
  departAt: number;
  arriveAt: number;
  stationFrom: string;
  stationTo: string;
  stationsTimeOffset: number;
  train: Train;
  discount?: any;
  customTag?: any;
  monitoring: Monitoring;
  isDeparted: boolean;
}
