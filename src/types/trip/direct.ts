import type { Monitoring } from "./monitoring";
import type { Station } from "./station";
import type { Train } from "./train";

export interface Direct {
  id: number;
  depart_at: number;
  arrive_at: number;
  station_from: Station;
  station_to: Station;
  stations_time_offset: number;
  train: Train;
  discount?: any;
  custom_tag?: any;
  monitoring: Monitoring;
  is_departed: boolean;
}
