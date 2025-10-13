import HeroSection from "../components/Hero";
import AboutSkillSection from "../components/About";
import GallerySection from "../components/Gallery";
import FooterSection from "../components/Footer";

export default function Homepage() {
    return (
        <main className="bg-slate-950 text-white w-full">
            {/* Hero Section */}
            <HeroSection />

            {/* About / Skills Section */}
            <AboutSkillSection />

            {/* Poster Gallery Section */}
            <GallerySection />

            {/* Footer Section */}
            <FooterSection />
        </main>
    );
}
