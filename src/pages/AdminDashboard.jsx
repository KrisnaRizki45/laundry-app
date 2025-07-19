import React from "react";
import { Link } from "react-router-dom";
// import axiosInstance from '../lib/axios'; 
import Sidebar from "../components/EmployeSidebar"; // Pastikan path ini sesuai

const AdminDashboard = () => {
  return (
    <div className="flex w-full min-h-screen font-sans bg-white">
      {/* Sidebar
      <Sidebar /> */}

      {/* Konten Utama */}
      <div className="flex-1 p-6">
        {/* Judul */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#111418]">Dashboard</h1>
        </div>

        {/* Kartu Info */}
        <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex min-w-[200px] max-w-[250px] flex-col gap-1 rounded-lg p-6 bg-[#f0f2f5]">
            <p className="text-[#111418] text-base font-medium">User</p>
            <p className="text-2xl font-bold text-[#111418]">120</p>
        </div>
        </div>

        {/* Tombol Navigasi */}
        <div className="flex flex-col gap-4">
          {/* Products */}
          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/users/add"
              className="bg-[#0c7ff2] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold"
            >
              Add User
            </Link>
            <Link
              to="/admin/users"
              className="bg-[#f0f2f5] hover:bg-gray-300 text-[#111418] px-4 py-2 rounded-lg text-sm font-bold"
            >
              View Users
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
