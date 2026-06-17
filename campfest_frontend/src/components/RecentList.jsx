import { useEffect, useRef, useState } from "react";

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
            const t = setTimeout(() => setNewIds(new Set()), 1500);
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <p className="text-sm font-medium text-gray-700 mb-4">Recent Check-ins</p>
            <div className="space-y-2 max-h-80 overflow-y-auto">
                {(!attendees || attendees.length === 0) && (
                    <p className="text-sm text-gray-400">Waiting for first scan...</p>
                )}
                {attendees?.map((a) => {
                    const isNew = newIds.has(a.id);
                    return (
                        <div
                            key={a.id}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-700 ease-out ${isNew
                                    ? "bg-indigo-50 border border-indigo-200 animate-slide-in"
                                    : "bg-gray-50 border border-transparent"
                                }`}
                        >
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 transition-colors duration-700 ${isNew ? "bg-primary text-white" : "bg-indigo-100 text-indigo-600"
                                    }`}
                            >
                                {a.name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate flex items-center gap-2">
                                    {a.name}
                                    {isNew && (
                                        <span className="text-[10px] font-medium bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full animate-fade-in">
                                            new
                                        </span>
                                    )}
                                </p>
                                <p className="text-xs text-gray-400 truncate">{a.email}</p>
                            </div>
                            <span className="text-xs text-gray-400 whitespace-nowrap">{a.registeredAt}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}