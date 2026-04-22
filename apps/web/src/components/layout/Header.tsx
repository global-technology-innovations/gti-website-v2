"use client";

import Logo from "@/../public/logo.png";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const Header = () => {
	const t = useTranslations("Header");
	const [open, setOpen] = useState(false);
	const pathname = usePathname();
	const currentPath = pathname || "/";
	const PAGES_WITH_BACKGROUND = ["/", "/about"];
	const useHeaderBackground =
		PAGES_WITH_BACKGROUND.includes(currentPath) ||
		currentPath.startsWith("/our-services/") ||
		currentPath.startsWith("/blog/") ||
		currentPath.startsWith("/portfolio/") ||
		currentPath.startsWith("/outstaffing") ||
		currentPath.startsWith("/cookie-policy") ||
		currentPath.startsWith("/privacy-policy");
	const mobileNavLinkClassName = (href: string) =>
		cn(
			"w-full text-center text-primary font-medium leading-[35px] transition-colors",
			currentPath === href && "font-bold underline decoration-primary decoration-2 underline-offset-4"
		);

	return (
		<header className={cn("z-50 mx-4 mt-4 rounded-t-3xl pt-6 px-4 lg:px-0", useHeaderBackground ? "bg-background" : "bg-white")}>
			<div className="flex justify-between items-center lg:mx-8 h-16">
				<div className="flex items-center gap-1">
					<Link href="/">
						<Image src={Logo} alt={t("companyName")} width={56} height={56} />
					</Link>
					<Link
						href="/"
						className="block whitespace-pre-line md:hidden lg:block leading-[17px] text-[15px] font-semibold text-primary-foreground"
					>
						{t("companyNameMultiline")}
					</Link>
				</div>

				{/* Desktop nav */}
				<nav className="hidden md:flex gap-0.5 items-center">
					<Link
						href="/"
						className={cn(
							"text-xs xl:text-sm text-primary bg-foreground px-2.5 py-1.5 xl:px-4 xl:py-2 rounded-full",
							currentPath !== "/" && "",
							currentPath === "/" && "bg-primary text-white"
						)}
					>
						{t("nav.home")}
					</Link>
					<Link
						href="/about"
						className={cn(
							"text-xs xl:text-sm text-primary bg-foreground px-2.5 py-1.5 xl:px-4 xl:py-2 rounded-full",
							currentPath !== "/about" && "",
							currentPath === "/about" && "bg-primary text-white"
						)}
					>
						{t("nav.about")}
					</Link>
					<Link
						href="/our-services"
						className={cn(
							"text-xs xl:text-sm text-primary bg-foreground px-2.5 py-1.5 xl:px-4 xl:py-2 rounded-full",
							currentPath !== "/our-services" && "",
							currentPath === "/our-services" && "bg-primary text-white"
						)}
					>
						{t("nav.services")}
					</Link>
					<Link
						href="/portfolio"
						className={cn(
							"text-xs xl:text-sm text-primary bg-foreground px-2.5 py-1.5 xl:px-4 xl:py-2 rounded-full",
							currentPath !== "/portfolio" && "",
							currentPath === "/portfolio" && "bg-primary text-white"
						)}
					>
						{t("nav.portfolio")}
					</Link>
					<Link
						href="/careers"
						className={cn(
							"text-xs xl:text-sm text-primary bg-foreground px-2.5 py-1.5 xl:px-4 xl:py-2 rounded-full",
							currentPath !== "/careers" && "",
							currentPath === "/careers" && "bg-primary text-white"
						)}
					>
						{t("nav.careers")}
					</Link>
					<Link
						href="/outstaffing"
						className={cn(
							"text-xs xl:text-sm text-primary bg-foreground px-2.5 py-1.5 xl:px-4 xl:py-2 rounded-full",
							currentPath !== "/outstaffing" && "",
							currentPath === "/outstaffing" && "bg-primary text-white"
						)}
					>
						{t("nav.outstaffing")}
					</Link>
					<Link
						href="/blog"
						className={cn(
							"text-xs xl:text-sm text-primary bg-foreground px-2.5 py-1.5 xl:px-4 xl:py-2 rounded-full",
							currentPath !== "/blog" && "",
							currentPath === "/blog" && "bg-primary text-white"
						)}
					>
						{t("nav.blog")}
					</Link>
					<Link
						href="/contact"
						className={cn(
							"text-xs xl:text-sm text-primary bg-foreground px-2.5 py-1.5 xl:px-4 xl:py-2 rounded-full",
							currentPath !== "/contact" && "",
							currentPath === "/contact" && "bg-primary text-white"
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
							<Button variant="ghost" aria-label={t("mobileNavigationMenuLabel")}>
								<Menu className="size-7" />
							</Button>
						</SheetTrigger>
						<SheetContent side="bottom">
							<SheetTitle>
								<VisuallyHidden>{t("mobileNavigationMenuLabel")}</VisuallyHidden>
							</SheetTitle>
							<nav className="flex flex-col justify-center items-center h-full pb-10 pt-4 gap-3 font-normal">
								<Link href="/" onClick={() => setOpen(false)} className={mobileNavLinkClassName("/")}>
									{t("nav.home")}
								</Link>
								<Link href="/about" onClick={() => setOpen(false)} className={mobileNavLinkClassName("/about")}>
									{t("nav.about")}
								</Link>
								<Link
									href="/our-services"
									onClick={() => setOpen(false)}
									className={mobileNavLinkClassName("/our-services")}
								>
									{t("nav.services")}
								</Link>
								<Link href="/portfolio" onClick={() => setOpen(false)} className={mobileNavLinkClassName("/portfolio")}>
									{t("nav.portfolio")}
								</Link>
								<Link href="/careers" onClick={() => setOpen(false)} className={mobileNavLinkClassName("/careers")}>
									{t("nav.careers")}
								</Link>
								<Link href="/outstaffing" onClick={() => setOpen(false)} className={mobileNavLinkClassName("/outstaffing")}>
									{t("nav.outstaffing")}
								</Link>
								<Link href="/contact" onClick={() => setOpen(false)} className={mobileNavLinkClassName("/contact")}>
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
