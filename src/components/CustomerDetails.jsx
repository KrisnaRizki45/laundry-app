import React from "react";

const CustomerModal = ({ isOpen, onClose, customer }) => {
  if (!isOpen || !customer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-md shadow-lg relative">
        <h2 className="text-xl font-bold mb-4 text-white">Detail Customer</h2>

        <div className="space-y-2 text-sm text-gray-800 dark:text-gray-200">
          <p><strong>Nama:</strong> {customer.name}</p>
          <p><strong>Telepon:</strong> {customer.phoneNumber}</p>
          <p><strong>Alamat:</strong> {customer.address}</p>
          <p><strong>Dibuat:</strong> {new Date(customer.createdAt).toLocaleString()}</p>
          <p><strong>Diupdate:</strong> {new Date(customer.updatedAt).toLocaleString()}</p>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default CustomerModal;