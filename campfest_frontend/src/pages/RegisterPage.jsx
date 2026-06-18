import { useState } from "react";
import { registerAttendee } from "../api/api";

const DEPARTMENTS = [
    "Business Administration",
    "Accounting",
    "Information Technology (IT)",
    "E-Business",
    "Graphic Design",
    "Multimedia & Creative Design",
    "Interior Architecture",
    "Architecture",
    "Early Childhood Education",
    "Culinary Arts",
    "Hotel & Tourism Management",
    "Event Management",
    "Others",
];

export default function RegisterPage() {
    const [form, setForm] = useState({ name: "", email: "", department: "" });
    const [status, setStatus] = useState("idle"); // idle | loading | success | error
    const [errorMsg, setErrorMsg] = useState("");
    const [response, setResponse] = useState(null);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");

        try {
            const data = await registerAttendee(form);
            setResponse(data);
            setStatus("success");
        } catch (err) {
            setErrorMsg(err.message);
            setStatus("error");
        }
    }

    if (status === "success") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4">
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full text-center">
                    <div className="text-5xl mb-4">🎉</div>
                    <h1 className="text-xl font-semibold text-gray-900 mb-2">
                        You're checked in!
                    </h1>
                    <p className="text-gray-500 mb-6">{response?.message}</p>
                    <div className="bg-gray-50 rounded-xl p-4 text-left space-y-1">
                        <p className="text-sm text-gray-600">
                            <span className="font-medium text-gray-900">Name:</span> {response?.name}
                        </p>
                        <p className="text-sm text-gray-600">
                            <span className="font-medium text-gray-900">Email:</span> {response?.email}
                        </p>
                        {response?.department && (
                            <p className="text-sm text-gray-600">
                                <span className="font-medium text-gray-900">Dept:</span> {response?.department}
                            </p>
                        )}
                    </div>
                    <p className="text-xs text-gray-400 mt-6">
                        Enjoy the festival! 🚀
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full">
                <div className="text-center mb-6">
                    <div className="text-3xl mb-2">🎓</div>
                    <h1 className="text-xl font-semibold text-gray-900">
                        ALFA IT Festival 2025
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Scan complete — register your attendance below
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Enter valid email address"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Department <span className="text-gray-400">(optional)</span>
                        </label>
                        <select
                            name="department"
                            value={form.department}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            <option value="">Select department</option>
                            {DEPARTMENTS.map((d) => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                    </div>

                    {status === "error" && (
                        <div className="bg-red-50 text-red-600 text-sm rounded-lg px-3 py-2">
                            {errorMsg}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full bg-primary text-white font-medium rounded-xl py-3 text-sm hover:bg-indigo-700 transition disabled:opacity-50"
                    >
                        {status === "loading" ? "Registering..." : "Check In"}
                    </button>
                </form>
            </div>
        </div>
    );
}