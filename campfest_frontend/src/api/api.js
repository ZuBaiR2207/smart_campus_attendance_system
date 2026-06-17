import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { "Content-Type": "application/json" },
});

export async function registerAttendee({ name, email, department }) {
    try {
        const res = await apiClient.post("/register", { name, email, department });
        return res.data;
    } catch (err) {
        const message = err.response?.data?.message || "Registration failed";
        throw new Error(message);
    }
}

export async function fetchStats() {
    const res = await apiClient.get("/stats");
    return res.data;
}

export const WS_URL = import.meta.env.VITE_WS_URL;