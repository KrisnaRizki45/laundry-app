import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/EmployeSidebar";

const transactionsData = [
  { date: "2024-01-15", name: "Sophia Clark", amount: "$50.00", status: "Completed" },
  { date: "2024-01-16", name: "Ethan Miller", amount: "$75.00", status: "Pending" },
  { date: "2024-01-17", name: "Olivia Davis", amount: "$60.00", status: "Completed" },
  { date: "2024-01-18", name: "Liam Wilson", amount: "$45.00", status: "Completed" },
];

const getStatusColor = (status) => {
  const baseStyle =
    "text-[14px] font-medium px-2 py-[2px] rounded text-center inline-block min-w-[4.5rem]";

  if (status === "Completed")
    return `${baseStyle} bg-green-100 text-green-700`;
  if (status === "Pending")
    return `${baseStyle} bg-yellow-100 text-yellow-700`;

  return `${baseStyle} bg-gray-100 text-gray-600`;
};

const TransactionList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = transactionsData.filter((tx) =>
    tx.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.date.includes(searchTerm)
  );

  return (
    <div className="flex flex-col md:flex-row w-full font-sans">
      {/* <Sidebar className="w-full md:w-64" /> */}

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
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((tx, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{tx.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{tx.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{tx.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center justify-center">
                      <span className={getStatusColor(tx.status)}>{tx.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">
                    <div className="flex items-center space-x-2 text-sm font-semibold">
                      <Link
                        to={`employe/transaction/details`}
                        className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
                      >
                        View
                      </Link>
                      <span className="text-gray-400">|</span>
                      <Link
                        to={`/transactions/delete/${index}`}
                        className="text-blue-500 hover:text-red-600 transition-colors duration-300"
                      >
                        Delete
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
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
