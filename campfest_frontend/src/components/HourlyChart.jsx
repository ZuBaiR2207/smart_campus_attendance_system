import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

export default function HourlyChart({ data }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <p className="text-sm font-medium text-gray-700 mb-4">Registrations Over Time</p>
            <ResponsiveContainer width="100%" height={220}>
                <BarChart data={data}>
                    <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                    <Tooltip />
                    <Bar
                        dataKey="count"
                        fill="#4F46E5"
                        radius={[4, 4, 0, 0]}
                        animationDuration={600}
                        animationEasing="ease-out"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}