interface ITripTravelLineProps {
  durationMinutes: number;
}

export default function TripTravelLine({
  durationMinutes,
}: ITripTravelLineProps) {
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  const travelTime = `${hours}ч ${minutes}м`;

  return (
    <div className="flex flex-col items-center flex-1 mx-4">
      <div className="w-full h-px bg-gray-300 relative my-2">
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-50 px-2 text-gray-600 text-sm">
          {travelTime}
        </span>
      </div>
    </div>
  );
}
