import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../../lib/axios"; // pastikan path ini sesuai
// import Sidebar from "../../components/EmployeSidebar"; // aktifkan jika sidebar dipakai

const UserDetails = () => {
  const { id } = useParams(); // ambil id dari URL
  const [user, setUser] = useState(null); // state untuk data user
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/users/${id}`);
        setUser(response.data); // sesuaikan jika response nested misal: response.data.data
      } catch (err) {
        setError("Gagal mengambil data user.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <p className="p-4">Loading user data...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;
  if (!user) return <p className="p-4">User tidak ditemukan.</p>;

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Main Content */}
      <main className="flex-1 px-16 py-10">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-[32px] font-bold text-[#111518] mb-1">User Details</h1>
          <p className="text-sm text-[#617689]">View and manage user information</p>
        </div>

        {/* Personal Info */}
        <section className="pt-4">
          <h3 className="text-lg font-bold text-[#111518] pb-2">Personal Information</h3>
          <div className="grid grid-cols-[20%_1fr] gap-x-6">
            <InfoRow label="Name" value={user.id || "-"} />
            <InfoRow label="Name" value={user.name || "-"} />
            <InfoRow label="Role" value={user.role || "-"} />
            <InfoRow label="Email" value={user.email || "-"} />
            <InfoRow label="Address" value={user.address || "-"} />
          </div>
        </section>

        {/* Additional Info */}
        <section className="pt-4">
          <h3 className="text-lg font-bold text-[#111518] pb-2">Additional Information</h3>
          <div className="grid grid-cols-[20%_1fr] gap-x-6">
            <InfoRow label="Joined Date" value={formatDate(user.createdAt)} />
            <InfoRow label="Last Login" value={formatDate(user.lastLogin)} />
          </div>
        </section>

        {/* Action */}
        <div className="pt-6 text-right">
          <Link to={`/admin/users/edit/${user.id}`}>
            <button className="bg-[#197fe5] hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300">
              Edit User
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

// Reusable row component
const InfoRow = ({ label, value }) => (
  <div className="col-span-2 grid grid-cols-subgrid border-t border-[#dbe1e6] py-5">
    <p className="text-sm text-[#617689]">{label}</p>
    <p className="text-sm text-[#111518]">{value}</p>
  </div>
);

// Format date to readable string
const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

export default UserDetails;
