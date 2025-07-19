import React, { useState } from 'react';
import axiosInstance from '../lib/axios';
import { Link, useNavigate } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
import { AiOutlineUnlock } from 'react-icons/ai';
import withBgLogin from '../hoc/withBgLogin';
import { useAuth } from '../provider/authProvider';
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axiosInstance.post("/auth/login", {
        username: formData.username,
        password: formData.password,
      });

      console.log("Full login response:", res.data);
      const accessToken = res.data.data.token;
      const refreshToken = res.data.data.refreshToken;

      // Simpan Token
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      setToken(accessToken);

      // Dapatkan role dari token
      const decoded = jwtDecode(accessToken);
      const role = decoded?.role;

      console.log("Role yang login:", role); // ✅ Untuk memastikan role terdeteksi

      // Redirect berdasarkan role
      if (role === "admin") {
        navigate("admin/dashboard");
      } else if (role === "employee") {
        navigate("employe/dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error("Login Error:", err.response?.data);
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="max-w-sm w-full mx-auto">
      <h1 className="text-3xl text-white font-bold text-center mb-6">Login</h1>
      <form onSubmit={handleSubmit}>
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
            className="absolute left-3 top-2.5 text-sm text-gray-300 transition-all duration-200
              peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm
              peer-focus:top-[-20px] peer-focus:text-xs peer-focus:text-blue-400
              peer-valid:top-[-20px] peer-valid:text-xs peer-valid:text-blue-400"
          >
            Your Username
          </label>
          <BiUser className="absolute right-3 top-3 text-white pointer-events-none" />
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
            className="absolute left-3 top-2.5 text-sm text-gray-300 transition-all duration-200
              peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm
              peer-focus:top-[-20px] peer-focus:text-xs peer-focus:text-blue-400
              peer-valid:top-[-20px] peer-valid:text-xs peer-valid:text-blue-400"
          >
            Your Password
          </label>
          <AiOutlineUnlock className="absolute right-3 top-3 text-white pointer-events-none" />
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-400 text-sm mb-4 text-center">{error}</div>
        )}

        {/* Checkbox & Forgot Password */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-white mb-6 gap-2">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="accent-blue-400" />
            <label htmlFor="remember">Remember Me</label>
          </div>
          <span className="text-blue-300 hover:underline cursor-pointer">
            Forgot Password?
          </span>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-full shadow-md transition duration-300"
        >
          Login
        </button>

        {/* Register Link */}
        <div className="mt-4 text-center text-sm text-white">
          <span>
            New Here?{' '}
            <Link to="/register" className="text-blue-400 hover:underline">
              Create an Account
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default withBgLogin(Login);
