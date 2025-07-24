import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/EmployeSidebar";
import useTransaction from "../../hooks/useTransaction";

const TransactionList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { transactions } = useTransaction();

  const filteredTransactions = transactions.filter(
    (tx) =>
      tx.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      new Date(tx.billDate).toLocaleDateString("id-ID").includes(searchTerm)
  );

  return (
    <div className="flex flex-col md:flex-row w-full font-sans">
      <div className="flex-1 bg-white p-6">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Transactions</h1>
          <div className="flex items-center gap-2 w-full md:w-auto">
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
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition duration-300">
              New Transaction
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-300">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Customer Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((tx, index) => {
                const totalAmount = tx.billDetails.reduce(
                  (sum, item) => sum + item.qty * item.price,
                  0
                );

                const formattedDate = new Date(tx.billDate).toLocaleDateString(
                  "id-ID",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                );

                return (
                  <tr key={tx.id || index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{formattedDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{tx.customer.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Rp {totalAmount.toLocaleString("id-ID")}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">
                      <div className="flex items-center space-x-2 text-sm font-semibold">
                        <Link
                          to={`employe/transaction/details/${tx.id}`}
                          className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
                        >
                          View
                        </Link>
                        <span className="text-gray-400">|</span>
                        <Link
                          to={`/transactions/delete/${tx.id}`}
                          className="text-blue-500 hover:text-red-600 transition-colors duration-300"
                        >
                          Delete
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No transactions found.
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

export default TransactionList;
