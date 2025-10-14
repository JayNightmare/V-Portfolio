import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import galleryItems from "../data/galleryItems.json";
import FooterSection from "../components/Footer";
import {
    TYPE_LABELS,
    LayeredArtPreview,
    TimelineSection,
    ViewMoreSection,
} from "../utils/sectionPreviews.jsx";

export default function GalleryItemPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const item = useMemo(
        () => galleryItems.find((entry) => entry.slug === slug),
        [slug]
    );

    if (!item) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-center text-white">
                <div className="space-y-6">
                    <p className="text-sm uppercase tracking-[0.45em] text-slate-500">
                        Piece Not Found
                    </p>
                    <h1 className="text-3xl font-bold tracking-tight">
                        The artwork you are looking for has drifted away.
                    </h1>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center justify-center rounded-full border border-sky-400/40 px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-sky-200 transition hover:border-sky-300 hover:text-sky-100"
                    >
                        Go Back
                    </button>
                </div>
            </main>
        );
    }

    const typeLabel = TYPE_LABELS[item.type] || item.type;
    const layoutId = location.state?.layoutId || `gallery-item-${item.slug}`;

    return (
        <main className="bg-slate-950 text-white">
            <div className="mx-auto min-h-screen w-full max-w-6xl space-y-16 px-6 py-24">
                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-3 rounded-full border border-slate-700/70 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-300 transition hover:border-slate-500 hover:text-white"
                    >
                        ← Back
                    </button>
                    <p className="text-xs font-semibold uppercase tracking-[0.45em] text-slate-500">
                        {typeLabel}
                    </p>
                </div>

                <section className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                    <motion.figure
                        layoutId={layoutId}
                        className="overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-900/40 shadow-xl"
                    >
                        <img
                            src={item.mainImage}
                            alt={item.title}
                            className="h-full w-full object-cover"
                        />
                    </motion.figure>

                    <article className="space-y-6">
                        <header className="space-y-3">
                            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                                {item.title}
                            </h1>
                            <p className="text-sm uppercase tracking-[0.45em] text-slate-500">
                                {typeLabel} · {item.year}
                            </p>
                        </header>

                        <p className="text-base text-slate-300">
                            {item.description}
                        </p>

                        <div className="rounded-3xl border border-slate-800/60 bg-slate-900/40 p-6">
                            <dl className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <dt className="text-xs uppercase tracking-[0.35em] text-slate-500">
                                        Dimensions
                                    </dt>
                                    <dd className="mt-2 text-sm text-slate-200">
                                        {item.dimensions}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-xs uppercase tracking-[0.35em] text-slate-500">
                                        Software
                                    </dt>
                                    <dd className="mt-2 text-sm text-slate-200">
                                        {item.software?.join(" · ")}
                                    </dd>
                                </div>
                                {item.tags?.length ? (
                                    <div className="sm:col-span-2">
                                        <dt className="text-xs uppercase tracking-[0.35em] text-slate-500">
                                            Focus
                                        </dt>
                                        <dd className="mt-3 flex flex-wrap gap-2">
                                            {item.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="inline-flex items-center rounded-full border border-slate-700/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </dd>
                                    </div>
                                ) : null}
                                {item.palette?.length ? (
                                    <div className="sm:col-span-2">
                                        <dt className="text-xs uppercase tracking-[0.35em] text-slate-500">
                                            Palette
                                        </dt>
                                        <dd className="mt-3 flex gap-2">
                                            {item.palette.map((hex) => (
                                                <span
                                                    key={hex}
                                                    className="flex h-10 w-10 items-center justify-center rounded-full text-[0.6rem] font-semibold"
                                                    style={{
                                                        backgroundColor: hex,
                                                        color: "#ffffff",
                                                        textShadow:
                                                            "0 0 6px rgba(0,0,0,0.35)",
                                                    }}
                                                >
                                                    {hex.replace("#", "")}
                                                </span>
                                            ))}
                                        </dd>
                                    </div>
                                ) : null}
                            </dl>
                        </div>
                    </article>
                </section>

                {item.type === "animation" ? (
                    <TimelineSection frames={item.timelineFrames} />
                ) : null}

                {item.type === "layered" ? (
                    <LayeredArtPreview layers={item.layers} />
                ) : null}

                <ViewMoreSection currentSlug={item.slug} type={item.type} />
            </div>

            <FooterSection />
        </main>
    );
}
