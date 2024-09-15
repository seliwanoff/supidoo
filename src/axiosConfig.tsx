// src/axiosConfig.ts
import axios from "axios";

axios.defaults.baseURL = "https://api.supidoo.com/api/"; // Replace with your API base URL

// Set up an interceptor to include the token in all requests
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
