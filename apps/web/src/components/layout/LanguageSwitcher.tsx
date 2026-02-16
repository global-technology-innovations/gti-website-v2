"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

const languages = [
	{ code: "uk", label: "Українська", flag: "ua" },
	{ code: "sk", label: "Slovenčina", flag: "sk" },
	{ code: "cs", label: "Čeština", flag: "cz" },
	{ code: "de", label: "Deutsch", flag: "de" },
	{ code: "fr", label: "Français", flag: "fr" },
	{ code: "en", label: "English", flag: "gb" },
];

export const LanguageSwitcher = () => {
	const locale = useLocale();
	const pathname = usePathname();
	const router = useRouter();

	const handleChange = (lang: string) => {
		let newPath = pathname;

		if (/\/our-services\/[^/]+/.test(pathname)) {
			newPath = "/our-services";
		}

		router.push(newPath, { locale: lang });
	};

	const currentLang = languages.find((l) => l.code === locale);

	return (
		<Select onValueChange={handleChange} defaultValue={locale}>
			<SelectTrigger className="cursor-pointer !text-sm text-primary bg-foreground px-4 py-2 rounded-full border-0 shadow-none min-w-0 w-auto">
				<SelectValue>
					<span className="flex items-center gap-2">
						<span className={`fi fi-${currentLang?.flag} rounded-sm`} />
						<span className="inlone md:hidden lg:inline ">{currentLang?.label}</span>
					</span>
				</SelectValue>
			</SelectTrigger>
			<SelectContent className="bg-white ">
				{languages.map((lang) => (
					<SelectItem value={lang.code} key={lang.code} className="cursor-pointer">
						<span className="flex items-center gap-2">
							<span className={`fi fi-${lang.flag} rounded-sm`} />
							<span className="!font-normal !text-sm">{lang.label}</span>
						</span>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};
