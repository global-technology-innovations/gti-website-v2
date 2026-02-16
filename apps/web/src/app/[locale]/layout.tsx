import {
	AnalyticsGate,
	CookieBanner,
	CookieConsentProvider,
	Footer,
	Header,
	ReactQueryProvider,
} from "@/components";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

const manrope = Manrope({
	subsets: ["latin", "cyrillic"],
	weight: ["200", "300", "400", "500", "600", "700"],
	variable: "--font-manrope",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Global Technology Innovations",
	description: "Будівельна компанія повного циклу",
};

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	return (
		<html lang={locale}>
			<body
				className={`${manrope.className} font-sans bg-white relative min-h-screen flex flex-col`}
			>
				<CookieConsentProvider>
					<ReactQueryProvider>
						<NextIntlClientProvider>
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
