import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import galleryRoutes from "./routes/gallery.js";
import authRoutes from "./routes/auth.js";
import uploadRoutes from "./routes/upload.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

// Database Connection
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/gallery", galleryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);

// Health Check
app.get("/", (req, res) => {
    res.send("V-Portfolio API is running");
});

// Global Error Handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message || "Something went wrong!" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
