import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: siteConfig.name,
		short_name: siteConfig.shortName,
		description: siteConfig.defaultDescription,
		start_url: "/",
		display: "standalone",
		background_color: "#ffffff",
		theme_color: siteConfig.themeColor,
		lang: siteConfig.defaultLocale,
		icons: [
			{
				src: "/icon",
				sizes: "512x512",
				type: "image/png",
			},
			{
				src: "/apple-icon",
				sizes: "180x180",
				type: "image/png",
			},
		],
	};
}
