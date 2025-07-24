/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import useProduct from "../../hooks/useProduct";

const AddProduct = () => {
  const { createProduct, status } = useProduct();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    type: "kg", // default
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.type) {
      return setError("Nama, harga, dan tipe produk wajib diisi.");
    }

    try {
      await createProduct({
        name: formData.name,
        price: parseInt(formData.price),
        type: formData.type,
      });
      setFormData({ name: "", description: "", price: "", type: "kg" });
      setError(null);
      alert("Produk berhasil ditambahkan!");
    } catch (err) {
      setError("Gagal menambahkan produk.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans">
      <main className="flex-1 bg-gray-50 p-6 flex justify-center items-start">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Product</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Price (Rp)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="25000"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-blue-500 focus:outline-none"
              >
                <option value="kg">Per Kilogram (kg)</option>
                <option value="pcs">Per Piece (pcs)</option>
              </select>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-600">{error}</p>}

            {/* Submit */}
            <div className="text-right">
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
              >
                {status === "loading" ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddProduct;
