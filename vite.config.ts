import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    define: {
        "process.env": "{}",
    },
    resolve: {
        alias: {
            buffer: "buffer",
            "@components": path.resolve(__dirname, "./src/components"),
            "@data": path.resolve(__dirname, "./src/data"),
            "@hooks": path.resolve(__dirname, "./src/hooks"),
            "@i18n": path.resolve(__dirname, "./src/i18n"),
            "@pdf": path.resolve(__dirname, "./src/pdf"),
            "@store": path.resolve(__dirname, "./src/store"),
            "@type": path.resolve(__dirname, "./src/type"),
            "@shared": path.resolve(__dirname, "./src/shared"),
        },
    },
});
