import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (!token || !userData) {
            navigate("/login");
            return;
        }

        setUser(JSON.parse(userData));
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    if (!user) return null;

    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <nav className="border-b border-slate-800 bg-slate-900/50 px-6 py-4">
                <div className="mx-auto flex max-w-6xl items-center justify-between">
                    <h1 className="text-lg font-bold tracking-tight">
                        Admin Dashboard
                    </h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-400">
                            Welcome, {user.username}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="rounded-full border border-slate-700 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:bg-slate-800 hover:text-white"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <div className="mx-auto max-w-6xl p-6">
                <div className="rounded-3xl border border-slate-800/60 bg-slate-900/40 p-8 text-center">
                    <p className="text-slate-400">
                        CMS functionality coming soon...
                    </p>
                </div>
            </div>
        </main>
    );
}
