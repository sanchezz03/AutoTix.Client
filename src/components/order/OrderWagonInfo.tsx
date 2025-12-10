import type { OrderStatus } from "../../types/order/order";
import { formatPrice } from "../../utils/price";

interface IOrderWagonInfoProps {
  name: string;
  price: number;
  status: OrderStatus | number;
}

export default function OrderWagonInfo({
  name,
  price,
  status,
}: IOrderWagonInfoProps) {
  const getStatusLabel = (status: OrderStatus | number) => {
    switch (status) {
      case 0:
      case "New":
        return { text: "Новий", color: "bg-blue-200 text-blue-800" };
      case 1:
      case "Processing":
        return { text: "В обробці", color: "bg-yellow-200 text-yellow-800" };
      case 2:
      case "Paid":
        return { text: "Оплачено", color: "bg-green-200 text-green-800" };
      case 3:
      case "Failed":
        return {
          text: "Не вдалося оплатити",
          color: "bg-red-200 text-red-800",
        };
      default:
        return { text: "Невідомо", color: "bg-gray-200 text-gray-800" };
    }
  };

  const statusLabel = getStatusLabel(status);

  return (
    <div className="flex flex-col justify-center items-center bg-indigo-50">
      <span
        className={`px-2 py-1 rounded-full text-sm font-semibold mb-2 ${statusLabel.color}`}
      >
        {statusLabel.text}
      </span>
      <span className="text-gray-600 font-semibold">{name}</span>
      <span className="text-green-600 font-semibold">{formatPrice(price)}</span>
    </div>
  );
}
