import { getBaseUrl, siteConfig } from "@/config/site";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
	subsets: ["latin", "cyrillic"],
	weight: ["200", "300", "400", "500", "600", "700"],
	variable: "--font-manrope",
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: getBaseUrl(),
	applicationName: siteConfig.name,
	manifest: "/manifest.webmanifest",
	icons: {
		icon: [{ url: "/favicon.ico" }, { url: "/icon", type: "image/png" }],
		apple: [{ url: "/apple-icon", type: "image/png" }],
	},
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	const locale = await getLocale().catch(() => siteConfig.defaultLocale);

	return (
		<html lang={locale}>
			<body className={`${manrope.className} font-sans bg-white relative min-h-screen flex flex-col`}>{children}</body>
		</html>
	);
}
