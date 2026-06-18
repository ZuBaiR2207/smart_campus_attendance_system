import { useEffect, useRef, useState } from "react";

const AVATAR_GRADIENTS = [
    "from-indigo-500 to-purple-600",
    "from-cyan-500 to-blue-600",
    "from-orange-500 to-red-500",
    "from-emerald-500 to-teal-600",
    "from-pink-500 to-rose-600",
    "from-amber-500 to-orange-600",
];

function hashName(name) {
    let h = 0;
    for (const c of name) h = (h * 31 + c.charCodeAt(0)) & 0xffffffff;
    return Math.abs(h);
}

export default function RecentList({ attendees }) {
    const [newIds, setNewIds] = useState(new Set());
    const prevIds = useRef(new Set());

    useEffect(() => {
        if (!attendees) return;

        const currentIds = new Set(attendees.map((a) => a.id));
        const added = attendees
            .filter((a) => !prevIds.current.has(a.id))
            .map((a) => a.id);

        if (added.length > 0 && prevIds.current.size > 0) {
            setNewIds(new Set(added));
            const t = setTimeout(() => setNewIds(new Set()), 2000);
            return () => clearTimeout(t);
        }

        prevIds.current = currentIds;
    }, [attendees]);

    useEffect(() => {
        if (attendees) {
            prevIds.current = new Set(attendees.map((a) => a.id));
        }
    }, [attendees]);

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-5">
                <p className="text-sm font-semibold text-gray-800">Recent Check-ins</p>
                {attendees?.length > 0 && (
                    <span className="text-xs text-gray-400 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded-full">
                        {attendees.length} shown
                    </span>
                )}
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {(!attendees || attendees.length === 0) && (
                    <div className="text-center py-10">
                        <p className="text-3xl mb-2">📡</p>
                        <p className="text-sm text-gray-400">Waiting for first check-in…</p>
                    </div>
                )}
                {attendees?.map((a) => {
                    const isNew = newIds.has(a.id);
                    const initials = a.name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
                    const gradient = AVATAR_GRADIENTS[hashName(a.name) % AVATAR_GRADIENTS.length];
                    return (
                        <div
                            key={a.id}
                            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 border transition-all duration-500 ${
                                isNew
                                    ? "bg-indigo-50 border-indigo-200"
                                    : "bg-gray-50 border-gray-100 hover:bg-gray-100"
                            }`}
                        >
                            {/* Avatar */}
                            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-xs font-bold text-white flex-shrink-0 shadow-md`}>
                                {initials}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-800 truncate flex items-center gap-2">
                                    {a.name}
                                    {isNew && (
                                        <span className="text-[10px] font-bold bg-green-500/15 text-green-400 border border-green-500/20 px-1.5 py-0.5 rounded-full">
                                            NEW
                                        </span>
                                    )}
                                </p>
                                <p className="text-xs text-gray-500 truncate">{a.email}</p>
                            </div>

                            {/* Department badge */}
                            {a.department && (
                                <span className="hidden sm:block text-[10px] text-gray-500 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full max-w-[110px] truncate flex-shrink-0">
                                    {a.department}
                                </span>
                            )}

                            {/* Time */}
                            <span className="text-[11px] text-gray-400 whitespace-nowrap flex-shrink-0">{a.registeredAt}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}