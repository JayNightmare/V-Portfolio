import mongoose from "mongoose";
import dotenv from "dotenv";
import GalleryItem from "./models/GalleryItem.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedData = JSON.parse(
    fs.readFileSync(
        path.join(__dirname, "../src/data/galleryItems.json"),
        "utf-8"
    )
);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log("Connected to MongoDB");

        // Clear existing data
        await GalleryItem.deleteMany({});
        console.log("Cleared existing gallery items");

        // Insert new data
        await GalleryItem.insertMany(seedData);
        console.log("Seeded gallery items");

        mongoose.connection.close();
    })
    .catch((err) => {
        console.error("Error seeding data:", err);
        process.exit(1);
    });
