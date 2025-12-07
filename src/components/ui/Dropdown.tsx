import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";

interface ISelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface IDropdownProps {
  value: string | number;
  options: ISelectOption[];
  placeholder?: string;
  icon?: ReactNode;
  onChange: (value: string | number) => void;
  className?: string;
}

export default function Dropdown({
  value,
  options,
  placeholder,
  icon,
  onChange,
  className = "",
}: IDropdownProps) {
  const [open, setOpen] = useState(false);

  const selected = options.find((o) => o.value === value);

  return (
    <div className={"relative " + className}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="
          w-full flex items-center justify-between
          bg-white border rounded-xl px-3 py-2 shadow-sm
          focus:ring-2 focus:ring-indigo-400
        "
      >
        <div className="flex items-center gap-2 text-left flex-1">
          {icon && <span className="text-indigo-500">{icon}</span>}

          <span className={selected ? "text-gray-900" : "text-gray-400"}>
            {selected?.label || placeholder || "—"}
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
            absolute z-20 left-0 right-0 mt-1 bg-white border rounded-xl shadow-lg
            max-h-64 overflow-y-auto animate-fadeIn
          "
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              disabled={opt.disabled}
              className={`
                w-full text-left px-4 py-2
                hover:bg-indigo-50
                ${
                  opt.disabled
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-700"
                }
                ${opt.value === value ? "bg-white font-medium" : ""}
              `}
              onClick={() => {
                if (!opt.disabled) {
                  onChange(opt.value);
                  setOpen(false);
                }
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
