import { createRouter } from "@tanstack/react-router";
import { routeTree } from "@/routes.gen";

const isBotAgent = /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent);

export const router = createRouter({
	routeTree,
	defaultPreload: "intent",
	defaultPendingMinMs: isBotAgent ? 100 : 0,
});

// Register things for typesafety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}
