import { MapPin } from "lucide-react";
import TripTravelLine from "../trip/TripTravelLine";
import TripStationTimeBlock from "../trip/TripStationTimeBlock";
import type { Reservation } from "../../types/order/reservation";
import OrderWagonInfo from "./OrderWagonInfo";
import OrderPayButton from "./OrderPayButton";

interface IOrderCardProps {
  reservation: Reservation;
  onPay?: () => void;
  status: number;
}

export default function OrderCard({
  reservation,
  onPay,
  status,
}: IOrderCardProps) {
  const { trip, quantity } = reservation;
  const departDate = new Date(trip.departAt * 1000);
  const arriveDate = new Date(trip.arriveAt * 1000);
  const durationMinutes = Math.floor(
    (arriveDate.getTime() - departDate.getTime()) / 60000
  );

  return (
    <div className="rounded-xl p-4 bg-indigo-50 shadow flex justify-between gap-4">
      <div className="flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between">
          <TripStationTimeBlock
            station={trip.stationFrom}
            timestamp={trip.departAt}
          />
          <TripTravelLine durationMinutes={durationMinutes} />
          <TripStationTimeBlock
            station={trip.stationTo}
            timestamp={trip.arriveAt}
          />
        </div>

        <div className="flex items-center gap-1 text-gray-500 text-sm mt-2">
          <MapPin size={16} />
          <span>
            {trip.stationFrom} → {trip.stationTo}
          </span>
        </div>

        <div className="text-gray-700 font-semibold mt-1">
          Кількість квитків: {quantity}
        </div>
      </div>
      <div className="w-px bg-gray-300 mx-4"></div>
      <OrderWagonInfo
        name={trip.wagonName}
        price={trip.price}
        status={status}
      />
      {status !== 2 && (
        <>
          <div className="w-px bg-gray-300 mx-4"></div>
          {onPay && <OrderPayButton onClick={onPay} disabled={status === 1} />}
        </>
      )}
    </div>
  );
}
