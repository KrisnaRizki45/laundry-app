import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../lib/axios"; // Ganti dari axios biasa

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/users");
      console.log("All users response:", res.data);
      const userList = res.data.data || [];
      setUsers(userList);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  fetchData();
}, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users
    .map((u) => ({
      ...u,
      status: "Active",
      lastActive: "Today",
    }))
    .filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="flex flex-col flex-1 p-6 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-[#111518]">Users</h1>
        <Link
          to="/admin/users/add"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition duration-300"
        >
          Add User
        </Link>
      </div>

      <div className="mb-4">
        <label className="w-full h-12 flex rounded-xl bg-[#f0f2f4] overflow-hidden">
          <div className="flex items-center justify-center pl-4 text-[#617689]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search users"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 bg-[#f0f2f4] focus:outline-none text-[#111518] placeholder-[#617689]"
          />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-[#dbe1e6] rounded-xl overflow-hidden">
          <thead className="bg-white">
            <tr className="text-left text-[#111518] text-sm font-medium">
              <th className="px-4 py-3 w-[400px]">Nama</th>
              <th className="px-4 py-3 w-[400px]">Nama Pengguna</th>
              <th className="px-4 py-3 w-[400px]">Email</th>
              <th className="px-4 py-3 w-[400px]">Peran</th>
              <th className="px-4 py-3 w-70">Status</th>
              <th className="px-4 py-3 w-60 text-[#111518]">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-t border-[#dbe1e6]">
                <td className="px-4 py-2 text-sm text-[#111518]">{user.name}</td>
                <td className="px-4 py-2 text-sm text-[#111518]">{user.username}</td>
                <td className="px-4 py-2 text-sm text-[#111518]">{user.email}</td>
                <td className="px-4 py-2 text-sm text-[#617689]">{user.role}</td>
                <td className="px-4 py-2 text-sm">
                  <div className="flex justify-start mr-auto">
                    <button
                      className={`w-20 px-4 py-1 rounded-xl text-sm font-medium ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </button>
                  </div>
                </td>
                <td className="px-4 py-2 text-sm font-semibold">
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/admin/users/details/${user.id}`}
                      className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
                    >
                      View
                    </Link>
                    <span className="text-gray-400">|</span>
                    <Link
                      to={`/admin/users/Edit/${user.id}`}
                      className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
                    >
                      Edit
                    </Link>
                    <span className="text-gray-400">|</span>
                    <Link
                      to="#"
                      className="text-blue-500 hover:text-red-600 transition-colors duration-300"
                    >
                      Delete
                    </Link>
                  </div>
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-[#617689]">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
