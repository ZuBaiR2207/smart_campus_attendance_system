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
        <div className="min-h-screen bg-slate-50 px-6 py-8">
            {/* Subtle dot-grid overlay */}
            <div className="fixed inset-0 bg-[radial-gradient(rgba(99,102,241,0.07)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
            {/* Ambient glow blobs */}
            <div className="fixed top-0 left-1/4 w-96 h-96 bg-indigo-300/25 rounded-full blur-3xl pointer-events-none" />
            <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-purple-300/25 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto relative">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-lg shadow-lg shadow-indigo-500/30">
                                🎓
                            </div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-clip-text text-transparent tracking-tight">
                                ALFA IT Festival 2026
                            </h1>
                        </div>
                        <p className="text-sm text-gray-500 ml-12">Real-time attendance dashboard</p>
                    </div>
                    <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all duration-500 ${
                        connected
                            ? "bg-green-50 border-green-200 text-green-600"
                            : "bg-gray-100 border-gray-200 text-gray-400"
                    }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${connected ? "bg-green-500 animate-pulse" : "bg-gray-400"}`} />
                        {connected ? "Live" : "Connecting…"}
                    </div>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <StatCard
                        label="Total Checked In"
                        value={stats?.totalAttendees ?? "—"}
                        icon="👥"
                        accent="indigo"
                    />
                    <StatCard
                        label="Departments"
                        value={Object.keys(stats?.departmentBreakdown || {}).length}
                        icon="🏛️"
                        accent="purple"
                    />
                    <StatCard
                        label="Connection"
                        value={connected ? "Live" : "Offline"}
                        icon={connected ? "📡" : "⚠️"}
                        accent={connected ? "green" : "red"}
                    />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <HourlyChart data={stats?.hourlyBreakdown || []} />
                    <DepartmentBars data={stats?.departmentBreakdown} />
                </div>

                <RecentList attendees={stats?.recentAttendees} />

                {/* Footer */}
                <p className="text-center text-xs text-gray-400 mt-8">
                    ALFA IT Festival 2026 · Smart Campus Attendance System · Developed by Zubair
                </p>
            </div>
        </div>
    );
}