import type { Viewport } from "next";
import { siteConfig } from "@/config/site";

export default function viewport(): Viewport {
	return {
		themeColor: siteConfig.themeColor,
		colorScheme: "light",
	};
}
