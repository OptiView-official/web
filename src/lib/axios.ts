import axios from "axios";
import { env } from "@/env.js";

// Retrieve backend API URL
const getApiUrl = () => {
  // Use a relative path on the client so Next.js rewrites handle proxying
  if (typeof window !== "undefined") {
    return ""; // Rely on Next.js rewrite rules
  }
  // On the server, use the environment variable or fall back to localhost
  // Prefer NEXT_PUBLIC_API_URL when defined; otherwise default to localhost
  return env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
};

// Create an Axios instance
export const apiClient = axios.create({
  baseURL: getApiUrl(),
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth tokens or other headers here if needed
    return config;
  },
  (error: unknown) => {
    return Promise.reject(error instanceof Error ? error : new Error(String(error)));
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: unknown) => {
    console.error("API Error:", error);

    // Unified error handling
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { data?: { error?: string } } };
      // Server responded with an error status
      const message = axiosError.response?.data?.error ?? "Request failed";
      return Promise.reject(new Error(message));
    } else if (error && typeof error === 'object' && 'request' in error) {
      // Request was sent but no response received
      return Promise.reject(new Error("Network error, please check your connection"));
    } else {
      // Other errors
      return Promise.reject(new Error("Request configuration error"));
    }
  }
);
