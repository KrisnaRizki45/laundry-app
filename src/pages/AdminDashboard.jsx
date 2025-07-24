import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from '../lib/axios';

const AdminDashboard = () => {
  const [error, setError] = useState(null);
  const [userCount, setUserCount] = useState(0); // untuk jumlah user  

  // Fetch semua user untuk dihitung
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axiosInstance.get(`/users`);
        const allUsers = res.data.data || [];
        setUserCount(allUsers.length);
      } catch (err) {
        console.error("Gagal mengambil jumlah user:", err);
      }
    };
    fetchAllUsers();
  }, []);

  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="flex w-full min-h-screen font-sans bg-white">
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#111418]">Dashboard</h1>
        </div>

        {/* Kartu Jumlah User */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex min-w-[200px] max-w-[250px] flex-col gap-1 rounded-lg p-6 bg-[#f0f2f5]">
            <p className="text-[#111418] text-base font-medium">User</p>
            <p className="text-2xl font-bold text-[#111418]">{userCount}</p>
          </div>
        </div>

        {/* Navigasi */}
        <div className="flex flex-col gap-4">
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
