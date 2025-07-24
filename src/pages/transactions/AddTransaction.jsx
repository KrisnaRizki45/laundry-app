import React, { useEffect, useState } from "react";
import useCustomers from "../../hooks/useCustomers";
import useProducts from "../../hooks/useProduct";
import useTransaction from "../../hooks/useTransaction";

const AddTransaction = () => {
  const { customers, fetchCustomer } = useCustomers();
  const { products, fetchProduct } = useProducts();
  const { createTransaction } = useTransaction();

  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchCustomer();
    fetchProduct();
  }, []);

  useEffect(() => {
    const product = products.find((p) => p._id === selectedProduct);
    if (product) {
      setPrice(product.price || 0);
    }
  }, [selectedProduct, products]);

  const handleAddItem = () => {
    if (!selectedProduct || !quantity || !price) return;

    const product = products.find((p) => p._id === selectedProduct);
    if (!product) {
      alert("Produk tidak ditemukan. Pastikan produk telah dipilih.");
      return;
    }

    const newItem = {
      productId: selectedProduct,
      name: product.name,
      qty: parseInt(quantity),
      price: parseFloat(price),
    };

    setItems((prev) => [...prev, newItem]);
    setSelectedProduct("");
    setQuantity(1);
    setPrice("");
  };

  const subtotal = items.reduce((acc, item) => acc + item.qty * item.price, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handleSubmit = async () => {
    if (!selectedCustomer || items.length === 0) return;

    const userId = localStorage.getItem("userId") || "user-456"; // fallback default

    const payload = {
      customerId: selectedCustomer,
      userId,
      billDetails: items.map(({ productId, qty }) => ({ productId, qty })),
    };

    try {
      await createTransaction(payload);
      alert("Transaksi berhasil disimpan!");
      setItems([]);
      setSelectedCustomer("");
    } catch (error) {
      console.error("Gagal menyimpan transaksi:", error);
      alert("Gagal menyimpan transaksi.");
    }
  };

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Tambah Transaksi</h1>

        {/* Select Customer */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Pilih Customer</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
          >
            <option key="placeholder-customer" value="">
              -- Pilih Customer --
            </option>
            {customers.map((customer) => (
              <option key={customer._id} value={customer._id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        {/* Select Product */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Pilih Produk</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option key="placeholder-product" value="">
              -- Pilih Produk --
            </option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity & Price */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium">Jumlah</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium">Harga</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Add Item Button */}
        <div className="mb-6">
          <button
            onClick={handleAddItem}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Tambah Item
          </button>
        </div>

        {/* List of Items */}
        {items.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Daftar Item</h2>
            <table className="w-full border text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Produk</th>
                  <th className="border p-2 text-right">Qty</th>
                  <th className="border p-2 text-right">Harga</th>
                  <th className="border p-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={`${item.productId}-${index}`}>
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2 text-right">{item.qty}</td>
                    <td className="border p-2 text-right">
                      Rp {item.price.toLocaleString("id-ID")}
                    </td>
                    <td className="border p-2 text-right">
                      Rp {(item.qty * item.price).toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 font-semibold">
                  <td className="border p-2 text-right" colSpan={3}>
                    Subtotal
                  </td>
                  <td className="border p-2 text-right">
                    Rp {subtotal.toLocaleString("id-ID")}
                  </td>
                </tr>
                <tr className="bg-gray-50 font-semibold">
                  <td className="border p-2 text-right" colSpan={3}>
                    Pajak (5%)
                  </td>
                  <td className="border p-2 text-right">
                    Rp {tax.toLocaleString("id-ID")}
                  </td>
                </tr>
                <tr className="bg-gray-100 font-bold">
                  <td className="border p-2 text-right" colSpan={3}>
                    Total
                  </td>
                  <td className="border p-2 text-right">
                    Rp {total.toLocaleString("id-ID")}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}

        {/* Submit Button */}
        <div className="text-right">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Simpan Transaksi
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
