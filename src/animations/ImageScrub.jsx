import useImageScrub from "../hooks/useImageScrub";

const ImageScrub = ({
    images = [],
    autoplay = true,
    duration = 1400,
    size = "aspect-video",
    loop = false,
}) => {
    const { containerRef, activeIndex } = useImageScrub({
        frameCount: images.length,
        autoplay,
        duration,
        loop,
    });

    if (!images.length) {
        return null;
    }

    return (
        <div
            ref={containerRef}
            className={`relative ${size} w-full max-w-3xl mx-auto overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-900/40 shadow-2xl`}
        >
            {images.map((image, index) => (
                <img
                    key={image ?? index}
                    src={image}
                    alt={`Scrub frame ${index + 1}`}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ease-out ${
                        index === activeIndex ? "opacity-100" : "opacity-0"
                    }`}
                    loading={index === 0 ? "eager" : "lazy"}
                />
            ))}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-slate-950/40 via-transparent to-slate-900/30" />
            <span className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 rounded-full bg-slate-950/80 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-slate-200/80 md:block">
                Move to scrub
            </span>
        </div>
    );
};

export default ImageScrub;
