import { useTranslation } from "react-i18next";
import { createFileRoute } from "@tanstack/react-router";

const RouteComponent = () => {
	const { t } = useTranslation();

	return <div>{t("Hello {exactPath} exact path!", { exactPath: "/_logged-in/admin/" })}</div>;
};

export const Route = createFileRoute("/_logged-in/admin/")({ component: RouteComponent });
