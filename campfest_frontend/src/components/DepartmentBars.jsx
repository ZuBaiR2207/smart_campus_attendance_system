const GRADIENTS = [
    ["#6366F1", "#8B5CF6"],
    ["#06B6D4", "#3B82F6"],
    ["#F97316", "#EF4444"],
    ["#10B981", "#059669"],
    ["#EC4899", "#A855F7"],
    ["#EAB308", "#F97316"],
];

export default function DepartmentBars({ data }) {
    const entries = Object.entries(data || {}).sort(([, a], [, b]) => b - a);
    const max = Math.max(...entries.map(([, v]) => v), 1);
    const total = entries.reduce((acc, [, v]) => acc + v, 0);

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-5">
                <p className="text-sm font-semibold text-gray-800">By Department</p>
                {total > 0 && (
                    <span className="text-xs text-gray-400 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded-full">
                        {total} total
                    </span>
                )}
            </div>
            <div className="space-y-4">
                {entries.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-8">No data yet</p>
                )}
                {entries.map(([dept, count], i) => {
                    const [from, to] = GRADIENTS[i % GRADIENTS.length];
                    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                    return (
                        <div key={dept}>
                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-xs text-gray-600 truncate max-w-[175px]">{dept}</span>
                                <div className="flex items-center gap-2.5 flex-shrink-0">
                                    <span className="text-xs text-gray-400">{pct}%</span>
                                    <span className="text-xs font-bold text-gray-900 w-5 text-right">{count}</span>
                                </div>
                            </div>
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-700 ease-out"
                                    style={{
                                        width: `${(count / max) * 100}%`,
                                        background: `linear-gradient(to right, ${from}, ${to})`,
                                        boxShadow: `0 0 8px ${from}50`,
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}