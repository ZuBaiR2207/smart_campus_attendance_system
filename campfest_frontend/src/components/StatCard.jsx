import { useEffect, useRef, useState } from "react";

export default function StatCard({ label, value, sub }) {
  // Determine if the incoming value is numeric
  const isNumber = typeof value === "number";

  // Use numeric animation only for numbers
  const [displayValue, setDisplayValue] = useState(isNumber ? value : value);
  const [pulse, setPulse] = useState(false);
  const prevValue = useRef(value);

  // Helper for green Live status
  const isLive = label === "Status" && value === "Live";

  useEffect(() => {
    // Skip animation for non‑numeric values (e.g., "Live", "—")
    if (!isNumber) return;
    if (value === undefined || value === prevValue.current) return;

    const start = prevValue.current ?? 0;
    const end = value;
    const duration = 500; // ms
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease‑out cubic
      const current = Math.round(start + (end - start) * eased);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        prevValue.current = end;
      }
    }

    requestAnimationFrame(tick);

    // Flash pulse on change
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 600);
    return () => clearTimeout(t);
  }, [value, isNumber]);

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border p-5 transition-all duration-500 ${pulse ? "border-primary shadow-md scale-[1.02]" : "border-gray-100"}`}
    >
      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{label}</p>
      <p
        className={`text-3xl font-semibold transition-colors duration-500 ${pulse ? "text-primary" : isLive ? "text-green-500" : "text-gray-900"}`}
      >
        {isNumber ? displayValue : value ?? "—"}
      </p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}