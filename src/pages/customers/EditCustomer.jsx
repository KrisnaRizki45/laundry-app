import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../lib/axios";

const EditCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("Active");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await axiosInstance.get(`/customers/${id}`);
        const data = res.data.data;

        setName(data.name || "");
        setPhoneNumber(data.phoneNumber || "");
        setAddress(data.address || "");
        setStatus("Active"); // Atur manual jika tidak ada field status
      } catch (err) {
        console.error("Gagal mengambil data customer:", err);
        alert("Gagal memuat data customer.");
      }
    };

    fetchCustomer();
  }, [id]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await axiosInstance.put(`/customers`, {
        id,
        name,
        phoneNumber,
        address,
        updatedAt: new Date().toISOString(),
      });
      alert("Customer berhasil diperbarui!");
      navigate("/employe/customer");
    } catch (err) {
      console.error("Gagal update customer:", err.response?.data || err.message);
      alert("Terjadi kesalahan saat memperbarui data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans bg-gray-50">
      <main className="flex-1 p-6 flex justify-center items-start">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-4">
            <span
              className="hover:underline cursor-pointer"
              onClick={() => navigate("/employe/products")}
            >
              Customers
            </span>{" "}
            <span className="mx-1">/</span>
            <span className="text-gray-800 font-semibold">Edit Customer</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Customer</h1>

          {/* Form */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Address</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 resize-none"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={4}
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Status</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 bg-white"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-6">
            <button
              onClick={() => navigate("/employe/customer")}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 m-1 rounded-lg transition-all duration-300"
            >
              Back
            </button>
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 m-1 rounded-lg transition-all duration-300"
            >
              {loading ? "Updating..." : "Update Customer"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditCustomer;
