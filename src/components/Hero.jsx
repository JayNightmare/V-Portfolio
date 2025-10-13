import ImageScrub from "../animations/ImageScrub";
import TextReveal from "../animations/TextReveal";
import { motion } from "motion/react";

const HERO_FRAMES = [
    "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1080&q=80",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1080&q=80",
    "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1080&q=80",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1080&q=80",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1080&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1080&q=80",
];

export default function HeroSection() {
    return (
        <section
            id="hero"
            className="relative isolate overflow-hidden bg-slate-950 text-white"
        >
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
                <div className="absolute right-[-30%] top-1/2 h-[120%] w-[60%] -translate-y-1/2 rounded-full bg-sky-400/10 blur-3xl" />
            </div>

            <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center gap-12 px-6 py-24 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex w-full max-w-xl flex-col items-center gap-6 text-center lg:items-start lg:text-left">
                    <motion.p
                        className=" text-xs font-semibold uppercase tracking-[0.6em] text-sky-200/70"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        2D Animator
                    </motion.p>
                    <TextReveal
                        text="Vienna Porter"
                        className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
                        speed={65}
                    />
                    <p className="max-w-xl text-sm text-slate-200/80 sm:text-base">
                        Animating emotions frame by frame with a focus on
                        character-driven stories and whimsical worlds.
                    </p>
                    <motion.div
                        className="text-xs uppercase tracking-[0.45em] text-slate-400"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        UK · Farnham
                    </motion.div>
                </div>

                <div className="w-full max-w-xl">
                    <ImageScrub images={HERO_FRAMES} duration={5600} />
                </div>
            </div>
        </section>
    );
}
