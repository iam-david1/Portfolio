import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ShopHubPage from "./pages/ShopHubPage.jsx";
import SalonPage from "./pages/SalonPage.jsx";
import HomeCarePage from "./pages/HomeCarePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopHubPage />} />
      <Route path="/salon" element={<SalonPage />} />
      <Route path="/homecare" element={<HomeCarePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}


