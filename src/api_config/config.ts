import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: "/" });

// Create an Axios instance
export const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // Replace with your API base URL
  timeout: 10000, // Timeout after 10 seconds
  headers: {
    "Content-Type": "application/json",
    // Add other custom headers if needed
  },
  withCredentials: true, // Send cookies if needed (CORS-safe)
});

// Request interceptor (e.g., for auth tokens)
api.interceptors.request.use(
  (config) => {
    const access_token = cookies.get("access_token"); // Or wherever you store your auth token
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (e.g., for error handling)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    if (error.response) {
      console.error("API error:", error.response.data);
    } else {
      console.error("Network error:", error.message);
    }
    return Promise.reject(error);
  }
);
