import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL?.trim(),
  withCredentials: true,
});

const clearStoredTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

const getStoredAccessToken = () => {
  const token = localStorage.getItem("accessToken");
  if (!token || token === "undefined" || token === "null") {
    localStorage.removeItem("accessToken");
    return null;
  }
  return token;
};

API.interceptors.request.use(
  (config) => {
    const token = getStoredAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      originalRequest.url?.includes("/auth/refresh-Token") ||
      originalRequest.url?.includes("/auth/loginUser")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken || refreshToken === "undefined") {
      clearStoredTokens();
      return Promise.reject(error);
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL?.trim()}/auth/refresh-Token`,
        { refreshToken },
        { withCredentials: true },
      );
      const { accessToken, refreshToken: newRefreshToken } = data.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", newRefreshToken);
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return API(originalRequest);
    } catch (refreshError) {
      clearStoredTokens();
      return Promise.reject(refreshError);
    }
  },
);

export default API;
