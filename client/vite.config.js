/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */

/**
 * The file is used to customize the behaviour of the Vite tool
 */

import { defineConfig } from "vite";

export default defineConfig({
    build: {
        outDir: "../server/public",
        emptyOutDir: true,
    },
    server: {
        proxy: {
            '/gifts': {
                target: 'http://localhost:3001'
            }
        }
    }
});