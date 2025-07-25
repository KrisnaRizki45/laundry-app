import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Tambahkan ini
import axiosInstance from "../../lib/axios";
import Sidebar from "../../components/EmployeSidebar";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("Kg");
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // ✅ Inisialisasi navigasi

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/products", {
        name,
        price: parseInt(price),
        type,
      });

      if (response.data.status.code === 201) {
        setMessage("✅ Product created successfully!");
        // Tunggu 1 detik lalu redirect
        setTimeout(() => {
          navigate("/admin/products"); // ✅ Redirect ke halaman admin/products
        }, 1000);
      } else {
        setMessage("❌ Failed to create product.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans">
      {/* <Sidebar className="w-full md:w-64" /> */}

      <main className="flex-1 bg-gray-50 p-6 flex justify-center items-start">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Product</h1>

          {message && (
            <div className="mb-4 text-sm text-center font-medium text-white bg-blue-500 py-2 rounded">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Product Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Price */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Price (IDR)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter product price"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Type */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Kg">Kg</option>
                <option value="Unit">Unit</option>
                <option value="Pcs">Pcs</option>
              </select>
            </div>

            {/* Submit */}
            <div className="text-right">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddProduct;
