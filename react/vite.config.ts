import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate", // service worker se update-uje automatski
            manifest: {
                name: "Learnify Platform",
                short_name: "Learnify",
                start_url: "/",
                display: "standalone",
                background_color: "#ffffff",
                theme_color: "#000000",
                icons: [
                    {
                        src: "/pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "/pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
                screenshots: [
                    {
                        src: "/home-phone.png",
                        sizes: "375x604",
                        type: "image/png",
                        form_factor: "narrow",
                    },
                    {
                        src: "/home-desktop.png",
                        sizes: "1344x609",
                        type: "image/png",
                        form_factor: "wide",
                    },
                ],
            },
        }),
    ],
});
