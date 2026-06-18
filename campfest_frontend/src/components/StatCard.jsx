import { useEffect, useRef, useState } from "react";

const ACCENT = {
  indigo: {
    gradient: "from-indigo-50 via-indigo-50/50 to-transparent",
    border: "border-indigo-200",
    orb: "bg-indigo-100",
    icon: "bg-indigo-50 border-indigo-200",
    pulse: "shadow-indigo-200",
  },
  purple: {
    gradient: "from-purple-50 via-purple-50/50 to-transparent",
    border: "border-purple-200",
    orb: "bg-purple-100",
    icon: "bg-purple-50 border-purple-200",
    pulse: "shadow-purple-200",
  },
  green: {
    gradient: "from-green-50 via-green-50/50 to-transparent",
    border: "border-green-200",
    orb: "bg-green-100",
    icon: "bg-green-50 border-green-200",
    pulse: "shadow-green-200",
  },
  red: {
    gradient: "from-red-50 via-red-50/50 to-transparent",
    border: "border-red-200",
    orb: "bg-red-100",
    icon: "bg-red-50 border-red-200",
    pulse: "shadow-red-200",
  },
};

export default function StatCard({ label, value, icon, accent = "indigo" }) {
  const isNumber = typeof value === "number";
  const [displayValue, setDisplayValue] = useState(value);
  const [pulse, setPulse] = useState(false);
  const prevValue = useRef(value);
  const s = ACCENT[accent] ?? ACCENT.indigo;

  useEffect(() => {
    if (!isNumber) return;
    if (value === undefined || value === prevValue.current) return;

    const start = prevValue.current ?? 0;
    const end = value;
    const duration = 600;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(tick);
      else prevValue.current = end;
    }

    requestAnimationFrame(tick);
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 700);
    return () => clearTimeout(t);
  }, [value, isNumber]);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border bg-white ${s.border} p-5 shadow-sm transition-all duration-500 ${
        pulse ? `scale-[1.03] shadow-lg ${s.pulse}` : ""
      }`}
    >
      {/* Gradient wash */}
      <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} pointer-events-none`} />
      {/* Glow orb */}
      <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full ${s.orb} blur-2xl pointer-events-none`} />

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">{label}</p>
          <p className={`text-4xl font-extrabold text-gray-900 tabular-nums leading-none transition-transform duration-300 ${pulse ? "scale-105" : ""}`}>
            {isNumber ? displayValue : (value ?? "—")}
          </p>
        </div>
        <div className={`w-11 h-11 rounded-xl border ${s.icon} flex items-center justify-center text-xl flex-shrink-0`}>
          {icon}
        </div>
      </div>
    </div>
  );
}