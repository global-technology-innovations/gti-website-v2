"use client";

import Logo from "@/../public/logo.png";
import { Button, LanguageSwitcher, Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const Header = () => {
	const t = useTranslations("Header");
	const [open, setOpen] = useState(false);
	const pathname = usePathname();
	const pathWithoutLocale = `/${pathname.split("/").slice(2).join("/")}`;
	const PAGES_WITH_BACKGROUND = ["/", "/about"];
	const useHeaderBackground =
		PAGES_WITH_BACKGROUND.includes(pathWithoutLocale) ||
		pathWithoutLocale.startsWith("/our-services/") ||
		pathWithoutLocale.startsWith("/blog/") ||
		pathWithoutLocale.startsWith("/portfolio/") ||
		pathWithoutLocale.startsWith("/outstaffing") ||
		pathWithoutLocale.startsWith("/cookie-policy") ||
		pathWithoutLocale.startsWith("/privacy-policy");

	return (
		<header className={cn("z-50 mx-4 mt-4 rounded-t-3xl pt-6", useHeaderBackground ? "bg-background" : "bg-white")}>
			<div className="mx-auto flex justify-between items-center container mx-auto h-16">
				<div className="flex items-center gap-1">
					<Link href="/">
						<Image src={Logo} alt="GTI Logo" width={56} height={56} />
					</Link>
					{/*<Link href="/">{t("companyName")} </Link>*/}
					<Link href="/" className="leading-[17px] text-[15px] font-semibold text-primary-foreground">
						Global <br /> Technology <br /> Innovations
					</Link>
				</div>

				{/* Desktop nav */}
				<nav className="hidden md:flex gap-0.5 items-center">
					<Link
						href="/"
						className={cn(
							"!text-sm text-primary bg-foreground px-4 py-2 rounded-full",
							pathWithoutLocale !== "/" && "",
							pathWithoutLocale === "/" && "bg-primary text-white"
						)}
					>
						{t("nav.home")}
					</Link>
					<Link
						href="/about"
						className={cn(
							"!text-sm text-primary bg-foreground px-4 py-2 rounded-full",
							pathWithoutLocale !== "/about" && "",
							pathWithoutLocale === "/about" && "bg-primary text-white"
						)}
					>
						{t("nav.about")}
					</Link>
					<Link
						href="/our-services"
						className={cn(
							"!text-sm text-primary bg-foreground px-4 py-2 rounded-full",
							pathWithoutLocale !== "/our-services" && "",
							pathWithoutLocale === "/our-services" && "bg-primary text-white"
						)}
					>
						{t("nav.services")}
					</Link>
					<Link
						href="/portfolio"
						className={cn(
							"!text-sm text-primary bg-foreground px-4 py-2 rounded-full",
							pathWithoutLocale !== "/portfolio" && "",
							pathWithoutLocale === "/portfolio" && "bg-primary text-white"
						)}
					>
						{t("nav.portfolio")}
					</Link>
					<Link
						href="/careers"
						className={cn(
							"!text-sm text-primary bg-foreground px-4 py-2 rounded-full",
							pathWithoutLocale !== "/careers" && "",
							pathWithoutLocale === "/careers" && "bg-primary text-white"
						)}
					>
						{t("nav.careers")}
					</Link>
					<Link
						href="/outstaffing"
						className={cn(
							"!text-sm text-primary bg-foreground px-4 py-2 rounded-full",
							pathWithoutLocale !== "/outstaffing" && "",
							pathWithoutLocale === "/outstaffing" && "bg-primary text-white"
						)}
					>
						{t("nav.outstaffing")}
					</Link>
					<Link
						href="/blog"
						className={cn(
							"!text-sm text-primary bg-foreground px-4 py-2 rounded-full",
							pathWithoutLocale !== "/blog" && "",
							pathWithoutLocale === "/blog" && "bg-primary text-white"
						)}
					>
						{t("nav.blog")}
					</Link>
					<Link
						href="/contact"
						className={cn(
							"!text-sm text-primary bg-foreground px-4 py-2 rounded-full",
							pathWithoutLocale !== "/contact" && "",
							pathWithoutLocale === "/contact" && "bg-primary text-white"
						)}
					>
						{t("nav.contact")}
					</Link>
				</nav>
				<div className="hidden md:block">
					<LanguageSwitcher />
				</div>

				{/* Mobile nav */}
				<div className="md:hidden">
					<Sheet open={open} onOpenChange={setOpen}>
						<SheetTrigger asChild>
							<Button variant="secondary">
								<Menu className="h-5 w-5" />
							</Button>
						</SheetTrigger>
						<SheetContent side="bottom">
							<SheetTitle>
								<VisuallyHidden>Mobile navigation menu</VisuallyHidden>
							</SheetTitle>
							<nav className="flex flex-col justify-center items-center h-full py-12 gap-4 font-normal">
								<Link href="/" onClick={() => setOpen(false)} className="!text-ml">
									{t("nav.home")}
								</Link>
								<Link href="/about" onClick={() => setOpen(false)} className="!text-ml">
									{t("nav.about")}
								</Link>
								<Link href="/our-services" onClick={() => setOpen(false)} className="!text-ml">
									{t("nav.services")}
								</Link>
								<Link href="/portfolio" onClick={() => setOpen(false)} className="!text-ml">
									{t("nav.portfolio")}
								</Link>
								<Link href="/careers" onClick={() => setOpen(false)} className="!text-ml">
									{t("nav.careers")}
								</Link>
								<Link href="/outstaffing" onClick={() => setOpen(false)} className="!text-ml">
									{t("nav.outstaffing")}
								</Link>
								<Link href="/contact" onClick={() => setOpen(false)} className="!text-ml">
									{t("nav.contact")}
								</Link>
								<LanguageSwitcher />
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
};
