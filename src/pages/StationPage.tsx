import { useEffect, useState } from "react";
import type { StationBoard } from "../types/station/stationBoard";
import type { Station } from "../types/station/station";
import { stationService } from "../api";
import StationHeader from "../components/station/StationHeader";
import StationBoardTable from "../components/station/StationBoardTable";
import StationSelectPopup from "../components/station/StationSelectPopup";
import Loading from "../components/ui/Loading";

export default function StationsPage() {
  const [stations, setStations] = useState<Station[]>([]);
  const [stationBoards, setStationBoards] = useState<Station[]>([]);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [board, setBoard] = useState<StationBoard | null>(null);

  const [loadingStations, setLoadingStations] = useState(false);
  const [loadingBoard, setLoadingBoard] = useState(false);

  const [error, setError] = useState("");

  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const loadStations = async () => {
      setLoadingStations(true);
      try {
        const res = await stationService.getStations();
        setStations(res);
        if (res.length > 0) setSelectedStation(res[0]);
      } catch {
        setError("Failed to load stations");
      } finally {
        setLoadingStations(false);
      }
    };

    loadStations();
  }, []);

  useEffect(() => {
    const loadBoard = async () => {
      if (!selectedStation) return;

      setLoadingBoard(true);
      setError("");

      try {
        const res = await stationService.getStationBoard(selectedStation.id);
        setBoard(res);
      } catch {
        setError("Failed to load station board");
      } finally {
        setLoadingBoard(false);
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

        {error && <p className="text-red-500 text-center">{error}</p>}

        {loadingStations && <Loading />}
        {loadingBoard && <Loading />}

        {!loadingBoard && board && (
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
