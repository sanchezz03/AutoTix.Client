import { format } from "date-fns";

interface ITripStationTimeBlockProps {
  station: string;
  timestamp: number;
}

export default function TripStationTimeBlock({
  station,
  timestamp,
}: ITripStationTimeBlockProps) {
  const date = new Date(timestamp * 1000);

  return (
    <div className="flex flex-col items-center">
      <span className="text-lg font-semibold">{format(date, "HH:mm")}</span>
      <span className="text-sm">{format(date, "dd MMM")}</span>
      <span className="text-gray-600 font-semibold">{station}</span>
    </div>
  );
}
