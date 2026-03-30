import {
	AnalyticsGate,
	CookieBanner,
	CookieConsentProvider,
	Footer,
	Header,
	ReactQueryProvider,
	ScrollAnimationProvider,
} from "@/components";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

const manrope = Manrope({
	subsets: ["latin", "cyrillic"],
	weight: ["200", "300", "400", "500", "600", "700"],
	variable: "--font-manrope",
	display: "swap",
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params;
	const [tHeader, tLayout] = await Promise.all([
		getTranslations({ locale, namespace: "Header" }),
		getTranslations({ locale, namespace: "Layout.meta" }),
	]);

	return {
		title: tHeader("companyName"),
		description: tLayout("description"),
	};
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	return (
		<html lang={locale}>
			<body className={`${manrope.className} font-sans bg-white relative min-h-screen flex flex-col`}>
				<CookieConsentProvider>
					<ReactQueryProvider>
						<NextIntlClientProvider>
							<ScrollAnimationProvider />
							<Header />
							<main className="flex-1"> {children}</main>
							<Footer />
							<CookieBanner />
							<AnalyticsGate />
						</NextIntlClientProvider>
					</ReactQueryProvider>
				</CookieConsentProvider>
			</body>
		</html>
	);
}
