import { useCallback, useEffect, useRef, useState } from "react";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default function useImageScrub({
    frameCount,
    autoplay = true,
    duration = 5200,
    loop = false,
} = {}) {
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const animationFrameRef = useRef();
    const manualOverrideRef = useRef(false);
    const startTimestampRef = useRef(null);

    const updateIndexFromClientX = useCallback(
        (clientX) => {
            if (!frameCount || !containerRef.current) {
                return;
            }

            const { left, width } =
                containerRef.current.getBoundingClientRect();
            const ratio = clamp((clientX - left) / (width || 1), 0, 1);
            const nextIndex = Math.min(
                frameCount - 1,
                Math.round(ratio * (frameCount - 1))
            );

            setActiveIndex(nextIndex);
        },
        [frameCount]
    );

    useEffect(() => {
        setActiveIndex(0);
        manualOverrideRef.current = false;
        startTimestampRef.current = null;
    }, [frameCount]);

    useEffect(() => {
        if (
            typeof window === "undefined" ||
            !autoplay ||
            manualOverrideRef.current ||
            frameCount <= 1
        ) {
            return;
        }

        const step = (timestamp) => {
            if (manualOverrideRef.current) {
                return;
            }

            if (!startTimestampRef.current) {
                startTimestampRef.current = timestamp;
            }

            const elapsed = timestamp - startTimestampRef.current;
            const progress = duration ? clamp(elapsed / duration, 0, 1) : 1;
            const nextIndex = Math.min(
                frameCount - 1,
                Math.floor(progress * (frameCount - 1))
            );

            setActiveIndex(nextIndex);

            if (progress < 1) {
                animationFrameRef.current = window.requestAnimationFrame(step);
            } else if (loop) {
                startTimestampRef.current = timestamp;
                animationFrameRef.current = window.requestAnimationFrame(step);
            }
        };

        animationFrameRef.current = window.requestAnimationFrame(step);

        return () => {
            if (animationFrameRef.current) {
                window.cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [autoplay, duration, frameCount, loop]);

    useEffect(() => {
        const node = containerRef.current;
        if (!node || frameCount <= 1) {
            return;
        }

        const handlePointerMove = (event) => {
            manualOverrideRef.current = true;

            if ("clientX" in event) {
                updateIndexFromClientX(event.clientX);
            } else if (event.touches?.length) {
                updateIndexFromClientX(event.touches[0].clientX);
            }
        };

        node.addEventListener("pointermove", handlePointerMove);
        node.addEventListener("touchmove", handlePointerMove, {
            passive: true,
        });

        return () => {
            node.removeEventListener("pointermove", handlePointerMove);
            node.removeEventListener("touchmove", handlePointerMove);
        };
    }, [frameCount, updateIndexFromClientX]);

    return { containerRef, activeIndex };
}
