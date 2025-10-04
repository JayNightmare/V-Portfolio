import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";

export default function App() {
    return (
        <Routes>
            <Route path="/V-Portfolio/" element={<Homepage />} />
        </Routes>
    );
}
