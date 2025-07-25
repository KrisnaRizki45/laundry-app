import React, { useState, useEffect } from "react";
import Sidebar from "../../components/EmployeSidebar";
import { Link } from "react-router-dom";
import axiosInstance from "../../lib/axios";
import CustomerModal from "../../components/CustomerDetails";

const CustomerList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCustomers = async () => {
    try {
      const res = await axiosInstance.get("/customers");
      const customerList = res.data.data || [];
      setCustomers(customerList);
    } catch (error) {
      console.error("Gagal mengambil data customer:", error);
      alert("Terjadi kesalahan saat memuat data.");
    }
  };

  const handleDeleteCustomer = async (id) => {
  const confirmed = window.confirm("Apakah Anda yakin ingin menghapus customer ini?");
  if (!confirmed) return;

  try {
    await axiosInstance.delete(`/customers/${id}`);
    alert("Customer berhasil dihapus!");
    fetchCustomers(); // Refresh data
  } catch (error) {
    console.error("Gagal menghapus customer:", error);
    alert("Terjadi kesalahan saat menghapus customer.");
  }
};


  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (customer) => {
  setSelectedCustomer(customer);
  setIsModalOpen(true);
};

const closeModal = () => {
  setSelectedCustomer(null);
  setIsModalOpen(false);
};

  const getStatusColor = (status) => {
    const baseStyle =
      "text-[14px] font-medium px-2 py-[2px] rounded text-center inline-block mx-auto min-w-[4.5rem]";
    if (status === "Active") return `${baseStyle} bg-green-100 text-green-700`;
    if (status === "Inactive") return `${baseStyle} bg-red-100 text-red-700`;
    return `${baseStyle} bg-yellow-100 text-yellow-700`;
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
            <Link
              to={`/employe/customer/add`}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition duration-300"
            >
              Tambah Customer
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-300">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Address</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Phone Number</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{customer.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{customer.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{customer.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{customer.phoneNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">
                    <div className="flex items-center space-x-2 text-sm font-semibold">
                      <button
                        onClick={() => openModal(customer)}
                        className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
                      >
                        View
                      </button>
                      <span className="text-gray-400">|</span>
                      <Link
                        to={`/employe/customer/edit/${customer.id}`}
                        className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
                      >
                        Edit
                      </Link>
                      <span className="text-gray-400">|</span>
                      <button
                        onClick={() => handleDeleteCustomer(customer.id)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-300"
                      >
                        Delete
                      </button>
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

      <CustomerModal
        isOpen={isModalOpen}
        onClose={closeModal}
        customer={selectedCustomer}
      />
    </div>
  );
};

export default CustomerList;
