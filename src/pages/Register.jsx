import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axios";
import { BiUser } from "react-icons/bi";
import { AiOutlineUnlock } from "react-icons/ai";
import withBgLogin from "../hoc/withBgLogin";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Password and Confirm Password do not match.");
      return;
    }

    try {
      console.log("Form Data:", formData);
      await axiosInstance.post("/auth/register", {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      navigate("/");
    } catch (err) {
      console.error("Error Response:", err.response?.data);
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="max-w-sm w-full p-3">
      <h1 className="text-3xl text-white font-bold text-center mb-6">
        Register
      </h1>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="relative mb-6">
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="peer block w-full py-2.5 px-3 text-sm text-white bg-transparent border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-transparent"
            placeholder="Your Full Name"
          />
          <label
            htmlFor="name"
            className="absolute left-2 top-2.5 text-sm text-gray-300 transition-all duration-200
              peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm
              peer-focus:top-[-20px] peer-focus:text-xs peer-focus:text-blue-400"
          >
            Full Name
          </label>
        </div>

        {/* Username */}
        <div className="relative mb-6">
          <input
            type="text"
            id="username"
            required
            value={formData.username}
            onChange={handleChange}
            className="peer block w-full py-2.5 px-3 text-sm text-white bg-transparent border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-transparent"
            placeholder="Your Username"
          />
          <label
            htmlFor="username"
            className="absolute left-2 top-2.5 text-sm text-gray-300 transition-all duration-200
              peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm
              peer-focus:top-[-20px] peer-focus:text-xs peer-focus:text-blue-400"
          >
            Username
          </label>
        </div>

        {/* Email */}
        <div className="relative mb-6">
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="peer block w-full py-2.5 px-3 text-sm text-white bg-transparent border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-transparent"
            placeholder="Your Email"
          />
          <label
            htmlFor="email"
            className="absolute left-2 top-2.5 text-sm text-gray-300 transition-all duration-200
              peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm
              peer-focus:top-[-20px] peer-focus:text-xs peer-focus:text-blue-400"
          >
            Email
          </label>
        </div>

        {/* Password */}
        <div className="relative mb-6">
          <input
            type="password"
            id="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="peer block w-full py-2.5 px-3 text-sm text-white bg-transparent border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-transparent"
            placeholder="Your Password"
          />
          <label
            htmlFor="password"
            className="absolute left-2 top-2.5 text-sm text-gray-300 transition-all duration-200
              peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm
              peer-focus:top-[-20px] peer-focus:text-xs peer-focus:text-blue-400"
          >
            Password
          </label>
        </div>

        {/* Confirm Password */}
        <div className="relative mb-6">
          <input
            type="password"
            id="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="peer block w-full py-2.5 px-3 text-sm text-white bg-transparent border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-transparent"
            placeholder="Confirm Password"
          />
          <label
            htmlFor="confirmPassword"
            className="absolute left-2 top-2.5 text-sm text-gray-300 transition-all duration-200
              peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm
              peer-focus:top-[-20px] peer-focus:text-xs peer-focus:text-blue-400"
          >
            Confirm Password
          </label>
        </div>

        {/* Role */}
        <div className="relative mb-6">
          <select
            id="role"
            required
            value={formData.role}
            onChange={handleChange}
            className="block w-full py-2.5 px-3 text-sm text-white bg-transparent border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="" disabled hidden>
              Pilih Role
            </option>
            <option value="admin" className="text-black">
              Admin
            </option>
            <option value="employee" className="text-black">
              Employee
            </option>
          </select>
          <label
            htmlFor="role"
            className="absolute left-2 top-2.5 text-sm text-gray-300 transition-all duration-200
              peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm
              peer-focus:top-[-20px] peer-focus:text-xs peer-focus:text-blue-400"
          >
            Role
          </label>
        </div>

        {/* Error message */}
        {error && (
          <div className="text-red-400 text-sm mb-4 text-center">{error}</div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-full shadow-md transition duration-300"
        >
          Register
        </button>

        {/* Link to login */}
        <div className="mt-4 text-center text-sm text-white">
          <span>
            Already have an account?{" "}
            <Link to="/" className="text-blue-400 hover:underline">
              Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default withBgLogin(Register);
