import { resolveLocalizedPathname } from "@/lib/localeNavigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const pathname = request.nextUrl.searchParams.get("pathname");
	const locale = request.nextUrl.searchParams.get("locale");
	const targetLocale = request.nextUrl.searchParams.get("targetLocale");

	if (!pathname || !locale || !targetLocale) {
		return NextResponse.json({ error: "Missing pathname, locale, or targetLocale" }, { status: 400 });
	}

	try {
		const resolvedPathname = await resolveLocalizedPathname(pathname, locale, targetLocale);

		return NextResponse.json({ pathname: resolvedPathname });
	} catch (error) {
		console.error("Failed to resolve localized pathname", error);

		return NextResponse.json({ pathname });
	}
}
