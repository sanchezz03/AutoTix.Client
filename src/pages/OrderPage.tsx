import { useEffect, useState } from "react";
import { orderService } from "../api";
import { type Order } from "../types/order/order";
import OrderCard from "../components/order/OrderCard";

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await orderService.getUserOrders();
        setOrders(orders);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handlePay = async (orderId: string) => {
    try {
      await orderService.startPayment(orderId);
      alert("Оплата успішна!");
      const res = await orderService.getUserOrders();
      setOrders(res);
    } catch (err) {
      console.error(err);
      alert("Не вдалося оплатити замовлення");
    }
  };

  if (loading) return <div>Завантажується...</div>;
  if (!orders.length) return <div>Немає замовлень</div>;

  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-indigo-600">Корзина</h1>

      <div className="flex flex-col gap-4">
        {orders.map((order) =>
          order.reservations.map((reservation) => {
            return (
              <OrderCard
                key={reservation.id}
                reservation={reservation}
                status={order.status}
                onPay={() => handlePay(order.id)}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
