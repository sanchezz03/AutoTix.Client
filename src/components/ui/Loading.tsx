export default function Loading() {
  return (
    <div className="w-full flex justify-center py-6">
      <div className="flex items-center gap-3">
        <span className="w-5 h-5 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></span>
        <span className="text-indigo-600 font-medium text-lg">
          Завантаження...
        </span>
      </div>
    </div>
  );
}
