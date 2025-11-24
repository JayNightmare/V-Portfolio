import { useState, useEffect } from "react";

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
            software: formData.software.split(",").map((s) => s.trim()).filter(Boolean),
            tags: formData.tags.split(",").map((s) => s.trim()).filter(Boolean),
            palette: formData.palette.split(",").map((s) => s.trim()).filter(Boolean),
        };
        onSubmit(submissionData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 text-slate-200">
            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Title</label>
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
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Slug</label>
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
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Type</label>
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
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Year</label>
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
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Dimensions</label>
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
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Description</label>
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
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Main Image URL</label>
                <input
                    type="text"
                    name="mainImage"
                    value={formData.mainImage}
                    onChange={handleChange}
                    className="mt-2 w-full rounded bg-slate-800 p-2 border border-slate-700 focus:border-sky-500 outline-none"
                    required
                />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Software (comma separated)</label>
                    <input
                        type="text"
                        name="software"
                        value={formData.software}
                        onChange={handleChange}
                        className="mt-2 w-full rounded bg-slate-800 p-2 border border-slate-700 focus:border-sky-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Tags (comma separated)</label>
                    <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        className="mt-2 w-full rounded bg-slate-800 p-2 border border-slate-700 focus:border-sky-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Palette (comma separated hex)</label>
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
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Timeline Frames (URLs)</label>
                    {formData.timelineFrames.map((frame, index) => (
                        <div key={index} className="flex gap-2">
                            <input
                                type="text"
                                value={frame}
                                onChange={(e) => handleArrayChange(index, e.target.value, "timelineFrames")}
                                className="w-full rounded bg-slate-800 p-2 border border-slate-700 focus:border-sky-500 outline-none"
                                placeholder="Frame URL"
                            />
                            <button type="button" onClick={() => removeArrayItem(index, "timelineFrames")} className="text-red-400 hover:text-red-300">×</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addArrayItem("timelineFrames")} className="text-xs text-sky-400 hover:text-sky-300">+ Add Frame</button>
                </div>
            )}

            {formData.type === "layered" && (
                <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Layers</label>
                    {formData.layers.map((layer, index) => (
                        <div key={index} className="flex gap-2 items-start">
                            <input
                                type="text"
                                value={layer.label}
                                onChange={(e) => handleLayerChange(index, "label", e.target.value)}
                                className="w-1/3 rounded bg-slate-800 p-2 border border-slate-700 focus:border-sky-500 outline-none"
                                placeholder="Label"
                            />
                            <input
                                type="text"
                                value={layer.image}
                                onChange={(e) => handleLayerChange(index, "image", e.target.value)}
                                className="w-full rounded bg-slate-800 p-2 border border-slate-700 focus:border-sky-500 outline-none"
                                placeholder="Image URL"
                            />
                            <button type="button" onClick={() => removeLayer(index)} className="text-red-400 hover:text-red-300 mt-2">×</button>
                        </div>
                    ))}
                    <button type="button" onClick={addLayer} className="text-xs text-sky-400 hover:text-sky-300">+ Add Layer</button>
                </div>
            )}

            <div className="flex justify-end gap-4 pt-4 border-t border-slate-800">
                <button type="button" onClick={onCancel} className="px-4 py-2 text-slate-400 hover:text-white transition">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-sky-600 hover:bg-sky-500 rounded text-white font-bold transition">Save Item</button>
            </div>
        </form>
    );
}
