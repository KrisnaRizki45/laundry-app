import React from "react";
import Sidebar from "../../components/EmployeSidebar";

const EditUser = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans bg-gray-50">
      {/* Sidebar
      <Sidebar className="w-full md:w-64" /> */}

      {/* Main Content */}
      <main className="flex-1 p-6 flex justify-center items-start">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-4">
            <span className="hover:underline cursor-pointer">Users</span>
            <span className="mx-1">/</span>
            <span className="text-gray-800 font-semibold">Edit User</span>
          </div>

          {/* Judul */}
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit User</h1>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              placeholder="Enter user name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Role</label>
            <input
              type="text"
              placeholder="Enter role"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Phone</label>
            <input
              type="text"
              placeholder="Enter phone number"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300">
              Update User
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditUser;
