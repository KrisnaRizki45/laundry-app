import React from "react";
import Sidebar from "../../components/EmployeSidebar";

const EditProduct = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans">
      {/* Sidebar */}
      {/* <Sidebar className="w-full md:w-64" /> */}

      {/* Konten Form */}
      <main className="flex-1 bg-gray-50 p-6 flex justify-center items-start">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-4">
            <span className="hover:underline cursor-pointer">Products</span> <span className="mx-1">/</span>
            <span className="text-gray-800 font-semibold">Edit Product</span>
          </div>

          {/* Judul */}
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Product</h1>

          {/* Product Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Product Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              placeholder="Enter product description"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 resize-none min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Price</label>
            <input
              type="text"
              placeholder="Enter product price"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300">
              Update Product
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditProduct;
