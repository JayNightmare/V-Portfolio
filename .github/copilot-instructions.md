# V-Portfolio Copilot Instructions

## Project Overview

-   **Type:** React 18 Single Page Application (SPA) built with Vite.
-   **Styling:** Tailwind CSS (utility-first).
-   **Animation:** `motion` (Framer Motion) for complex animations and page transitions.
-   **Routing:** `react-router-dom` v6.

## Architecture & Patterns

-   **Entry Point:** `src/main.jsx` mounts the app. `src/App.jsx` handles routing and `AnimatePresence`.
-   **Data Flow:** Static data driven by `src/data/galleryItems.json`. No backend API currently.
-   **Routing:**
    -   Routes defined in `src/App.jsx`.
    -   Uses `AnimatePresence` with `mode="wait"` for smooth page transitions.
    -   `useLocation` key ensures routes re-render on path changes.
-   **Shared Element Transitions:**
    -   Uses `layoutId` from `motion` to animate elements between list (Gallery) and detail (GalleryItem) views.
    -   Ensure `layoutId` strings match exactly between source and destination components.

## Key Components & Directories

-   `src/pages/`: Top-level route components.
    -   Note: File naming is currently mixed (e.g., `homepage.jsx`, `extraGallery.jsx`). Prefer PascalCase for new component files.
-   `src/components/`: Reusable UI blocks (e.g., `Gallery.jsx`, `Hero.jsx`).
-   `src/animations/`: Specialized animation components (e.g., `ImageScrub.jsx`).
-   `src/hooks/`: Custom logic (e.g., `useImageScrub.js` for frame scrubbing logic).

## Development Workflow

-   **Start Dev Server:** `npm run dev`
-   **Build:** `npm run build`
-   **Lint:** `npm run lint`
-   **Deployment:**
    -   Deploys to Linode via GitHub Actions (`.github/workflows/deploy.yml`).
    -   Uses `easingthemes/ssh-deploy` to rsync `dist/` to the server.
    -   Requires GitHub Secrets: `LINODE_HOST`, `LINODE_USER`, `LINODE_SSH_KEY`, `LINODE_TARGET_DIR`.

## Coding Conventions

-   **Styling:** Use Tailwind classes. Avoid creating new CSS files unless for global resets or complex animations not possible with Tailwind.
-   **Images:**
    -   `ImageScrub` component expects an array of image URLs for frame-by-frame scrubbing.
    -   Use `loading="lazy"` for images below the fold.
-   **Motion:**
    -   When adding enter/exit animations, wrap routes or components in `AnimatePresence` if unmounting is involved.
    -   Use `layoutId` for continuity.

## Common Tasks

-   **Adding a Gallery Item:**
    1. Add entry to `src/data/galleryItems.json`.
    2. Ensure `slug` is unique.
    3. Add images (main and timeline/layers if applicable).
-   **Creating a New Page:**
    1. Create component in `src/pages/`.
    2. Add route in `src/App.jsx`.
