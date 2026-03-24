import { permanentRedirect } from "next/navigation";

export default async function CookiesRedirectPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;

	permanentRedirect(`/${locale}/cookie-policy`);
}
