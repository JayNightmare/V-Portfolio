const API_URL = import.meta.env.VITE_API_URL || "/api";

export const fetchGalleryItems = async () => {
    // eslint-disable-next-line no-undef
    const response = await fetch(`${API_URL}/gallery`);
    if (!response.ok) {
        throw new Error("Failed to fetch gallery items");
    }
    return response.json();
};

export const fetchGalleryItemBySlug = async (slug) => {
    // eslint-disable-next-line no-undef
    const response = await fetch(`${API_URL}/gallery/${slug}`);
    if (!response.ok) {
        throw new Error("Failed to fetch gallery item");
    }
    return response.json();
};

export const loginUser = async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
    }

    return response.json();
};

export const createGalleryItem = async (itemData, token) => {
    const response = await fetch(`${API_URL}/gallery`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(itemData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create item");
    }

    return response.json();
};

export const updateGalleryItem = async (id, itemData, token) => {
    const response = await fetch(`${API_URL}/gallery/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(itemData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update item");
    }

    return response.json();
};

export const deleteGalleryItem = async (id, token) => {
    const response = await fetch(`${API_URL}/gallery/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete item");
    }

    return response.json();
};
