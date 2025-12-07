import { MapPin } from "lucide-react";
import type { Station } from "../../types/station/station";
import DateCalendar from "../ui/DateCalendar";
import Dropdown from "../ui/Dropdown";

interface ITripSearchProps {
  stations: Station[];
  stationFrom: Station;
  stationTo: Station;
  dates: string[];

  dateSelected: string | null;

  onChangeFrom: (station: Station) => void;
  onChangeTo: (station: Station) => void;
  onDateSelect: (date: string) => void;
  onSearch: () => void;
}

export default function TripSearchForm({
  stations,
  stationFrom,
  stationTo,
  dates,
  dateSelected,
  onChangeFrom,
  onChangeTo,
  onDateSelect,
  onSearch,
}: ITripSearchProps) {
  const fromOptions = stations.map((s) => ({
    label: s.name,
    value: s.id,
    disabled: s.id === stationTo.id,
  }));

  const toOptions = stations.map((s) => ({
    label: s.name,
    value: s.id,
    disabled: s.id === stationFrom.id,
  }));

  return (
    <div className="!bg-indigo-50 shadow rounded-xl p-6 flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-indigo-400">Пошук поїздів</h2>

      <div
        className="grid gap-6 items-end"
        style={{ gridTemplateColumns: "1fr 1fr 1fr 93px" }}
      >
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">Звідки</label>
          <Dropdown
            value={stationFrom.id}
            options={fromOptions}
            icon={<MapPin size={18} />}
            onChange={(id) =>
              onChangeFrom(stations.find((s) => s.id === Number(id))!)
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">Куди</label>
          <Dropdown
            value={stationTo.id}
            options={toOptions}
            icon={<MapPin size={18} />}
            onChange={(id) =>
              onChangeTo(stations.find((s) => s.id === Number(id))!)
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">Дата відправлення</label>

          <DateCalendar
            availableDates={dates}
            selected={dateSelected ?? undefined}
            onSelect={onDateSelect}
          />
        </div>

        <div>
          <button
            className="!bg-indigo-500 hover:bg-indigo-700 text-white rounded-xl py-3 text-lg font-semibold"
            onClick={onSearch}
          >
            Знайти
          </button>
        </div>
      </div>
    </div>
  );
}
