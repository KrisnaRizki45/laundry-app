import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../lib/axios";
import Sidebar from "../../components/EmployeSidebar";

const EditProduct = () => {
  const { id } = useParams(); // ⬅️ Ambil ID dari URL
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("Kg");
  const [message, setMessage] = useState("");

  // GET data produk saat pertama kali render
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/products/${id}`);
        const product = res.data.data;
        setName(product.name);
        setPrice(product.price);
        setType(product.type);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setMessage("❌ Failed to load product.");
      }
    };

    if (id) fetchProduct();
  }, [id]);

  // PUT untuk update produk
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put(`/products`, {
        id,
        name,
        price: parseInt(price),
        type,
      });

      if (res.data.status.code === 200) {
        setMessage("✅ Product updated successfully!");
        setTimeout(() => {
          navigate("/employe/products"); // ⬅️ Redirect setelah update
        }, 1000);
      } else {
        setMessage("❌ Failed to update product.");
      }
    } catch (error) {
      console.error("Update error:", error);
      setMessage("❌ Error during update.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans">
      {/* <Sidebar className="w-full md:w-64" /> */}

      <main className="flex-1 bg-gray-50 p-6 flex justify-center items-start">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-4">
            <span
              className="hover:underline cursor-pointer"
              onClick={() => navigate("/employe/products")}
            >
              Products
            </span>{" "}
            <span className="mx-1">/</span>
            <span className="text-gray-800 font-semibold">Edit Product</span>
          </div>

          {/* Judul */}
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Product</h1>

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
              onClick={() => navigate("/employe/products")}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 m-1 rounded-lg transition-all duration-300"
            >
              Back
            </button>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300"
              >
                Update Product
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditProduct;
