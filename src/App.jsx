import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import Homepage from "./pages/homepage";
import ExtraGallery from "./pages/extraGallery";
import GalleryItemPage from "./pages/galleryItem";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Homepage />} />
                <Route path="/gallery" element={<ExtraGallery />} />
                <Route path="/gallery/:slug" element={<GalleryItemPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
        </AnimatePresence>
    );
}
