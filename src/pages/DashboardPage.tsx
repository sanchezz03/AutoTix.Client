import { Train } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  return (
    <div className="w-full min-h-[calc(100vh-180px)] flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl w-full border border-gray-100 flex gap-6">
        {/* ICON */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <Train className="w-32 h-32 text-indigo-600" />
        </div>

        {/* TEXT CONTENT */}
        <div>
          <h2 className="text-2xl font-bold mb-3 text-gray-800">
            Welcome to AutoTix
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            AutoTix is your modern and intuitive railway ticket booking system.
            Easily browse trips, explore stations, and manage your travel in a
            few clicks. Enjoy simple navigation, fast performance, and smart
            features designed to enhance your railway journey.
          </p>

          <p className="text-lg mt-3 text-gray-600 leading-relaxed">
            This dashboard provides a quick overview and will soon include
            dynamic stats, personalized suggestions, and your latest trip
            information.
          </p>

          {/* BUTTON */}
          <div className="mt-8 flex">
            <Link
              to="/"
              className="mx-auto bg-indigo-500
             text-white text-lg font-medium px-8 py-3 rounded-xl shadow
             hover:text-indigo-200 active:text-indigo-300 transition-colors"
            >
              Let's Start
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
