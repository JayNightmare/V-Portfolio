import { useState, useEffect } from "react";
import { uploadImage } from "../services/api";

export default function GalleryItemForm({ initialData, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        slug: "",
        title: "",
        type: "illustration",
        description: "",
        year: new Date().getFullYear(),
        mainImage: "",
        dimensions: "",
        software: "", // comma separated
        tags: "", // comma separated
        palette: "", // comma separated
        timelineFrames: [], // array of strings
        layers: [], // array of {label, image}
    });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                software: initialData.software?.join(", ") || "",
                tags: initialData.tags?.join(", ") || "",
                palette: initialData.palette?.join(", ") || "",
                timelineFrames: initialData.timelineFrames || [],
                layers: initialData.layers || [],
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = async (
        e,
        field,
        index = null,
        subField = null
    ) => {
        const file = e.target.files[0];
        if (!file) return;

        // Auto-populate metadata for Main Image
        if (field === "mainImage" && index === null) {
            const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");

            setFormData((prev) => {
                const updates = {};
                if (!prev.title) {
                    updates.title = nameWithoutExt
                        .replace(/[-_]/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase());
                }
                if (!prev.slug) {
                    updates.slug = nameWithoutExt
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)+/g, "");
                }
                return { ...prev, ...updates };
            });

            // eslint-disable-next-line no-undef
            const img = new Image();
            img.onload = () => {
                setFormData((prev) => ({
                    ...prev,
                    dimensions: `${img.width}px x ${img.height}px`,
                }));
                // eslint-disable-next-line no-undef
                URL.revokeObjectURL(img.src);
            };
            // eslint-disable-next-line no-undef
            img.src = URL.createObjectURL(file);
        }

        try {
            setUploading(true);
            const token = localStorage.getItem("token");
            const { url } = await uploadImage(file, token);

            if (index !== null) {
                if (subField) {
                    // Layer image
                    handleLayerChange(index, subField, url);
                } else {
                    // Timeline frame
                    handleArrayChange(index, url, field);
                }
            } else {
                // Main image
                setFormData((prev) => ({ ...prev, [field]: url }));
            }
        } catch (err) {
            // eslint-disable-next-line no-undef
            alert("Upload failed: " + err.message);
        } finally {
            setUploading(false);
        }
    };

    const handleArrayChange = (index, value, field) => {
        const newArray = [...formData[field]];
        newArray[index] = value;
        setFormData((prev) => ({ ...prev, [field]: newArray }));
    };

    const addArrayItem = (field) => {
        setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
    };

    const removeArrayItem = (index, field) => {
        setFormData((prev) => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index),
        }));
    };

    const handleLayerChange = (index, key, value) => {
        const newLayers = [...formData.layers];
        newLayers[index] = { ...newLayers[index], [key]: value };
        setFormData((prev) => ({ ...prev, layers: newLayers }));
    };

    const addLayer = () => {
        setFormData((prev) => ({
            ...prev,
            layers: [...prev.layers, { label: "", image: "" }],
        }));
    };

    const removeLayer = (index) => {
        setFormData((prev) => ({
            ...prev,
            layers: prev.layers.filter((_, i) => i !== index),
        }));
    };

    const handleBulkUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setUploading(true);
        try {
            const token = localStorage.getItem("token");
            const uploadPromises = files.map((file) =>
                uploadImage(file, token)
            );
            const results = await Promise.all(uploadPromises);
            const newUrls = results.map((res) => res.url);

            setFormData((prev) => ({
                ...prev,
                timelineFrames: [...prev.timelineFrames, ...newUrls],
            }));
        } catch (err) {
            // eslint-disable-next-line no-undef
            alert("Bulk upload failed: " + err.message);
        } finally {
            setUploading(false);
            e.target.value = "";
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const submissionData = {
            ...formData,
            software: formData.software
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            tags: formData.tags
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            palette: formData.palette
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
        };
        onSubmit(submissionData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 text-slate-200">
            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-2 w-full rounded bg-slate-800 p-2 border border-slate-700 focus:border-sky-500 outline-none"
                        required
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                        Slug
                    </label>
                    <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        className="mt-2 w-full rounded bg-slate-800 p-2 border border-slate-700 focus:border-sky-500 outline-none"
                        required
                    />
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                        Type
                    </label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="mt-2 w-full rounded bg-slate-800 p-2 border border-slate-700 focus:border-sky-500 outline-none"
                    >
                        <option value="illustration">Illustration</option>
                        <option value="animation">Animation</option>
                        <option value="layered">Layered</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                        Year
                    </label>
                    <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className="mt-2 w-full rounded bg-slate-800 p-2 border border-slate-700 focus:border-sky-500 outline-none"
                        required
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                        Dimensions
                    </label>
                    <input
                        type="text"
                        name="dimensions"
                        value={formData.dimensions}
                        onChange={handleChange}
                        className="mt-2 w-full rounded bg-slate-800 p-2 border border-slate-700 focus:border-sky-500 outline-none"
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Description
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="mt-2 w-full rounded bg-slate-800 p-2 border border-slate-700 focus:border-sky-500 outline-none"
                    required
                />
            </div>

            <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Main Image
                </label>
                <div className="mt-2 flex items-center gap-4">
                    {formData.mainImage && (
                        <img
                            src={formData.mainImage}
                            alt="Preview"
                            className="h-20 w-20 rounded object-cover bg-slate-800"
                        />
                    )}
                    <div className="flex-1">
                        <input
                            type="file"
                            accept="image/png, image/jpeg, image/gif"
                            onChange={(e) => handleFileUpload(e, "mainImage")}
                            className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-sky-400 hover:file:bg-slate-700"
                        />
                        <input
                            type="text"
                            name="mainImage"
                            value={formData.mainImage}
                            onChange={handleChange}
                            placeholder="Or paste URL"
                            className="mt-2 w-full rounded bg-slate-800 p-2 border border-slate-700 focus:border-sky-500 outline-none text-xs"
                        />
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                        Software (comma separated)
                    </label>
                    <input
                        type="text"
                        name="software"
                        value={formData.software}
                        onChange={handleChange}
                        className="mt-2 w-full rounded bg-slate-800 p-2 border border-slate-700 focus:border-sky-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                        Tags (comma separated)
                    </label>
                    <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        className="mt-2 w-full rounded bg-slate-800 p-2 border border-slate-700 focus:border-sky-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                        Palette (comma separated hex)
                    </label>
                    <input
                        type="text"
                        name="palette"
                        value={formData.palette}
                        onChange={handleChange}
                        className="mt-2 w-full rounded bg-slate-800 p-2 border border-slate-700 focus:border-sky-500 outline-none"
                    />
                </div>
            </div>

            {formData.type === "animation" && (
                <div className="space-y-4 rounded-xl bg-slate-900/50 p-4 border border-slate-800">
                    <div className="flex justify-between items-center">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                            Timeline Frames
                        </label>
                        <div className="relative">
                            <input
                                type="file"
                                multiple
                                accept="image/png, image/jpeg, image/gif"
                                onChange={handleBulkUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                disabled={uploading}
                            />
                            <button
                                type="button"
                                className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition ${
                                    uploading
                                        ? "bg-slate-800 text-slate-500 cursor-wait"
                                        : "bg-sky-600/20 text-sky-400 hover:bg-sky-600/30"
                                }`}
                            >
                                {uploading
                                    ? "Uploading..."
                                    : "Bulk Upload Images"}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                        {formData.timelineFrames.map((frame, index) => (
                            <div
                                key={index}
                                className="flex gap-2 items-center bg-slate-900 p-2 rounded border border-slate-800"
                            >
                                <span className="text-xs text-slate-500 w-6">
                                    {index + 1}
                                </span>
                                {frame && (
                                    <img
                                        src={frame}
                                        alt=""
                                        className="h-8 w-8 rounded object-cover bg-slate-800"
                                    />
                                )}
                                <div className="flex-1 min-w-0">
                                    <input
                                        type="text"
                                        value={frame}
                                        onChange={(e) =>
                                            handleArrayChange(
                                                index,
                                                e.target.value,
                                                "timelineFrames"
                                            )
                                        }
                                        className="w-full bg-transparent text-xs text-slate-300 outline-none truncate"
                                        placeholder="Frame URL"
                                        title={frame}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() =>
                                        removeArrayItem(index, "timelineFrames")
                                    }
                                    className="text-slate-600 hover:text-red-400 transition"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                        {formData.timelineFrames.length === 0 && (
                            <div className="text-center py-8 text-slate-600 text-xs italic border-2 border-dashed border-slate-800 rounded">
                                No frames added yet. Use bulk upload or add
                                manually.
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={() => addArrayItem("timelineFrames")}
                        className="text-xs text-slate-500 hover:text-sky-400 transition flex items-center gap-1"
                    >
                        <span>+</span> Add Single Frame URL
                    </button>
                </div>
            )}

            {formData.type === "layered" && (
                <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                        Layers
                    </label>
                    {formData.layers.map((layer, index) => (
                        <div key={index} className="flex gap-2 items-start">
                            <input
                                type="text"
                                value={layer.label}
                                onChange={(e) =>
                                    handleLayerChange(
                                        index,
                                        "label",
                                        e.target.value
                                    )
                                }
                                className="w-1/3 rounded bg-slate-800 p-2 border border-slate-700 focus:border-sky-500 outline-none"
                                placeholder="Label"
                            />
                            <div className="flex-1">
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg, image/gif"
                                    onChange={(e) =>
                                        handleFileUpload(
                                            e,
                                            "layers",
                                            index,
                                            "image"
                                        )
                                    }
                                    className="w-full text-xs text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-slate-800 file:text-sky-400"
                                />
                                <input
                                    type="text"
                                    value={layer.image}
                                    onChange={(e) =>
                                        handleLayerChange(
                                            index,
                                            "image",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 w-full rounded bg-slate-800 p-2 border border-slate-700 focus:border-sky-500 outline-none"
                                    placeholder="Image URL"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => removeLayer(index)}
                                className="text-red-400 hover:text-red-300 mt-2"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addLayer}
                        className="text-xs text-sky-400 hover:text-sky-300"
                    >
                        + Add Layer
                    </button>
                </div>
            )}

            <div className="flex justify-end gap-4 pt-4 border-t border-slate-800">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-slate-400 hover:text-white transition"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={uploading}
                    className={`px-6 py-2 rounded text-white font-bold transition ${
                        uploading
                            ? "bg-slate-700 cursor-not-allowed"
                            : "bg-sky-600 hover:bg-sky-500"
                    }`}
                >
                    {uploading ? "Uploading..." : "Save Item"}
                </button>
            </div>
        </form>
    );
}
