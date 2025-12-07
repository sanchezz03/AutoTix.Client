import { MapPin } from "lucide-react";
import type { TripSegment } from "../../types/trip/tripSegment";
import TripStationTimeBlock from "./TripStationTimeBlock";
import TripBuyButton from "./TripBuyButton";
import TripWagonInfo from "./TripWagonInfo";
import TripTravelLine from "./TripTravelLine";

interface ITripCardProps {
  segment: TripSegment;
}

export default function TripCard({ segment }: ITripCardProps) {
  const departDate = new Date(segment.departAt * 1000);
  const arriveDate = new Date(segment.arriveAt * 1000);
  const durationMinutes = Math.floor(
    (arriveDate.getTime() - departDate.getTime()) / 60000
  );

  const firstWagon = segment.train.wagonClasses[0];

  return (
    <div className="rounded-xl p-4 bg-indigo-50 shadow flex justify-between gap-4">
      <div className="flex flex-col gap-3 flex-1">
        <span className="text-indigo-500 font-bold text-lg">
          {segment.train.number}
        </span>

        <div className="flex items-center justify-between">
          <TripStationTimeBlock
            station={segment.stationFrom}
            timestamp={segment.departAt}
          />
          <TripTravelLine durationMinutes={durationMinutes} />
          <TripStationTimeBlock
            station={segment.stationTo}
            timestamp={segment.arriveAt}
          />
        </div>

        <div className="flex items-center gap-1 text-gray-500 text-sm mt-2">
          <MapPin size={16} />
          <span>
            {segment.stationFrom} → {segment.stationTo}
          </span>
        </div>
      </div>

      <div className="w-px bg-gray-300 mx-4"></div>

      <TripWagonInfo
        name={firstWagon.name}
        freeSeats={firstWagon.freeSeats}
        price={firstWagon.price}
      />

      <div className="w-px bg-gray-300 mx-4"></div>

      <TripBuyButton />
    </div>
  );
}
