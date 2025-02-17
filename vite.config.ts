import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	// Server configuration
	server: {
		port: 3000, // Port for the dev server
		hmr: true, // Enable Hot Module Replacement

		// Proxy server for API requests
		proxy: {
			"/api": {
				target: "http://localhost:5000", // Server URL
				changeOrigin: true,
				rewrite: (path: string) => path.replace(/^\/api/, ""),
			},
		},
	},

	// Plugins
	plugins: [
		TanStackRouterVite({
			autoCodeSplitting: true,
			routesDirectory: "./src/app",
			generatedRouteTree: "./src/routes.gen.ts",
			quoteStyle: "double",
			semicolons: false,
		}),
		react(),
		tailwindcss(),
	],

	// Resolve configuration
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"), // Shorten the import path for src directory
		},
	},

	// Build configuration
	build: {
		outDir: "dist", // Directory for the production build
		sourcemap: true, // Generate source maps for debugging
	},
});
