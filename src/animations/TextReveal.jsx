import { useEffect, useMemo, useState } from "react";

const TextReveal = ({
    text = "",
    speed = 80,
    className = "",
    as: Component = "h1",
}) => {
    const [displayedText, setDisplayedText] = useState("");
    const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

    const sanitizedSpeed = useMemo(() => Math.max(speed, 16), [speed]);

    useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) {
            return;
        }

        const mediaQuery = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );
        const handleChange = (event) => {
            setShouldReduceMotion(event.matches);
        };

        setShouldReduceMotion(mediaQuery.matches);
        mediaQuery.addEventListener("change", handleChange);

        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    useEffect(() => {
        if (!text) {
            setDisplayedText("");
            return;
        }

        if (shouldReduceMotion) {
            setDisplayedText(text);
            return;
        }

        setDisplayedText("");
        if (typeof window === "undefined") {
            setDisplayedText(text);
            return;
        }

        let index = 0;

        const interval = window.setInterval(() => {
            setDisplayedText(text.slice(0, index + 1));
            index += 1;
            if (index >= text.length) {
                window.clearInterval(interval);
            }
        }, sanitizedSpeed);

        return () => window.clearInterval(interval);
    }, [text, sanitizedSpeed, shouldReduceMotion]);

    return <Component className={className}>{displayedText}</Component>;
};

export default TextReveal;
