import { X, Search } from "lucide-react";
import type { Station } from "../../types/station/station";
import { useState } from "react";

interface StationSelectPopupProps {
  stations: Station[];
  station: Station;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (station: Station) => void;
}

export default function StationSelectPopup({
  stations,
  station,
  isOpen,
  onClose,
  onSelect,
}: StationSelectPopupProps) {
  const [search, setSearch] = useState("");

  if (!isOpen) return null;

  const filteredStations = stations.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg text-gray-800">Виберіть станцію</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500 hover:text-gray-700 transition" />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-4 border rounded-lg px-3 py-1 bg-gray-50">
          <input
            type="text"
            placeholder="Пошук станції"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
          />
          <Search className="w-5 h-5 text-gray-400" />
        </div>

        <div className="max-h-60 overflow-y-auto">
          {filteredStations.map((s) => (
            <label
              key={s.id}
              className="flex items-center gap-2 p-2 rounded hover:bg-indigo-50 cursor-pointer"
            >
              <input
                type="radio"
                name="station"
                className="accent-indigo-500"
                checked={s.id === station.id}
                onChange={() => onSelect(s)}
              />
              <span className="text-gray-700">{s.name}</span>
            </label>
          ))}
          {filteredStations.length === 0 && (
            <p className="text-gray-400 text-sm text-center py-2">
              Станцій не знайдено
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
