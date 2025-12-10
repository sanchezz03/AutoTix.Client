import { userStorage } from "..";
import type { Order } from "../../types/order/order";
import type { HttpClient } from "../httpClient";

export class OrderService {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  addToCart(trip: any, quantity: number = 1): Promise<{ orderId: string }> {
    const userId = userStorage.getUserId();
    return this.client.post<{ orderId: string }>(
      `orders/api/order/add-to-cart`,
      {
        userId,
        trip,
        quantity,
      }
    );
  }

  startPayment(orderId: string): Promise<{ message: string }> {
    return this.client.post<{ message: string }>(
      `orders/api/order/${orderId}/pay`,
      {}
    );
  }

  getOrder(orderId: string): Promise<Order> {
    return this.client.get<Order>(`orders/api/order/${orderId}`);
  }

  getUserOrders(): Promise<Order[]> {
    const userId = userStorage.getUserId();
    return this.client.get<Order[]>(`orders/api/order/user?userId=${userId}`);
  }
}
