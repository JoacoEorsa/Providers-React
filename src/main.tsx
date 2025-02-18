import { scan } from "react-scan";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { initializeSentry, getSentryErrorHandlers } from "@/config/sentry";
import { queryClient } from "@/config/queryClient";
import { router } from "@/config/router";
import "@/i18n/i18n";

scan({ enabled: true });

initializeSentry();

const container = document.getElementById("root");
if (!container) {
	throw new Error("There's no #root div, something's wrong with our index.html");
}

const root = ReactDOM.createRoot(container, getSentryErrorHandlers());

root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</React.StrictMode>
);
