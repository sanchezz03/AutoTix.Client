import type { Privilege } from "./privilege";
import type { Service } from "./service";

export interface Wagon {
  id: string;
  number: string;
  mockupName: string;
  seats: number[];
  freeSeatsTop: number;
  freeSeatsLower: number;
  price: number;
  airConditioner: boolean;
  services: Service[];
  privileges: Privilege[];
}
