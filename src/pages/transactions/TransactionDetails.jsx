import React from "react";
import Sidebar from "../../components/EmployeSidebar"; // pastikan path-nya sesuai struktur proyekmu

const TransactionDetails = () => {
  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Sidebar
      <Sidebar /> */}

      {/* Main Content */}
      <main className="flex-1 px-16 py-10">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-[32px] font-bold text-[#111518] mb-1">Transaction Details</h1>
          <p className="text-sm text-[#617689]">View detailed information about a specific transaction.</p>
        </div>

        {/* Transaction Info */}
        <section className="pt-4">
          <h3 className="text-lg font-bold text-[#111518] pb-2">Transaction Information</h3>
          <div className="grid grid-cols-[20%_1fr] gap-x-6">
            <InfoRow label="Transaction ID" value="#123456" />
            <InfoRow label="Date" value="July 20, 2024" />
            <InfoRow label="Status" value="Completed" />
            <InfoRow label="Total Amount" value="$50.00" />
          </div>
        </section>

        {/* Customer Info */}
        <section className="pt-4">
          <h3 className="text-lg font-bold text-[#111518] pb-2">Customer Information</h3>
          <div className="grid grid-cols-[20%_1fr] gap-x-6">
            <InfoRow label="Name" value="Sophia Clark" />
            <InfoRow label="Email" value="sophia.clark@example.com" />
            <InfoRow label="Phone" value="(555) 123-4567" />
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
                  <TableHeader label="Quantity" />
                  <TableHeader label="Price" />
                </tr>
              </thead>
              <tbody>
                <TableRow item="Shirts" qty="5" price="$10.00" />
                <TableRow item="Pants" qty="3" price="$15.00" />
                <TableRow item="Socks" qty="10" price="$5.00" />
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="col-span-2 grid grid-cols-subgrid border-t border-[#dbe1e6] py-5">
    <p className="text-sm text-[#617689]">{label}</p>
    <p className="text-sm text-[#111518]">{value}</p>
  </div>
);

const TableHeader = ({ label }) => (
  <th className="px-4 py-3 text-left text-[#111518] text-sm font-medium">{label}</th>
);

const TableRow = ({ item, qty, price }) => (
  <tr className="border-t border-[#dbe1e6]">
    <td className="px-4 py-2 text-sm text-[#111518]">{item}</td>
    <td className="px-4 py-2 text-sm text-[#617689]">{qty}</td>
    <td className="px-4 py-2 text-sm text-[#617689]">{price}</td>
  </tr>
);

export default TransactionDetails;
