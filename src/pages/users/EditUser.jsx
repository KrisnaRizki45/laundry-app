import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../lib/axios";
// import Sidebar from "../../components/EmployeSidebar"; // Uncomment if needed

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(`/users/${id}`);
        const data = res.data.data;
        setName(data.name || "");
        setUsername(data.username || "");
        setRole(data.role || "");
        setEmail(data.email || "");
        // phone tidak ada di API
      } catch (err) {
        console.error("Gagal mengambil data user:", err);
      }
    };

    fetchUser();
  }, [id]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await axiosInstance.put(`/users`, {
        id, 
        name,
        username,
        role,
        email,
      });
      alert("User berhasil diupdate");
      navigate("/admin/users");
    } catch (err) {
      console.error("Gagal update user:", err);
      alert("Terjadi kesalahan saat update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans bg-gray-50">
      {/* Sidebar
      <Sidebar className="w-full md:w-64" /> */}

      <main className="flex-1 p-6 flex justify-center items-start">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-4">
            <span className="hover:underline cursor-pointer">Users</span>
            <span className="mx-1">/</span>
            <span className="text-gray-800 font-semibold">Edit User</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit User</h1>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              placeholder="Enter user name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter user name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Role</label>
            <input
              type="text"
              placeholder="Enter role"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          

          {/* Submit */}
          <div className="text-right">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300"
            >
              {loading ? "Updating..." : "Update User"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditUser;
