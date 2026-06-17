import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8080/api",
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

export const WS_URL = "ws://localhost:8080/ws/attendance";