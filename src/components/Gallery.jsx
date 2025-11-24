import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { fetchGalleryItems } from "../services/api";

const FEATURED_COUNT = 3;

export default function GallerySection() {
    const [featured, setFeatured] = useState([]);

    useEffect(() => {
        const loadItems = async () => {
            try {
                const items = await fetchGalleryItems();
                setFeatured(items.slice(0, FEATURED_COUNT));
            } catch (error) {
                console.error("Failed to load gallery items:", error);
            }
        };
        loadItems();
    }, []);

    return (
        <section id="gallery" className="bg-slate-100 py-24 text-slate-900">
            <div className="mx-auto w-full max-w-6xl px-6 mb-[100px]">
                <header className="text-center">
                    <h2 className="text-3xl font-extrabold uppercase tracking-[0.4em] text-slate-800">
                        Gallery
                    </h2>
                    <p className="mt-4 text-base text-slate-500">
                        Highlight pieces (2025)
                    </p>
                </header>

                <div className="mt-16 grid gap-8 md:grid-cols-3">
                    {featured.map((item) => (
                        <Link
                            key={item.slug}
                            to={`/gallery/${item.slug}`}
                            state={{ layoutId: `gallery-item-${item.slug}` }}
                            className="group"
                        >
                            <motion.article
                                layoutId={`gallery-item-${item.slug}`}
                                className="h-full overflow-hidden rounded-3xl bg-slate-900 shadow-xl transition group-hover:shadow-2xl"
                                whileHover={{ y: -8 }}
                            >
                                <motion.img
                                    src={item.mainImage}
                                    alt={item.title}
                                    className="h-96 w-full object-cover transition duration-500 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="px-6 py-5 text-center text-sm font-semibold uppercase tracking-[0.3em] text-white">
                                    {item.title}
                                </div>
                            </motion.article>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <Link to="/gallery">See More...</Link>
                </div>
            </div>
        </section>
    );
}
