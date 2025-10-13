import { Link } from "react-router-dom";

export default function GallerySection() {
    const gallery = [
        {
            title: "Image 1",
            image: "https://picsum.photos/1080/1920",
        },
        {
            title: "Image 2",
            image: "https://picsum.photos/1080/1920",
        },
        {
            title: "Image 3",
            image: "https://picsum.photos/1080/1920",
        },
    ];

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
                    {gallery.map((poster) => (
                        <article
                            key={poster.title}
                            className="overflow-hidden rounded-3xl bg-slate-900 shadow-xl"
                        >
                            <img
                                src={poster.image}
                                alt={poster.title}
                                className="h-96 w-full object-cover"
                            />
                            <div className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.3em] text-white">
                                {poster.title}
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <Link to="/gallery">See More...</Link>
                </div>
            </div>
        </section>
    );
}
