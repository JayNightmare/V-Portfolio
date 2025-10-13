export default function AboutSkillSection() {
    const contactLinks = [
        { label: "1234567890", href: "tel:1234567890" },
        { label: "Vienna", href: "mailto:" },
        {
            label: "artstation.com/",
            href: "https://www.artstation.com/",
        },
        { label: "@vienna", href: "https://www.instagram.com/vienna" },
    ];

    return (
        <section id="about" className="bg-slate-100 text-slate-900">
            <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-6 py-16 sm:py-24 lg:flex-col lg:items-center">
                <div className="flex flex-1 flex-col gap-12 lg:flex-row lg:items-center lg:gap-24">
                    <div className="mx-auto w-full h-72 max-h-sm max-w-sm overflow-hidden rounded-3xl shadow-xl sm:h-96 md:h-[450px] lg:mx-0">
                        <img
                            src="https://picsum.photos/1080/1920"
                            alt="Portrait of Bong"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div className="grid flex-1 gap-12 sm:grid-cols-2 lg:gap-24">
                        <div className="flex-1 space-y-10">
                            <div>
                                <div className="flex items-center gap-3">
                                    <h1 className="text-4xl font-extrabold tracking-tight">
                                        Hello!
                                    </h1>
                                    <span className="text-4xl">👋</span>
                                </div>
                                <p className="mt-4 text-base text-slate-600">
                                    My name is Vienna, a 2D Animator based in
                                    the UK. I specialize in character animation,
                                    storyboarding, and visual storytelling.
                                    Welcome to my portfolio!
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
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
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
                                        2022 - 2023 · Freelance Illustration at
                                        Light on Water Studio
                                    </li>
                                    <li>2023 - Present · Freelance Artist</li>
                                </ul>
                            </div>
                        </aside>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                    {contactLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="group inline-flex w-full items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900 sm:w-auto"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
