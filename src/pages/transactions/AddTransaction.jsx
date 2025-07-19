import React from "react";
import Sidebar from "../../components/EmployeSidebar";

const AddTransaction = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans">
      {/* Sidebar */}
      {/* <Sidebar className="w-full md:w-64" /> */}

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6 flex justify-center items-start">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Transaction</h1>

          {/* Customer */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Customer</label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select Customer</option>
              <option value="1">Sophia Clark</option>
              <option value="2">John Doe</option>
              <option value="3">Alice</option>
            </select>
          </div>

          {/* Items Table */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Items</h2>
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-2 text-gray-700">Item</th>
                  <th className="text-left px-4 py-2 text-gray-700">Quantity</th>
                  <th className="text-left px-4 py-2 text-gray-700">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-2 text-gray-800">Shirt</td>
                  <td className="px-4 py-2 text-gray-600">2</td>
                  <td className="px-4 py-2 text-gray-600">$10</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2 text-gray-800">Pants</td>
                  <td className="px-4 py-2 text-gray-600">1</td>
                  <td className="px-4 py-2 text-gray-600">$15</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Add Item */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Add Item</label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select Item</option>
              <option value="shirt">Shirt</option>
              <option value="pants">Pants</option>
              <option value="jacket">Jacket</option>
            </select>
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Quantity</label>
            <input
              type="number"
              placeholder="Enter quantity"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Price</label>
            <input
              type="text"
              placeholder="Enter price"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Total Summary */}
          <div className="mb-6 space-y-2">
            <div className="flex justify-between text-base text-gray-700">
              <span>Subtotal</span>
              <span>$45</span>
            </div>
            <div className="flex justify-between text-base text-gray-700">
              <span>Tax</span>
              <span>$2.25</span>
            </div>
            <div className="flex justify-between font-bold text-base text-gray-800">
              <span>Total</span>
              <span>$47.25</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300">
              Create Transaction
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddTransaction;
