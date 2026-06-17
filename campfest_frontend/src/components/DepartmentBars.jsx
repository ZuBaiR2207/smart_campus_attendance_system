const COLORS = ["#4F46E5", "#0EA5A4", "#F97316", "#3B82F6", "#A855F7", "#EAB308"];

export default function DepartmentBars({ data }) {
    const entries = Object.entries(data || {});
    const max = Math.max(...entries.map(([, v]) => v), 1);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <p className="text-sm font-medium text-gray-700 mb-4">By Department</p>
            <div className="space-y-3">
                {entries.length === 0 && (
                    <p className="text-sm text-gray-400">No data yet</p>
                )}
                {entries.map(([dept, count], i) => (
                    <div key={dept} className="flex items-center gap-3">
                        <span className="text-xs text-gray-600 w-36 truncate">{dept}</span>
                        <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-700 ease-out"
                                style={{
                                    width: `${(count / max) * 100}%`,
                                    backgroundColor: COLORS[i % COLORS.length],
                                }}
                            />
                        </div>
                        <span className="text-xs font-medium text-gray-700 w-6 text-right transition-all duration-300">
                            {count}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}