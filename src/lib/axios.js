import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // /api
});

// ✅ Interceptor REQUEST: tambahkan access token di header sebelum request dikirim
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Interceptor RESPONSE: tangani 401 dan lakukan refresh token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) throw new Error("Refresh token tidak ditemukan");

        // Panggil endpoint refresh token (GET)
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/refresh-token`, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        const newAccessToken = res.data?.data?.accessToken;
        if (!newAccessToken) throw new Error("Token baru tidak ditemukan");

        // Simpan dan pasang token baru
        localStorage.setItem("access_token", newAccessToken);
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // Retry request yang gagal
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token gagal:", refreshError);
        localStorage.clear();
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
