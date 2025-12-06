export interface Arrival {
  train: string;
  route: string;
  time: number;
  platform: string | null;
  delayMinutes: number | null;
}
