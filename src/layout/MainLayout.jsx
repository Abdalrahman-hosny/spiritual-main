// src/layout/MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ✅ Navbar ثابت */}
      <Navbar  />
      

      {/* 🔄 هنا بتتغير الصفحات */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* ✅ Footer ثابت */}
      <Footer />
    </div>
  );
}
