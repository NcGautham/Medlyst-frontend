// src/api/api.ts
import axios from "axios";

const baseURL = (import.meta.env?.VITE_API_URL ?? process.env.VITE_API_URL) || "http://localhost:5001";

const api = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
    timeout: 15000,
});

api.interceptors.response.use(
    (r) => r,
    (err) => {
        const body = err?.response?.data ?? err?.message ?? err;
        return Promise.reject(body);
    }
);

export default api;
