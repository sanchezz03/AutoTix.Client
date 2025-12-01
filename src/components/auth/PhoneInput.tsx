import { useEffect, useState, type ChangeEvent } from "react";
import { normalizeInput } from "../../utils/phone";

interface PhoneInputProps {
  value: string;
  onChange: (e164: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
}

export default function PhoneInput({
  value,
  onChange,
  onBlur,
  placeholder,
  className,
}: PhoneInputProps) {
  const [local, setLocal] = useState<string>(value ?? "");

  useEffect(() => {
    setLocal(value);
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const normalized = normalizeInput(raw);
    setLocal(normalized);
    onChange(normalized);
  };

  return (
    <input
      type="tel"
      value={local}
      onChange={handleChange}
      onBlur={onBlur}
      placeholder={placeholder ?? "+380123456789"}
      className={`w-full border border-gray-300 rounded-xl px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${
        className ?? ""
      }`}
    />
  );
}
