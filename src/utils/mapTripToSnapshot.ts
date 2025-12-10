import type { TripSnapshot } from "../types/order/tripSnapshot";
import type { TripSegment } from "../types/trip/tripSegment";

export function mapTripToSnapshot(trip: {
  stationFrom: string;
  stationTo: string;
  direct: TripSegment[];
}): TripSnapshot {
  const segment = trip.direct[0];
  const wagon = segment.train.wagonClasses[0];

  return {
    stationFrom: segment.stationFrom,
    stationTo: segment.stationTo,
    departAt: segment.departAt,
    arriveAt: segment.arriveAt,
    wagonName: wagon.name,
    price: wagon.price,
  };
}
