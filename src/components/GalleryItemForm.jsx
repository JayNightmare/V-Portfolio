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
                <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                        Timeline Frames
                    </label>
                    {formData.timelineFrames.map((frame, index) => (
                        <div key={index} className="flex gap-2 items-center">
                            {frame && (
                                <img
                                    src={frame}
                                    alt=""
                                    className="h-10 w-10 rounded object-cover bg-slate-800"
                                />
                            )}
                            <div className="flex-1">
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg, image/gif"
                                    onChange={(e) =>
                                        handleFileUpload(
                                            e,
                                            "timelineFrames",
                                            index
                                        )
                                    }
                                    className="w-full text-xs text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-slate-800 file:text-sky-400"
                                />
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
                                    className="mt-1 w-full rounded bg-slate-800 p-1 border border-slate-700 focus:border-sky-500 outline-none text-xs"
                                    placeholder="Frame URL"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() =>
                                    removeArrayItem(index, "timelineFrames")
                                }
                                className="text-red-400 hover:text-red-300"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addArrayItem("timelineFrames")}
                        className="text-xs text-sky-400 hover:text-sky-300"
                    >
                        + Add Frame
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
