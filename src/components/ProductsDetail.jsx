import React from "react";

const ProductModal = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-md shadow-lg relative">
        <h2 className="text-xl font-bold mb-4 text-white">Detail Produk</h2>

        <div className="space-y-2 text-sm text-gray-800 dark:text-gray-200">
          <p><strong>Nama:</strong> {product.name}</p>
          <p><strong>Harga:</strong> Rp{product.price.toLocaleString("id-ID")}</p>
          <p><strong>Jenis:</strong> {product.type}</p>
          <p><strong>Dibuat:</strong> {new Date(product.createdAt).toLocaleString()}</p>
          <p><strong>Diupdate:</strong> {new Date(product.updatedAt).toLocaleString()}</p>
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

export default ProductModal;
