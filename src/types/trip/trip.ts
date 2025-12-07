import type { TripSegment } from "./tripSegment";

export interface Trip {
  stationFrom: string;
  stationTo: string;
  direct: TripSegment[];
  withTransfer?: any;
  monitoring?: any;
}
