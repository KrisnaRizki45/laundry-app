import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/EmployeSidebar";

const AddUser = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans bg-gray-50">
      {/* Sidebar
      <Sidebar className="w-full md:w-64" /> */}

      {/* Main Content */}
      <main className="flex-1 p-6 flex justify-center items-start">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Add User</h1>
            <Link
              to="admin/users"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium py-2 px-4 rounded transition duration-300"
            >
              Back to Users
            </Link>
          </div>

          {/* Form Fields */}
          <form className="space-y-5 text-gray-800">
            {/* Name */}
            <div>
              <label className="block mb-2 font-medium">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block mb-2 font-medium">Role</label>
              <div className="flex items-stretch rounded-lg border border-gray-300 overflow-hidden">
                <input
                  type="text"
                  placeholder="Select role"
                  className="flex-1 px-4 py-3 text-sm placeholder-gray-400 focus:outline-none"
                />
                <div className="px-3 flex items-center bg-white border-l border-gray-300 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-2 font-medium">Phone</label>
              <input
                type="text"
                placeholder="Enter phone"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div className="text-right">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddUser;
