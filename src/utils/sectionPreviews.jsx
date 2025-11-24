import ImageScrub from "../animations/ImageScrub";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export const TYPE_LABELS = {
    animation: "Animation",
    illustration: "Illustration",
    layered: "Layered Piece",
    other: "Project",
};

export function LayeredArtPreview({ layers = [] }) {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!layers.length) {
        return null;
    }

    const handleChange = (event) => {
        setActiveIndex(Number(event.target.value));
    };

    return (
        <section className="space-y-8 rounded-3xl bg-slate-900/40 p-8 shadow-lg">
            <header className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.45em] text-slate-400">
                        Layer Explorer
                    </p>
                    <h3 className="text-2xl font-bold tracking-tight text-white">
                        Peel back the composition
                    </h3>
                </div>
                <div className="flex flex-col items-end gap-2 text-right">
                    <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
                        {layers[activeIndex]?.label || "Layer"}
                    </span>
                    <input
                        type="range"
                        min="0"
                        max={Math.max(layers.length - 1, 0)}
                        step="1"
                        value={activeIndex}
                        onChange={handleChange}
                        className="h-1 w-48 cursor-pointer appearance-none rounded-full bg-slate-700 accent-sky-400"
                        aria-label="Select layer"
                    />
                </div>
            </header>

            <div className="relative mx-auto aspect-[4/3] w-full max-w-3xl">
                <div className="absolute inset-0 overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-950/60 shadow-2xl">
                    {layers.map((layer, index) => {
                        const offset = index - activeIndex;
                        const isActive = offset === 0;
                        const depth = Math.abs(offset);

                        return (
                            <figure
                                key={layer.image}
                                className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out"
                                style={{
                                    transform: `translateY(${
                                        offset * 14
                                    }px) scale(${isActive ? 1 : 0.94})`,
                                    opacity: isActive
                                        ? 1
                                        : Math.max(0.12, 1 - depth * 0.28),
                                    zIndex: layers.length - depth,
                                }}
                            >
                                <img
                                    src={layer.image}
                                    alt={layer.label}
                                    className="pointer-events-none h-full w-full object-contain"
                                />
                                {isActive ? (
                                    <figcaption className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-slate-950/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/90 shadow-lg">
                                        {layer.label}
                                    </figcaption>
                                ) : null}
                            </figure>
                        );
                    })}
                </div>
            </div>

            <footer className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
                {layers.map((layer, index) => (
                    <button
                        key={layer.image}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={`rounded-full border px-3 py-1 tracking-[0.28em] transition ${
                            index === activeIndex
                                ? "border-sky-400/60 bg-sky-400/10 text-sky-200"
                                : "border-slate-700/70 text-slate-500 hover:border-slate-500/80 hover:text-slate-200"
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </footer>
        </section>
    );
}

export function TimelineSection({ frames = [] }) {
    if (!frames?.length) {
        return null;
    }

    return (
        <section className="space-y-6 rounded-3xl bg-slate-900/40 p-8 shadow-lg">
            <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.45em] text-slate-400">
                    Timeline Scrub
                </p>
                <h3 className="text-2xl font-bold tracking-tight text-white">
                    Explore the motion by frame
                </h3>
                <p className="text-sm text-slate-400">
                    Drag or hover to scrub through the key poses used for this
                    loop.
                </p>
            </div>

            <ImageScrub images={frames} duration={1800} loop autoplay />
        </section>
    );
}

export function ViewMoreSection({ currentSlug, type, allItems = [] }) {
    const matching = useMemo(
        () =>
            allItems.filter(
                (item) => item.type === type && item.slug !== currentSlug
            ),
        [currentSlug, type, allItems]
    );

    if (!matching.length) {
        return null;
    }

    return (
        <section className="space-y-6">
            <header className="flex items-end justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.45em] text-slate-400">
                        View More
                    </p>
                    <h3 className="text-2xl font-bold tracking-tight text-white">
                        More {TYPE_LABELS[type] || "Pieces"}
                    </h3>
                </div>
                <Link
                    to="/gallery"
                    className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-300 hover:text-sky-200"
                >
                    Explore all
                </Link>
            </header>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {matching.map((item) => (
                    <Link
                        key={item.slug}
                        to={`/gallery/${item.slug}`}
                        state={{ layoutId: `gallery-item-${item.slug}` }}
                        className="group"
                    >
                        <motion.article
                            layoutId={`gallery-item-${item.slug}`}
                            className="overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-900/60 shadow-lg transition hover:border-sky-400/40 hover:shadow-sky-900/30"
                            whileHover={{ y: -6 }}
                        >
                            <img
                                src={item.mainImage}
                                alt={item.title}
                                className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
                                loading="lazy"
                            />
                            <div className="px-6 py-4">
                                <p className="text-xs uppercase tracking-[0.45em] text-slate-400">
                                    {TYPE_LABELS[item.type] || item.type}
                                </p>
                                <h4 className="mt-2 text-lg font-semibold tracking-tight text-white">
                                    {item.title}
                                </h4>
                            </div>
                        </motion.article>
                    </Link>
                ))}
            </div>
        </section>
    );
}
