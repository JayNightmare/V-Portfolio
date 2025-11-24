import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    fetchGalleryItems,
    createGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
} from "../services/api";
import GalleryItemForm from "../components/GalleryItemForm";

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [items, setItems] = useState([]);
    const [view, setView] = useState("list"); // list, create, edit
    const [editingItem, setEditingItem] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (!token || !userData) {
            navigate("/login");
            return;
        }

        setUser(JSON.parse(userData));
        loadItems();
    }, [navigate]);

    const loadItems = async () => {
        try {
            const data = await fetchGalleryItems();
            setItems(data);
        } catch (err) {
            setError("Failed to load items");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const handleCreate = async (data) => {
        try {
            const token = localStorage.getItem("token");
            await createGalleryItem(data, token);
            setView("list");
            loadItems();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdate = async (data) => {
        try {
            const token = localStorage.getItem("token");
            await updateGalleryItem(editingItem._id, data, token);
            setView("list");
            setEditingItem(null);
            loadItems();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this item?"))
            return;
        try {
            const token = localStorage.getItem("token");
            await deleteGalleryItem(id, token);
            loadItems();
        } catch (err) {
            setError(err.message);
        }
    };

    if (!user) return null;

    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <nav className="border-b border-slate-800 bg-slate-900/50 px-6 py-4 sticky top-0 z-10 backdrop-blur-md">
                <div className="mx-auto flex max-w-6xl items-center justify-between">
                    <h1 className="text-lg font-bold tracking-tight">
                        Admin Dashboard
                    </h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-400 hidden sm:inline">
                            Welcome, {user.username}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="rounded-full border border-slate-700 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:bg-slate-800 hover:text-white transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <div className="mx-auto max-w-6xl p-6">
                {error && (
                    <div className="mb-6 rounded-lg bg-red-500/10 p-4 text-red-400 border border-red-500/20 flex justify-between items-center">
                        <span>{error}</span>
                        <button
                            onClick={() => setError("")}
                            className="text-sm hover:text-white"
                        >
                            Dismiss
                        </button>
                    </div>
                )}

                {view === "list" && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold">
                                Gallery Items
                            </h2>
                            <button
                                onClick={() => setView("create")}
                                className="rounded-full bg-sky-600 px-6 py-2 text-sm font-bold uppercase tracking-wider text-white hover:bg-sky-500 transition shadow-lg shadow-sky-900/20"
                            >
                                + Add New Item
                            </button>
                        </div>

                        <div className="grid gap-4">
                            {items.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex items-center gap-4 rounded-xl border border-slate-800/60 bg-slate-900/40 p-4 transition hover:border-slate-700"
                                >
                                    <img
                                        src={item.mainImage}
                                        alt={item.title}
                                        className="h-16 w-16 rounded-lg object-cover bg-slate-800"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold truncate">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider">
                                            {item.type} · {item.year}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setEditingItem(item);
                                                setView("edit");
                                            }}
                                            className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:bg-slate-800 hover:text-white transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(item._id)
                                            }
                                            className="rounded-lg border border-red-900/30 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-red-400 hover:bg-red-900/20 hover:text-red-300 transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {items.length === 0 && (
                                <div className="text-center py-12 text-slate-500">
                                    No items found. Create your first one!
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {(view === "create" || view === "edit") && (
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold mb-2">
                                {view === "create"
                                    ? "Create New Item"
                                    : "Edit Item"}
                            </h2>
                            <p className="text-slate-400 text-sm">
                                {view === "create"
                                    ? "Add a new masterpiece to your collection."
                                    : `Updating "${editingItem?.title}"`}
                            </p>
                        </div>

                        <div className="rounded-3xl border border-slate-800/60 bg-slate-900/40 p-8">
                            <GalleryItemForm
                                initialData={
                                    view === "edit" ? editingItem : null
                                }
                                onSubmit={
                                    view === "create"
                                        ? handleCreate
                                        : handleUpdate
                                }
                                onCancel={() => {
                                    setView("list");
                                    setEditingItem(null);
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
