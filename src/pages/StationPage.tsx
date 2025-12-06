import { useEffect, useState } from "react";
import type { StationBoard } from "../types/station/stationBoard";
import type { Station } from "../types/station/station";
import { stationService } from "../api";
import StationHeader from "../components/station/StationHeader";
import StationBoardTable from "../components/station/StationBoardTable";
import StationSelectPopup from "../components/station/StationSelectPopup";

export default function StationsPage() {
  const [stations, setStations] = useState<Station[]>([]);
  const [stationBoards, setStationBoards] = useState<Station[]>([]);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [board, setBoard] = useState<StationBoard | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const loadStations = async () => {
      try {
        const res = await stationService.getStations();
        setStations(res);
        if (res.length > 0) setSelectedStation(res[0]);
      } catch {
        setError("Failed to load stations");
      }
    };

    loadStations();
  }, []);

  useEffect(() => {
    const loadBoard = async () => {
      if (!selectedStation) return;
      setLoading(true);
      setError("");
      try {
        const res = await stationService.getStationBoard(selectedStation.id);
        setBoard(res);
      } catch {
        setError("Failed to load station board");
      } finally {
        setLoading(false);
      }
    };

    loadBoard();
  }, [selectedStation]);

  const handleOpenPopup = async () => {
    setPopupOpen(true);
    try {
      const boards = await stationService.getStationBoards();
      setStationBoards(boards);
    } catch {
      setError("Failed to load stations for selection");
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-600px)] flex justify-center py-8 px-4">
      <div className="max-w-6xl w-full flex flex-col gap-6">
        {selectedStation && (
          <StationHeader station={selectedStation} onChange={handleOpenPopup} />
        )}

        {loading && (
          <p className="text-gray-600 text-center">Завантаження...</p>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {board && (
          <div className="grid md:grid-cols-2 gap-6">
            <StationBoardTable title="Відправлення" trains={board.departures} />
            <StationBoardTable title="Прибуття" trains={board.arrivals} />
          </div>
        )}

        <StationSelectPopup
          stations={stationBoards}
          station={selectedStation!}
          isOpen={popupOpen}
          onClose={() => setPopupOpen(false)}
          onSelect={(station) => {
            setSelectedStation(station);
            setPopupOpen(false);
          }}
        />
      </div>
    </div>
  );
}
