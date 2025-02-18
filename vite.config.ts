import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { analyzer } from "vite-bundle-analyzer";

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
		analyzer(),
		// Put the Sentry vite plugin after all other plugins
		sentryVitePlugin({
			org: process.env.SENTRY_ORG,
			project: process.env.SENTRY_PROJECT,

			// Auth tokens can be obtained from https://sentry.io/orgredirect/organizations/:orgslug/settings/auth-tokens/
			authToken: process.env.SENTRY_AUTH_TOKEN,
		}),
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
