import axios from "axios";
import i18n from "../locales/i18n";

// Configure axios instance with base URL
const api = axios.create({
  baseURL: "https://spiritual.brmjatech.uk/api",
});

// Add a request interceptor to include Accept-Language header
api.interceptors.request.use(
  (config) => {
    const language = i18n.language || "ar";
    config.headers["Accept-Language"] = language === "ar" ? "ar" : "en";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
