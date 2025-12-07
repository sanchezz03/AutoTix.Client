import type { Wagon } from "./wagon";
import type { WagonMonitoring } from "./wagonMonitoring";

export interface WagonByClass {
  wagons: Wagon[];
  monitoring: WagonMonitoring;
  trainDirection?: any;
}
