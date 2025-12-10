import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import StationsPage from "./pages/StationPage";
import TripsPage from "./pages/TripPage";
import OrderPage from "./pages/OrderPage";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/stations" element={<StationsPage />} />
          <Route path="/trips" element={<TripsPage />} />
          <Route path="/orders" element={<OrderPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
