import { Route } from "lucide-react";
import type { Station } from "../../types/station/station";
import { useEffect, useState } from "react";

interface IStationHeaderProps {
  station: Station;
  onChange: () => void;
}

export default function StationHeader({
  station,
  onChange,
}: IStationHeaderProps) {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="!bg-indigo-50 rounded-xl shadow p-5 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-4">
        <Route className="w-10 h-10 text-indigo-600" />
        <span className="font-bold text-xl text-gray-800">{station.name}</span>
        <button
          onClick={onChange}
          className="px-4 py-1 !bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Змінити
        </button>
      </div>
      <div className="text-indigo-500 font-bold text-3xl">{currentTime}</div>
    </div>
  );
}
