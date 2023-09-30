/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */

/**
 * The file is used to customize the behaviour of the Vite tool
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/gifts': {
                target: 'http://localhost:3001'
            }
        }
    },
});