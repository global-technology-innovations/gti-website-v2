import {
	AnalyticsGate,
	CookieBanner,
	CookieConsentProvider,
	Footer,
	Header,
	ReactQueryProvider,
	ScrollAnimationProvider,
} from "@/components";
import { generateCanonicalUrl, generateHreflangUrls } from "@/components/seo/PageMeta";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params;
	const [tHeader, tLayout] = await Promise.all([
		getTranslations({ locale, namespace: "Header" }),
		getTranslations({ locale, namespace: "Layout.meta" }),
	]);

	return {
		title: tHeader("companyName"),
		description: tLayout("description"),
		alternates: {
			canonical: generateCanonicalUrl(locale),
			languages: generateHreflangUrls(),
		},
		openGraph: {
			title: tHeader("companyName"),
			description: tLayout("description"),
			url: generateCanonicalUrl(locale),
			siteName: siteConfig.name,
			images: [
				{
					url: `${siteConfig.url}/opengraph-image`,
					width: 1200,
					height: 630,
					alt: siteConfig.name,
				},
			],
			locale:
				siteConfig.localeNames[locale as keyof typeof siteConfig.localeNames] || siteConfig.localeNames[siteConfig.defaultLocale],
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title: tHeader("companyName"),
			description: tLayout("description"),
			images: [`${siteConfig.url}/twitter-image`],
			creator: siteConfig.twitterHandle,
			site: siteConfig.twitterHandle,
		},
	};
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	setRequestLocale(locale);

	return (
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
	);
}
