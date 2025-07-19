import React from "react";
import Sidebar from "../../components/EmployeSidebar"; // sesuaikan jika perlu
import { Link } from "react-router-dom";

const UserDetails = () => {
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
            <InfoRow label="Name" value="John Doe" />
            <InfoRow label="Role" value="Administrator" />
            <InfoRow label="Email" value="john.doe@example.com" />
            <InfoRow label="Phone" value="+62 812-3456-7890" />
            <InfoRow label="Address" value="Jl. Sukarasa No. 123, Bandung" />
          </div>
        </section>

        {/* Additional Info */}
        <section className="pt-4">
          <h3 className="text-lg font-bold text-[#111518] pb-2">Additional Information</h3>
          <div className="grid grid-cols-[20%_1fr] gap-x-6">
            <InfoRow label="Joined Date" value="May 5, 2023" />
            <InfoRow label="Last Login" value="July 10, 2025 at 09:42 AM" />
          </div>
        </section>

        {/* Action */}
        <div className="pt-6 text-right">
          <button className="bg-[#197fe5] hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300">
            <Link to="/admin/users/edit">
                Edit User
            </Link>
          </button>
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

export default UserDetails;
