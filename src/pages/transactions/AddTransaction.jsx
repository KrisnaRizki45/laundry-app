import React, { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios"; // pastikan path sesuai
import { useNavigate } from "react-router-dom";
// import Sidebar from "../../components/EmployeSidebar";

const AddTransaction = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch customers & products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerRes = await axiosInstance.get("/customers");
        const productRes = await axiosInstance.get("/products");
        setCustomers(customerRes.data.data || []);
        setProducts(productRes.data.data || []);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddItem = () => {
    if (!selectedProduct || quantity <= 0) return;
    const product = products.find((p) => p.id === selectedProduct);
    const newItem = {
      product,
      qty: parseInt(quantity),
      price: product.price,
    };
    setItems([...items, newItem]);
    setSelectedProduct("");
    setQuantity(1);
  };

  const handleSubmit = async () => {
  if (!selectedCustomer || items.length === 0) return;

  const payload = {
    customerId: selectedCustomer,
    billDetails: items.map((item) => ({
      product: {
        id: item.product.id,
      },
      qty: item.qty,
    })),
  };

  try {
    setLoading(true);
    console.log("Submitting payload:", JSON.stringify(payload, null, 2));
    const res = await axiosInstance.post("/bills", payload);
    alert("Transaction Created!");
    console.log("Created Bill:", res.data);
    navigate("/employe/transaction");
  } catch (err) {
    console.error("Create error:", err.response?.data || err.message);
    alert("Failed to create transaction.");
  } finally {
    setLoading(false);
  }
};


  const total = items.reduce((acc, item) => acc + item.qty * item.price, 0);

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans">
      {/* <Sidebar className="w-full md:w-64" /> */}

      <main className="flex-1 bg-gray-50 p-6 flex justify-center items-start">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Transaction</h1>

          {/* Customer */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Customer</label>
            <select
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Customer</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} - {c.phoneNumber}
                </option>
              ))}
            </select>
          </div>

          {/* Add Item */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Product</label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Product</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} - Rp{p.price.toLocaleString("id-ID")}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            onClick={handleAddItem}
            className="mb-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition"
          >
            Add Item
          </button>

          {/* Items Table */}
          {items.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Items</h2>
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-4 py-2 text-gray-700">Item</th>
                    <th className="text-left px-4 py-2 text-gray-700">Quantity</th>
                    <th className="text-left px-4 py-2 text-gray-700">Price</th>
                    <th className="text-left px-4 py-2 text-gray-700">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr key={i} className="border-t">
                      <td className="px-4 py-2 text-gray-800">{item.product.name}</td>
                      <td className="px-4 py-2 text-gray-600">{item.qty}</td>
                      <td className="px-4 py-2 text-gray-600">Rp{item.price.toLocaleString("id-ID")}</td>
                      <td className="px-4 py-2 text-gray-600">
                        Rp{(item.qty * item.price).toLocaleString("id-ID")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Summary */}
          <div className="mb-6 space-y-2">
            <div className="flex justify-between font-bold text-base text-gray-800">
              <span>Total</span>
              <span>Rp{total.toLocaleString("id-ID")}</span>
            </div>
          </div>

          {/* Submit */}
          <div className="text-right">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300"
            >
              {loading ? "Processing..." : "Create Transaction"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddTransaction;
