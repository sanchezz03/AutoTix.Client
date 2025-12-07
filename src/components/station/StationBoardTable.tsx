import { LogIn, LogOut } from "lucide-react";
import type { Departure } from "../../types/station/departure";
import type { Arrival } from "../../types/station/arrival";

interface IStationBoardTableProps {
  title: string;
  trains: Array<Arrival | Departure>;
}

export default function StationBoardTable({
  title,
  trains,
}: IStationBoardTableProps) {
  const Icon = title === "Прибуття" ? LogIn : LogOut;

  return (
    <div className="!bg-indigo-50 rounded-xl shadow p-5 flex-1">
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-6 h-6 text-indigo-500" />
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      </div>

      <div className="grid grid-cols-[50px_1fr_40px_80px] gap-4 px-3 text-sm font-medium text-gray-500 mb-3">
        <div>Потяг</div>
        <div>Сполучення</div>
        <div className="text-center">Час</div>
        <div className="text-center">Колія</div>
      </div>

      <ul className="overflow-y-auto max-h-[455px] space-y-2">
        {trains.map((train) => {
          const trainTime = new Date(train.time * 1000);
          const formattedTime = `${trainTime
            .getHours()
            .toString()
            .padStart(2, "0")}:${trainTime
            .getMinutes()
            .toString()
            .padStart(2, "0")}`;

          return (
            <li
              key={train.train + train.time}
              className="grid grid-cols-[50px_1fr_40px_80px] gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200 items-center hover:bg-gray-100 transition"
            >
              <div className="font-medium text-gray-800">{train.train}</div>
              <div className="text-gray-700">
                {train.route}
                {"delayMinutes" in train &&
                  train.delayMinutes &&
                  train.delayMinutes > 0 && (
                    <span className="text-red-500 text-xs block mt-0.5">
                      затримується на {train.delayMinutes} хв
                    </span>
                  )}
              </div>
              <div className="text-center text-gray-800">{formattedTime}</div>
              <div className="text-center text-gray-800">
                {train.platform || "-"}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
