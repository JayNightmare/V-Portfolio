import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { fetchGalleryItems } from "../services/api";

const TYPE_LABELS = {
    animation: "Animation",
    illustration: "Illustration",
    layered: "Layered Piece",
    other: "Project",
};

export default function ExtraGallery() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const loadItems = async () => {
            try {
                const data = await fetchGalleryItems();
                setItems(data);
            } catch (error) {
                console.error("Failed to load gallery items:", error);
            }
        };
        loadItems();
    }, []);

    return (
        <main className="w-full bg-slate-950 text-white">
            <section className="mx-auto w-full max-w-6xl px-6 py-24">
                <header className="text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.45em] text-slate-500">
                        Archive
                    </p>
                    <h1 className="mt-3 text-4xl font-extrabold tracking-tight">
                        Full Gallery
                    </h1>
                    <p className="mt-4 text-base text-slate-400">
                        Browse every piece and jump into the detail view for
                        motion and layer explorations.
                    </p>
                </header>

                <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => (
                        <Link
                            key={item.slug}
                            to={`/gallery/${item.slug}`}
                            state={{ layoutId: `gallery-item-${item.slug}` }}
                            className="group"
                        >
                            <motion.article
                                layoutId={`gallery-item-${item.slug}`}
                                className="h-full overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-900/60 shadow-lg transition group-hover:border-sky-400/40 group-hover:shadow-sky-900/30"
                                whileHover={{ y: -6 }}
                            >
                                <motion.img
                                    src={item.mainImage}
                                    alt={item.title}
                                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="px-6 py-5">
                                    <p className="text-xs uppercase tracking-[0.45em] text-slate-400">
                                        {TYPE_LABELS[item.type] || item.type}
                                    </p>
                                    <h2 className="mt-2 text-lg font-semibold tracking-tight text-white">
                                        {item.title}
                                    </h2>
                                </div>
                            </motion.article>
                        </Link>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-3 rounded-full border border-slate-700/70 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-300 transition hover:border-slate-500 hover:text-white"
                    >
                        ← Back home
                    </Link>
                </div>
            </section>
        </main>
    );
}
