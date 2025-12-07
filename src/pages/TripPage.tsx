import { useEffect, useState } from "react";
import type { Station } from "../types/station/station";
import { stationService, tripService } from "../api";
import TripSearchForm from "../components/trip/TripSearchForm";
import type { Trip } from "../types/trip/trip";
import TripCard from "../components/trip/TripCard";

const DEFAULT_FROM: Station = {
  id: 2200001,
  name: "Київ-Пасажирський",
};

const DEFAULT_TO: Station = {
  id: 2210800,
  name: "Запоріжжя 1",
};

export default function TripsPage() {
  const [stations, setStations] = useState<Station[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [trips, setTrips] = useState<Trip>();
  const [stationFrom, setStationFrom] = useState<Station>(DEFAULT_FROM);
  const [stationTo, setStationTo] = useState<Station>(DEFAULT_TO);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStations = async () => {
      try {
        const res = await stationService.getStations();
        setStations(res);
        setError("");
      } catch {
        setError("Не вдалося завантажити станції");
      }
    };

    loadStations();
  }, []);

  useEffect(() => {
    const loadDates = async () => {
      try {
        if (!stationFrom || !stationTo) return;

        const { dates } = await tripService.getDepartureDates(
          stationFrom.id,
          stationTo.id
        );

        setDates(dates);
        setError("");
      } catch {
        setError("Не вдалося завантажити дати відправлення");
      }
    };

    loadDates();
  }, [stationFrom, stationTo]);

  const handleSearch = async () => {
    if (!stationFrom || !stationTo || !selectedDate) return;

    try {
      const tripData = await tripService.getTrip(
        stationFrom.id,
        stationTo.id,
        selectedDate
      );
      setTrips(tripData);
      setError("");
    } catch {
      setError("Не вдалося завантажити поїзди");
    }
  };

  return (
    <div className="p-6 flex flex-col gap-[60px]">
      <TripSearchForm
        stations={stations}
        stationFrom={stationFrom}
        stationTo={stationTo}
        dates={dates}
        dateSelected={selectedDate}
        onChangeFrom={setStationFrom}
        onChangeTo={setStationTo}
        onDateSelect={setSelectedDate}
        onSearch={handleSearch}
      />

      {error && (
        <div className="text-red-600 font-medium bg-red-100 p-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-4">
        {trips?.direct
          .filter((segment) =>
            segment.train.wagonClasses.some(
              (wc) => wc.id === "П" && wc.freeSeats > 0
            )
          )
          .map((segment) => (
            <TripCard key={segment.id} segment={segment} />
          ))}
      </div>
    </div>
  );
}
