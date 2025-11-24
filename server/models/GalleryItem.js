import mongoose from "mongoose";

const galleryItemSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    mainImage: {
        type: String,
        required: true,
    },
    dimensions: String,
    software: [String],
    tags: [String],
    palette: [String],
    // For animation type
    timelineFrames: [String],
    // For layered type
    layers: [
        {
            label: String,
            image: String,
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("GalleryItem", galleryItemSchema);
