import { Link } from "react-router-dom";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-950 py-12 text-slate-400 border-t border-slate-800">
            <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Brand & Copyright */}
                <div className="flex flex-col items-center md:items-start gap-2">
                    <span className="text-xl font-bold text-slate-100 tracking-tight">
                        Vienna Porter
                    </span>
                    <p className="text-sm">
                        © {currentYear} All rights reserved.
                    </p>
                </div>

                {/* Navigation */}
                <nav className="flex gap-8 text-sm font-medium">
                    <Link
                        to="/"
                        className="hover:text-sky-400 transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        to="/gallery"
                        className="hover:text-sky-400 transition-colors"
                    >
                        Gallery
                    </Link>
                    <Link
                        to="/login"
                        className="hover:text-sky-400 transition-colors"
                    >
                        Admin
                    </Link>
                </nav>

                {/* Socials */}
                <div className="flex gap-6">
                    {/* LinkedIn */}
                    <a
                        href="https://linkedin.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                    >
                        <span className="sr-only">LinkedIn</span>
                        <svg
                            className="h-6 w-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </a>

                    {/* Twitter/X */}
                    <a
                        href="https://x.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                    >
                        <span className="sr-only">X</span>
                        <svg
                            className="h-6 w-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
}
