import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
	locales: ["uk", "sk", "cs", "en", "de", "fr"],
	defaultLocale: "uk",
});
