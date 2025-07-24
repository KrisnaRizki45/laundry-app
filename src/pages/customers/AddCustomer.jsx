import React, { useState } from "react";
import Sidebar from "../../components/EmployeSidebar";
import useCustomers from "../../hooks/useCustomers";

const AddCustomer = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("Active");
  const { createCustomer } = useCustomers();

  const handleSave = (e) => {
    e.preventDefault();
    const customerData = { name, phoneNumber, address, status };
    console.log("Saving customer:", customerData);
    createCustomer(customerData);
    // TODO: Kirim data ke backend
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans">
      {/* Sidebar */}
      {/* <Sidebar className="w-full md:w-64" /> */}

      {/* Konten Form */}
      <main className="flex-1 bg-gray-50 p-6 flex justify-center items-start">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Customer</h1>

          <form onSubmit={handleSave}>
            {/* Customer Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Customer Name</label>
              <input
                type="text"
                placeholder="Enter customer name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Contact */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Contact (Phone Number)</label>
              <input
                type="text"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Address</label>
              <textarea
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 resize-none min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Status */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Inactive">Pending</option>
              </select>
            </div>

            {/* Submit Button */}
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

export default AddCustomer;
