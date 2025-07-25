import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../lib/axios"; // pastikan path sesuai

const EmployeDashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [transactionCount, setTransactionCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [productRes, customerRes, transactionRes] = await Promise.all([
          axiosInstance.get("/products"),
          axiosInstance.get("/customers"),
          axiosInstance.get("/bills"),
        ]);

        setProductCount(productRes.data.data?.length || 0);
        setCustomerCount(customerRes.data.data?.length || 0);
        setTransactionCount(transactionRes.data.data?.length || 0);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="flex w-full min-h-screen font-sans bg-white">
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#111418]">Dashboard</h1>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex flex-1 min-w-[200px] flex-col gap-1 rounded-lg p-6 bg-[#f0f2f5]">
            <p className="text-[#111418] text-base font-medium">Products</p>
            <p className="text-2xl font-bold text-[#111418]">{productCount}</p>
          </div>
          <div className="flex flex-1 min-w-[200px] flex-col gap-1 rounded-lg p-6 bg-[#f0f2f5]">
            <p className="text-[#111418] text-base font-medium">Customers</p>
            <p className="text-2xl font-bold text-[#111418]">{customerCount}</p>
          </div>
          <div className="flex flex-1 min-w-[200px] flex-col gap-1 rounded-lg p-6 bg-[#f0f2f5]">
            <p className="text-[#111418] text-base font-medium">Transactions</p>
            <p className="text-2xl font-bold text-[#111418]">{transactionCount}</p>
          </div>
        </div>

        {/* Tombol Navigasi */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-3">
            <Link to="/employe/products/add" className="bg-[#0c7ff2] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold">
              Add Product
            </Link>
            <Link to="/employe/products" className="bg-[#f0f2f5] hover:bg-gray-300 text-[#111418] px-4 py-2 rounded-lg text-sm font-bold">
              View Products
            </Link>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/employe/customer/add" className="bg-[#0c7ff2] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold">
              Add Customer
            </Link>
            <Link to="/employe/customer" className="bg-[#f0f2f5] hover:bg-gray-300 text-[#111418] px-4 py-2 rounded-lg text-sm font-bold">
              View Customers
            </Link>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/employe/transaction/add" className="bg-[#0c7ff2] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold">
              Add Transaction
            </Link>
            <Link to="/employe/transaction" className="bg-[#f0f2f5] hover:bg-gray-300 text-[#111418] px-4 py-2 rounded-lg text-sm font-bold">
              View Transactions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeDashboard;
