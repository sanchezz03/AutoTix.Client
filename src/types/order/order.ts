import type { Reservation } from "./reservation";

export interface Order {
  id: string;
  userId: number;
  totalAmount: number;
  status: number;
  reservations: Reservation[];
}

export const OrderStatus = {
  New: "New",
  Processing: "Processing",
  Paid: "Paid",
  Failed: "Failed",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
