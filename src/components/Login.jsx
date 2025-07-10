import React from 'react';
import { Link } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
import { AiOutlineUnlock } from 'react-icons/ai';
import withBgLogin from '../hoc/withBgLogin';

const Login = () => {
  return (
    <div className="max-w-sm w-full">
      <h1 className="text-3xl text-white font-bold text-center mb-6">Login</h1>
      <form>
        {/* Input Email */}
        <div className="relative mb-6">
          <input
            type="email"
            id="email"
            required
            className="peer block w-full py-2.5 px-3 text-sm text-white bg-transparent border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-transparent"
            placeholder="Your Email"
          />
          <label
            htmlFor="email"
            className="absolute left-3 top-2.5 text-sm text-gray-300 transition-all duration-200
              peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm
              peer-focus:top-[-20px] peer-focus:text-xs peer-focus:text-blue-400
              peer-valid:top-[-20px] peer-valid:text-xs peer-valid:text-blue-400"
          >
            Your Email
          </label>
          <BiUser className="absolute right-3 top-3 text-white pointer-events-none" />
        </div>

        {/* Input Password */}
        <div className="relative mb-6">
          <input
            type="password"
            id="password"
            required
            className="peer block w-full py-2.5 px-3 text-sm text-white bg-transparent border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-transparent "
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

        {/* Checkbox & Forgot */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-white mb-6 gap-2">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="accent-blue-400" />
            <label htmlFor="remember">Remember Me</label>
          </div>
          <span className="text-blue-300 hover:underline cursor-pointer">Forgot Password?</span>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-full shadow-md transition duration-300"
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
