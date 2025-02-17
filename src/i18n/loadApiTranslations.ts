import i18n from "i18next";
import { API_URL } from "@/lib/consts";

let hasLoaded = false;

const fetchTranslationsFromAPI = async (lng: string) => {
	try {
		const response = await fetch(`${API_URL}/translations?lang=${lng}`);
		if (!response.ok) throw new Error("Error fetching translations");
		return await response.json();
	} catch (error) {
		console.error("Failed to fetch translations:", error);
		return {}; // Retorna un objeto vacío si la API falla
	}
};

export const loadApiTranslations = async () => {
	if (hasLoaded) return;
	hasLoaded = true;

	const currentLang = i18n.language || "en";
	const apiTranslations = await fetchTranslationsFromAPI(currentLang);

	i18n.addResourceBundle(currentLang, "translation", apiTranslations, true);
	console.log(`✅ API translations loaded for ${currentLang}`);
};
