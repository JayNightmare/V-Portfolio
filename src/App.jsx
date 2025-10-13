import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import ExtraGallery from "./pages/extraGallery";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/gallery" element={<ExtraGallery />} />
        </Routes>
    );
}
