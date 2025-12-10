import { useState } from "react";

interface IOrderPayButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

export default function OrderPayButton({
  onClick,
  disabled,
}: IOrderPayButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!onClick || disabled) return;
    setLoading(true);
    try {
      await onClick();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={handleClick}
        disabled={disabled || loading}
        className={`px-6 py-2 rounded-lg font-semibold transition
          ${
            disabled || loading
              ? "!bg-gray-400 cursor-not-allowed text-white"
              : "!bg-indigo-500 text-white"
          }`}
      >
        {loading ? "Завантаження..." : "Оплатити"}
      </button>
    </div>
  );
}
