import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../lib/axios";
// import Sidebar from "../../components/EmployeSidebar"; // aktifkan jika digunakan

const TransactionDetails = () => {
  const { id } = useParams(); // ambil id dari URL
  const [bill, setBill] = useState(null);

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const res = await axiosInstance.get(`/bills/${id}`);
        setBill(res.data.data);
      } catch (error) {
        console.error("Failed to fetch bill details:", error);
      }
    };
    fetchBill();
  }, [id]);

  if (!bill) return <div className="p-10">Loading...</div>;

  const totalAmount = bill.billDetails.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* <Sidebar /> */}

      <main className="flex-1 px-16 py-10">
        <div className="mb-6">
          <h1 className="text-[32px] font-bold text-[#111518] mb-1">Transaction Details</h1>
          <p className="text-sm text-[#617689]">View detailed information about a specific transaction.</p>
        </div>

        {/* Transaction Info */}
        <section className="pt-4">
          <h3 className="text-lg font-bold text-[#111518] pb-2">Transaction Information</h3>
          <div className="grid grid-cols-[20%_1fr] gap-x-6">
            <InfoRow label="Transaction ID" value={bill.id} />
            <InfoRow label="Date" value={new Date(bill.billDate).toLocaleString()} />
            <InfoRow label="Status" value="Completed" />
            <InfoRow label="Total Amount" value={`Rp ${totalAmount.toLocaleString("id-ID")}`} />
          </div>
        </section>

        {/* Customer Info */}
        <section className="pt-4">
          <h3 className="text-lg font-bold text-[#111518] pb-2">Customer Information</h3>
          <div className="grid grid-cols-[20%_1fr] gap-x-6">
            <InfoRow label="Name" value={bill.customer.name} />
            <InfoRow label="Phone" value={bill.customer.phoneNumber} />
            <InfoRow label="Address" value={bill.customer.address} />
          </div>
        </section>

        {/* Items */}
        <section className="pt-4">
          <h3 className="text-lg font-bold text-[#111518] pb-2">Items</h3>
          <div className="overflow-hidden rounded-lg border border-[#dbe1e6] bg-white">
            <table className="w-full">
              <thead className="bg-white">
                <tr>
                  <TableHeader label="Item" />
                  <TableHeader label="Type" />
                  <TableHeader label="Qty" />
                  <TableHeader label="Price per Unit" />
                  <TableHeader label="Subtotal" />
                </tr>
              </thead>
              <tbody>
                {bill.billDetails.map((item) => (
                  <TableRow
                    key={item.id}
                    item={item.product.name}
                    type={item.product.type}
                    qty={item.qty}
                    price={item.price}
                    subtotal={item.qty * item.price}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

// Info row for Transaction & Customer
const InfoRow = ({ label, value }) => (
  <div className="col-span-2 grid grid-cols-subgrid border-t border-[#dbe1e6] py-4">
    <p className="text-sm text-[#617689]">{label}</p>
    <p className="text-sm text-[#111518]">{value}</p>
  </div>
);

// Table header column
const TableHeader = ({ label }) => (
  <th className="px-4 py-3 text-left text-[#111518] text-sm font-medium">{label}</th>
);

// Row for item table
const TableRow = ({ item, type, qty, price, subtotal }) => (
  <tr className="border-t border-[#dbe1e6]">
    <td className="px-4 py-2 text-sm text-[#111518]">{item}</td>
    <td className="px-4 py-2 text-sm text-[#617689]">{type}</td>
    <td className="px-4 py-2 text-sm text-[#617689]">{qty}</td>
    <td className="px-4 py-2 text-sm text-[#617689]">Rp {price.toLocaleString("id-ID")}</td>
    <td className="px-4 py-2 text-sm text-[#111518] font-medium">Rp {subtotal.toLocaleString("id-ID")}</td>
  </tr>
);

export default TransactionDetails;
