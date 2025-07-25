// src/provider/authProvider.jsx
import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) return null;

  try {
    const res = await axios.get("/api/v1/auth/refresh-token", {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const newAccessToken = res.data?.data?.token;
    if (newAccessToken) {
      localStorage.setItem("access_token", newAccessToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
      return newAccessToken;
    } else {
      throw new Error("Access token baru tidak ditemukan");
    }
  } catch (err) {
    console.error("❌ Refresh token error:", err.message);
    localStorage.clear();
    window.location.href = "/";
    return null;
  }
};

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(() => localStorage.getItem("access_token"));
  const [role, setRole] = useState(null);
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });
  const [initialized, setInitialized] = useState(false);

  const setToken = (newToken) => {
    setToken_(newToken);
    if (newToken) {
      localStorage.setItem("access_token", newToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      fetchUserInfo(newToken);
    } else {
      localStorage.removeItem("access_token");
      setRole(null);
      setUserInfo({ name: "", email: "" });
    }
  };

  const fetchUserInfo = async (accessToken) => {
    try {
      const decoded = jwtDecode(accessToken);
      console.log("🔍 Token decoded:", decoded);

      const userId = decoded?.sub;
      setRole(decoded?.role || null);

      if (userId) {
        const res = await axios.get(`/api/users/${userId}`);
        const user = res.data?.data;
        console.log("✅ User data:", user);

        setUserInfo({
          name: user?.name || "User",
          email: user?.email || "user@example.com",
        });
      }
    } catch (err) {
      console.error("Gagal fetch user:", err.message);
      setUserInfo({ name: "", email: "" });
    }
  };

  useEffect(() => {
    const init = async () => {
      let accessToken = token;

      // Jika tidak ada access token tapi ada refresh token, ambil token baru
      if (!accessToken && localStorage.getItem("refresh_token")) {
        accessToken = await refreshAccessToken();
        setToken_(accessToken); // jangan panggil setToken() di sini untuk hindari fetchUserInfo dua kali
      }

      if (accessToken) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        fetchUserInfo(accessToken);
      } else {
        delete axios.defaults.headers.common["Authorization"];
      }

      setInitialized(true);
    };

    init();
  }, []);

  const contextValue = useMemo(
    () => ({ token, role, userInfo, setToken }),
    [token, role, userInfo]
  );

  if (!initialized) return null;

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export { refreshAccessToken };
export default AuthProvider;
