import { siteConfig } from "@/config/site";
import { permanentRedirect } from "next/navigation";

export default async function CookiesRedirectPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;

	const redirectPath = locale === siteConfig.defaultLocale ? "/cookie-policy" : `/${locale}/cookie-policy`;

	permanentRedirect(redirectPath);
}
