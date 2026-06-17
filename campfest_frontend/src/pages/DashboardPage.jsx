import { useEffect, useRef, useState } from "react";
import { fetchStats, WS_URL } from "../api/api";
import StatCard from "../components/StatCard";
import HourlyChart from "../components/HourlyChart";
import DepartmentBars from "../components/DepartmentBars";
import RecentList from "../components/RecentList";

export default function DashboardPage() {
    const [stats, setStats] = useState(null);
    const [connected, setConnected] = useState(false);
    const wsRef = useRef(null);

    // Initial load via REST
    useEffect(() => {
        fetchStats().then(setStats).catch(console.error);
    }, []);

    // Live updates via WebSocket
    useEffect(() => {
        function connect() {
            const ws = new WebSocket(WS_URL);
            wsRef.current = ws;

            ws.onopen = () => setConnected(true);

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data.totalAttendees !== undefined) {
                        setStats(data);
                    }
                } catch {
                    // ignore non-JSON (e.g. "pong")
                }
            };

            ws.onclose = () => {
                setConnected(false);
                setTimeout(connect, 3000); // auto-reconnect
            };

            ws.onerror = () => ws.close();
        }

        connect();
        return () => wsRef.current?.close();
    }, []);

    // Keep-alive ping every 25s
    useEffect(() => {
        const interval = setInterval(() => {
            if (wsRef.current?.readyState === WebSocket.OPEN) {
                wsRef.current.send("ping");
            }
        }, 25000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            🎓 ALFA IT Festival — Live Attendance
                        </h1>
                        <p className="text-sm text-gray-500">Real-time check-in dashboard</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span
                            className={`w-2 h-2 rounded-full ${connected ? "bg-green-500 animate-pulse" : "bg-gray-300"
                                }`}
                        />
                        <span className="text-xs text-gray-500">
                            {connected ? "Live" : "Connecting..."}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <StatCard
                        label="Total Checked In"
                        value={stats?.totalAttendees ?? "—"}
                    />
                    <StatCard
                        label="Departments"
                        value={Object.keys(stats?.departmentBreakdown || {}).length}
                    />
                    <StatCard
                        label="Status"
                        value={connected ? "Live" : "Offline"}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <HourlyChart data={stats?.hourlyBreakdown || []} />
                    <DepartmentBars data={stats?.departmentBreakdown} />
                </div>

                <RecentList attendees={stats?.recentAttendees} />
            </div>
        </div>
    );
}