import { Link } from "react-router-dom";
import { Menu, Train, LogIn, X, LogOut } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { authService, tokenStorage, userStorage } from "../../api";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const token = tokenStorage.get();
    setIsAuthenticated(!!token);

    if (token) {
      const name = userStorage.getName();
      setUserName(name);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (e) {
      console.error(e);
    } finally {
      setIsAuthenticated(false);
      setUserName(null);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50 text-gray-800">
      {/* HEADER */}
      <header className="w-full bg-gradient-to-r from-indigo-500 to-indigo-400 text-white shadow-md py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden !bg-indigo-600 p-2 rounded-lg shadow hover:!bg-indigo-500 transition"
          >
            {mobileOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>

          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl text-white"
          >
            <Train className="w-6 h-6 text-white" />
            <span>AutoTix</span>
          </Link>

          {/* DESKTOP NAV */}
          {isAuthenticated && (
            <nav className="ml-6 hidden md:flex gap-6 text-white">
              <Link to="/trips" className="hover:text-gray-200 transition">
                Trips
              </Link>
              <Link to="/stations" className="hover:text-gray-200 transition">
                Stations
              </Link>
            </nav>
          )}
        </div>

        {/* LOGIN BUTTON */}
        {isAuthenticated ? (
          <div className="flex items-center gap-3 bg-white text-indigo-600 px-4 py-2 rounded-xl shadow">
            <span>{userName}</span>
            <button
              onClick={handleLogout}
              className="hover:text-red-500 transition"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-xl shadow hover:bg-gray-100 transition"
          >
            <LogIn className="w-5 h-5" />
            Log in
          </Link>
        )}
      </header>

      {/* ---- MOBILE DROPDOWN MENU ---- */}
      {mobileOpen && (
        <div className="bg-white shadow-lg px-6 py-5 md:hidden animate-fadeIn">
          <div className="flex flex-col items-center gap-4">
            <Link
              to="/trips"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center bg-indigo-500 text-white py-2 rounded-xl shadow hover:bg-indigo-600 transition font-medium"
            >
              Trips
            </Link>

            <Link
              to="/stations"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center bg-indigo-500 text-white py-2 rounded-xl shadow hover:bg-indigo-600 transition font-medium"
            >
              Stations
            </Link>
          </div>
        </div>
      )}

      {/* MAIN */}
      <main className="flex-1 w-full p-6">{children}</main>

      {/* FOOTER */}
      <footer className="w-full bg-gradient-to-r from-indigo-500 to-indigo-400 text-white text-center py-4 text-sm">
        © AutoTix 2025
      </footer>
    </div>
  );
}
