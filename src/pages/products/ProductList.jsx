import React, { useState } from "react";
import Sidebar from "../../components/EmployeSidebar";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    { name: "Laundry Detergent", price: "$9.99", category: "Detergents" },
    { name: "Fabric Softener", price: "$5.99", category: "Softeners" },
    { name: "Stain Remover", price: "$4.49", category: "Stain Removers" },
    { name: "Dryer Sheets", price: "$3.99", category: "Dryer Sheets" },
    { name: "Bleach", price: "$2.49", category: "Bleach" },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row w-full font-sans">
      {/* <Sidebar className="w-full md:w-64" /> */}

      {/* Konten Kanan */}
      <div className="flex-1 bg-white p-6">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>
          <div className="flex items-center gap-2 w-full md:w-auto">
            {/* Search Input */}
        <div className="relative w-full md:w-64">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
            />
            </svg>
        </span>
        <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        </div>
            {/* Tambah Button */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition duration-300">
              <Link to="employe/products/add">Tambah Product</Link>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-300">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Price</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Category</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">
                    <div className="flex items-center space-x-2 text-sm font-semibold">
                      <Link to="/products/edit" className="text-blue-500 hover:text-blue-700 transition-colors duration-300">Edit</Link>
                      <span className="text-gray-400">|</span>
                      <Link to="" className="text-blue-500 hover:text-red-600 transition-colors duration-300">Delete</Link>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    Tidak ada produk yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
