interface ITripBuyButtonProps {
  onClick?: () => void;
}

export default function TripBuyButton({ onClick }: ITripBuyButtonProps) {
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={onClick}
        className="!bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition font-semibold"
      >
        Придбати
      </button>
    </div>
  );
}
