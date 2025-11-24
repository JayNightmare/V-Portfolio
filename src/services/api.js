const API_URL = import.meta.env.VITE_API_URL || "/api";

export const fetchGalleryItems = async () => {
    const response = await fetch(`${API_URL}/gallery`);
    if (!response.ok) {
        throw new Error("Failed to fetch gallery items");
    }
    return response.json();
};

export const fetchGalleryItemBySlug = async (slug) => {
    const response = await fetch(`${API_URL}/gallery/${slug}`);
    if (!response.ok) {
        throw new Error("Failed to fetch gallery item");
    }
    return response.json();
};
