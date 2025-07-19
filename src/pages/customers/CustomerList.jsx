import React, { useState } from "react";
import Sidebar from "../../components/EmployeSidebar";
import { Link } from "react-router-dom";

const CustomerList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const customers = [
    {
      name: "Andi Wijaya",
      address: "Jl. Merdeka No. 1",
      phone: "081234567890",
      status: "Active",
    },
    {
      name: "Budi Santoso",
      address: "Jl. Asia Afrika No. 23",
      phone: "082345678901",
      status: "Inactive",
    },
    {
      name: "Citra Lestari",
      address: "Jl. Braga No. 45",
      phone: "083456789012",
      status: "Active",
    },
    {
      name: "Dewi Kartika",
      address: "Jl. Sudirman No. 78",
      phone: "084567890123",
      status: "Pending",
    },
    {
      name: "Eka Putra",
      address: "Jl. Gatot Subroto No. 99",
      phone: "085678901234",
      status: "Inactive",
    },
  ];

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

 const getStatusColor = (status) => {
  const baseStyle =
    "text-[14px] font-medium px-2 py-[2px] rounded text-center inline-block mx-auto min-w-[4.5rem]";

  if (status === "Active")
    return `${baseStyle} bg-green-100 text-green-700`;
  if (status === "Inactive")
    return `${baseStyle} bg-red-100 text-red-700`;

  return `${baseStyle} bg-yellow-100 text-yellow-700`; // Pending atau lainnya
};

  return (
    <div className="flex flex-col md:flex-row w-full font-sans">
      {/* <Sidebar className="w-full md:w-64" /> */}

      {/* Konten Kanan */}
      <div className="flex-1 bg-white p-6">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
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
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>
            {/* Tambah Button */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition duration-300">
              <Link to="employe/customer/add">Tambah Customer</Link>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-300">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Address</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Phone Number</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{customer.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{customer.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{customer.phone}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm flex items-center justify-center ${getStatusColor(customer.status)}`}>
                    {customer.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">
                    <div className="flex items-center space-x-2 text-sm font-semibold">
                      <Link to="/customer/edit" className="text-blue-500 hover:text-blue-700 transition-colors duration-300">Edit</Link>
                      <span className="text-gray-400">|</span>
                      <Link to="" className="text-blue-500 hover:text-red-600 transition-colors duration-300">Delete</Link>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    Tidak ada customer yang ditemukan.
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

export default CustomerList;
