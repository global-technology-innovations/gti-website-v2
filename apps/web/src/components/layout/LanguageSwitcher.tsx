"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";

const languages = [
	{ code: "uk", flag: "ua" },
	{ code: "sk", flag: "sk" },
	{ code: "cs", flag: "cz" },
	{ code: "de", flag: "de" },
	{ code: "fr", flag: "fr" },
	{ code: "en", flag: "gb" },
];

const FlagIcon = ({ flag }: { flag: string }) => (
	<span className="flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-full">
		<span className={`fi fis fi-${flag} !m-0 !block !h-full !w-full !rounded-full !bg-cover !bg-center`} />
	</span>
);

export const LanguageSwitcher = () => {
	const locale = useLocale();
	const t = useTranslations("LanguageSwitcher.languages");
	const pathname = usePathname();
	const router = useRouter();
	const params = useParams<{ slug?: string | string[] }>();
	const [isPending, startTransition] = useTransition();

	const handleChange = (lang: string) => {
		startTransition(async () => {
			const currentPath = pathname || "/";
			let nextPath = currentPath;

			if (typeof params.slug === "string" && isDynamicDetailPath(currentPath)) {
				try {
					const response = await fetch(
						`/api/locale-path?pathname=${encodeURIComponent(currentPath)}&locale=${encodeURIComponent(locale)}&targetLocale=${encodeURIComponent(lang)}`
					);

					if (response.ok) {
						const data = (await response.json()) as { pathname?: string };

						if (data.pathname) {
							nextPath = data.pathname;
						}
					} else {
						nextPath = getDynamicRouteFallback(currentPath);
					}
				} catch {
					nextPath = getDynamicRouteFallback(currentPath);
				}
			}

			router.push(nextPath, { locale: lang });
		});
	};

	const currentLang = languages.find((l) => l.code === locale);

	return (
		<Select onValueChange={handleChange} defaultValue={locale} disabled={isPending}>
			<SelectTrigger className="cursor-pointer !text-sm text-primary bg-foreground px-4 py-2 rounded-full border-0 shadow-none min-w-0 w-auto">
				<SelectValue>
					<span className="flex items-center gap-2">
						{currentLang ? <FlagIcon flag={currentLang.flag} /> : null}
						<span className="inlone md:hidden lg:inline ">{currentLang ? t(currentLang.code) : null}</span>
					</span>
				</SelectValue>
			</SelectTrigger>
			<SelectContent className="bg-white ">
				{languages.map((lang) => (
					<SelectItem value={lang.code} key={lang.code} className="cursor-pointer">
						<span className="flex items-center gap-2">
							<FlagIcon flag={lang.flag} />
							<span className="!font-normal !text-sm">{t(lang.code)}</span>
						</span>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

function isDynamicDetailPath(pathname: string) {
	return /^\/(our-services|portfolio|blog)\/[^/]+$/.test(pathname);
}

function getDynamicRouteFallback(pathname: string) {
	if (pathname.startsWith("/our-services/")) {
		return "/our-services";
	}

	if (pathname.startsWith("/portfolio/")) {
		return "/portfolio";
	}

	if (pathname.startsWith("/blog/")) {
		return "/blog";
	}

	return pathname;
}
