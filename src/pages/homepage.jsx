import React from "react";

const posters = [
    {
        title: "Blast - Site Entrance",
        image: "/images/poster-01.jpg",
    },
    {
        title: "About - Vienna",
        image: "/images/poster-02.jpg",
    },
    {
        title: "Artwork - Animations",
        image: "/images/poster-03.jpg",
    },
];

const contactLinks = [
    { label: "1234567890", href: "tel:1234567890" },
    { label: "Vienna", href: "mailto:" },
    {
        label: "artstation.com/",
        href: "https://www.artstation.com/",
    },
    { label: "@vienna", href: "https://www.instagram.com/vienna" },
];

export default function Homepage() {
    return (
        <main className="bg-slate-950 text-white w-full">
            {/* Hero Section */}
            <section
                id="hero"
                className="relative flex min-h-screen items-center justify-center overflow-hidden"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url(/images/hero.jpg)" }}
                />
                <div className="absolute inset-0 bg-slate-950/50" />

                <div className="relative z-10 text-center px-6">
                    <p className="text-sm uppercase tracking-[0.6em] text-slate-200">
                        2D Animator
                    </p>
                    <h1 className="mt-3 text-6xl font-extrabold tracking-tight">
                        Portfolio
                    </h1>
                    <div className="mt-3 text-lg tracking-[0.6em] text-slate-100">
                        Vienna · {new Date().getFullYear()}
                    </div>
                </div>
            </section>

            {/* About / Skills Section */}
            <section id="about" className="bg-slate-100 text-slate-900">
                <div className="mx-auto flex min-h-screen w-full max-w-6xl gap-12 px-6 py-24 md:flex-col md:items-center">
                    <div className="flex flex-1 flex-col gap-16 md:flex-row md:items-center md:gap-24">
                        <div className="mx-auto w-full max-w-sm overflow-hidden rounded-3xl shadow-xl md:mx-0">
                            <img
                                src="/images/profile.jpg"
                                alt="Portrait of Bong"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <div className="grid flex-1 gap-16 md:grid-cols-2 lg:gap-24">
                            <div className="flex-1 space-y-10">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h1 className="text-4xl font-extrabold tracking-tight">
                                            Hello!
                                        </h1>
                                        <span className="text-4xl">👋</span>
                                    </div>
                                    <p className="mt-4 text-base text-slate-600">
                                        My name is Vienna, a 2D Animator based
                                        in the UK. I specialize in character
                                        animation, storyboarding, and visual
                                        storytelling. Welcome to my portfolio!
                                    </p>
                                </div>

                                <div className="grid gap-10 lg:grid-cols-2">
                                    <div>
                                        <h3 className="text-xl font-bold tracking-wide text-slate-800">
                                            Education
                                        </h3>
                                        <p className="mt-2 text-base text-slate-600">
                                            2022 - 2026 · UCA
                                        </p>
                                        <p className="text-base text-slate-500">
                                            BA of Animation
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <aside className="w-full max-w-sm space-y-6">
                                <h3 className="text-xl font-bold tracking-wide text-slate-800">
                                    Skills
                                </h3>
                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        "Ps",
                                        "Tvp",
                                        "Sf",
                                        "Ae",
                                        "Ai",
                                        "Aa",
                                        "Maya",
                                        "Pp",
                                    ].map((skill) => (
                                        <div
                                            key={skill}
                                            className="flex h-16 items-center justify-center rounded-2xl bg-slate-900 text-lg font-bold text-white shadow"
                                        >
                                            {skill}
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold tracking-wide text-slate-800">
                                        Experience
                                    </h3>
                                    <ul className="mt-2 space-y-2 text-base text-slate-600">
                                        <li>
                                            2022 - 2023 · Freelance Illustration
                                            at Light on Water Studio
                                        </li>
                                        <li>
                                            2023 - Present · Freelance Artist
                                        </li>
                                    </ul>
                                </div>
                            </aside>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 justify-center ">
                        {contactLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="group inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Poster Gallery Section */}
            <section id="posters" className="bg-slate-100 py-24 text-slate-900">
                <div className="mx-auto w-full max-w-6xl px-6">
                    <header className="text-center">
                        <h2 className="text-3xl font-extrabold uppercase tracking-[0.4em] text-slate-800">
                            Posters
                        </h2>
                        <p className="mt-4 text-base text-slate-500">
                            Highlight pieces from the Sineru series (2024).
                        </p>
                    </header>

                    <div className="mt-16 grid gap-8 md:grid-cols-3">
                        {posters.map((poster) => (
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
                </div>
            </section>
        </main>
    );
}
