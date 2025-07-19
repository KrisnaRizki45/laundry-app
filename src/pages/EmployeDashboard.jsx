import React from "react";
import { Link } from "react-router-dom";
// import axiosInstance from '../lib/axios'; 
import Sidebar from "../components/EmployeSidebar"; // Pastikan path ini sesuai

const EmployeDashboard = () => {
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
          <div className="flex flex-1 min-w-[200px] flex-col gap-1 rounded-lg p-6 bg-[#f0f2f5]">
            <p className="text-[#111418] text-base font-medium">Products</p>
            <p className="text-2xl font-bold text-[#111418]">120</p>
          </div>
          <div className="flex flex-1 min-w-[200px] flex-col gap-1 rounded-lg p-6 bg-[#f0f2f5]">
            <p className="text-[#111418] text-base font-medium">Customers</p>
            <p className="text-2xl font-bold text-[#111418]">350</p>
          </div>
          <div className="flex flex-1 min-w-[200px] flex-col gap-1 rounded-lg p-6 bg-[#f0f2f5]">
            <p className="text-[#111418] text-base font-medium">Transactions</p>
            <p className="text-2xl font-bold text-[#111418]">500</p>
          </div>
        </div>

        {/* Tombol Navigasi */}
        <div className="flex flex-col gap-4">
          {/* Products */}
          <div className="flex flex-wrap gap-3">
            <Link
              to="/products/add"
              className="bg-[#0c7ff2] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold"
            >
              Add Product
            </Link>
            <Link
              to="/products"
              className="bg-[#f0f2f5] hover:bg-gray-300 text-[#111418] px-4 py-2 rounded-lg text-sm font-bold"
            >
              View Products
            </Link>
          </div>

          {/* Customers */}
          <div className="flex flex-wrap gap-3">
            <Link
              to="/customer/add"
              className="bg-[#0c7ff2] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold"
            >
              Add Customer
            </Link>
            <Link
              to="/customer"
              className="bg-[#f0f2f5] hover:bg-gray-300 text-[#111418] px-4 py-2 rounded-lg text-sm font-bold"
            >
              View Customers
            </Link>
          </div>

          {/* Transactions */}
          <div className="flex flex-wrap gap-3">
            <Link
              to="/transaction/add"
              className="bg-[#0c7ff2] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold"
            >
              Add Transaction
            </Link>
            <Link
              to="/transaction"
              className="bg-[#f0f2f5] hover:bg-gray-300 text-[#111418] px-4 py-2 rounded-lg text-sm font-bold"
            >
              View Transactions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeDashboard;
