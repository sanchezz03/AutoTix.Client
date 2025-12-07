import type { Details } from "./detail";

export interface Service {
  id: string;
  title: string;
  details: Details;
  price: number;
  selectType: string;
  selectUnitsMax?: any;
  selectedByDefault: boolean;
}
