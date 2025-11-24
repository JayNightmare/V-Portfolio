import express from "express";
import GalleryItem from "../models/GalleryItem.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// GET all items
router.get("/", async (req, res) => {
    try {
        const items = await GalleryItem.find().sort({ year: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET single item by slug
router.get("/:slug", async (req, res) => {
    try {
        const item = await GalleryItem.findOne({ slug: req.params.slug });
        if (!item) return res.status(404).json({ message: "Item not found" });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST new item (Protected)
router.post("/", verifyToken, async (req, res) => {
    const item = new GalleryItem(req.body);
    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update item (Protected)
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const updatedItem = await GalleryItem.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE item (Protected)
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        await GalleryItem.findByIdAndDelete(req.params.id);
        res.json({ message: "Item deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
