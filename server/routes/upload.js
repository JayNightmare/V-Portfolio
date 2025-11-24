import express from "express";
import upload from "../middleware/upload.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}/uploads/`;
    const imageUrl = baseUrl + req.file.filename;

    res.json({ url: imageUrl });
});

export default router;
