import type { Arrival } from "./arrival";
import type { Departure } from "./departure";
import type { Station } from "./station";

export interface StationBoard {
  station: Station;
  arrivals: Arrival[];
  departures: Departure[];
  peron: boolean;
}
