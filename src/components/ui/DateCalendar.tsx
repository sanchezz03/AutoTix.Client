import { CalendarIcon, ChevronDown } from "lucide-react";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { toIsoDateOnly } from "../../utils/date";

interface IDateCalendarProps {
  availableDates: string[];
  selected?: string;
  onSelect: (date: string) => void;
  className?: string;
}

export default function DateCalendar({
  availableDates,
  selected,
  onSelect,
  className = "",
}: IDateCalendarProps) {
  const available = new Set(availableDates);
  const selectedDate = selected ? new Date(selected) : undefined;

  const [open, setOpen] = useState(false);

  const formattedDate = selectedDate
    ? new Date(selectedDate).toLocaleDateString("uk-UA", {
        day: "numeric",
        month: "long",
      })
    : null;

  return (
    <div className={"relative " + className}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="
          w-full flex items-center justify-between
          !bg-white border rounded-xl px-3 py-2 shadow-sm
          focus:ring-2 focus:ring-indigo-400
        "
      >
        <div className="flex items-center gap-2 flex-1 text-left">
          <CalendarIcon size={18} className="text-indigo-500" />

          <span className={selectedDate ? "text-gray-900" : "text-gray-400"}>
            {formattedDate || "Оберіть дату"}
          </span>
        </div>

        <ChevronDown
          className={`transition-transform text-gray-500 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className="
            absolute z-20 left-0 right-0 mt-1 w-full
            !bg-white border rounded-xl shadow-lg p-3
            animate-fadeIn
          "
        >
          <DayPicker
            className="w-full"
            mode="single"
            selected={selectedDate}
            onSelect={(day) => {
              if (!day) return;
              const iso = toIsoDateOnly(day);
              if (available.has(iso)) {
                onSelect(iso);
                setOpen(false);
              }
            }}
            modifiers={{
              available: (day) =>
                available.has(day.toISOString().split("T")[0]),
            }}
            modifiersStyles={{
              available: {
                color: "black",
              },
              disabled: {
                opacity: 0.2,
              },
            }}
            disabled={(day) => !available.has(day.toISOString().split("T")[0])}
            styles={{
              root: { width: "100%" },
              month_grid: { width: "100%" },
              months: { width: "100%", maxWidth: "100%" },
              month: { width: "100%", maxWidth: "100%" },
            }}
          />
        </div>
      )}
    </div>
  );
}
