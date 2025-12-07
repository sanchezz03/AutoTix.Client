import type { WagonClass } from "./wagonClass";

export interface Train {
  id: number;
  stationFrom: string;
  stationTo: string;
  number: string;
  type: number;
  wagonClasses: WagonClass[];
  infoPopup?: any;
  info?: any;
}
