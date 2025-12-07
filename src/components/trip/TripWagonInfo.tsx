import { formatPrice } from "../../utils/price";

interface ITripWagonInfoProps {
  name: string;
  freeSeats: number;
  price: number;
}

export default function TripWagonInfo({
  name,
  freeSeats,
  price,
}: ITripWagonInfoProps) {
  return (
    <div className="flex flex-col justify-center items-center">
      <span className="text-gray-600 font-semibold">{name}</span>
      <span className="text-gray-500 font-semibold">{freeSeats} місць</span>
      <span className="text-green-600 font-semibold">{formatPrice(price)}</span>
    </div>
  );
}
