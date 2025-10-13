import { Link } from "react-router-dom";

export default function ExtraGallery() {
    return (
        <main className=" text-white w-full">
            <section
                id="extra-gallery"
                className="min-h-screen overflow-hidden text-white flex items-center justify-center flex-col"
            >
                <div className="mb-2 w-full h-full bg-slate-950 py-3 flex justify-center">
                    <header className="text-center">
                        <h2 className="text-3xl font-extrabold uppercase tracking-[0.4em] text-slate-800">
                            Coming Soon...
                        </h2>
                    </header>
                </div>
                <Link to="/" className="text-zinc-200/50">
                    Go Back
                </Link>
            </section>
        </main>
    );
}
