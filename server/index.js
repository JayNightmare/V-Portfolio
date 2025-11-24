import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import galleryRoutes from "./routes/gallery.js";
import authRoutes from "./routes/auth.js";
import uploadRoutes from "./routes/upload.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
