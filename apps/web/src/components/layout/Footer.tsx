"use client";

import { siteContact } from "@/config/site-contact";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaFacebook, FaTiktok, FaWhatsapp } from "react-icons/fa";

const socialIcons = {
	whatsapp: FaWhatsapp,
	facebook: FaFacebook,
	tiktok: FaTiktok,
};

export const Footer = () => {
	const t = useTranslations("Footer");
	const tHeader = useTranslations("Header");

	return (
		<footer className="relative mx-4 bg-primary rounded-3xl py-12  mt-4">
			<div className="flex flex-col md:flex-row text-sm justify-between gap-5 container mx-auto px-6">
				{/* mobile */}
				<div className="flex justify-around md:hidden">
					<div className="flex flex-col items-center md:justify-around md:items-start gap-2">
						<Link href="/about" className="!font-normal text-base md:text-sm !text-white">
							{tHeader("nav.about")}
						</Link>
						<Link href="/our-services" className="!font-normal text-base md:text-sm !text-white">
							{tHeader("nav.services")}
						</Link>
						<Link href="/portfolio" className="!font-normal text-base md:text-sm !text-white">
							{tHeader("nav.portfolio")}
						</Link>
						<Link href="/careers" className="!font-normal text-base md:text-sm !text-white">
							{tHeader("nav.careers")}
						</Link>
						<Link href="/contact" className="!font-normal text-base md:text-sm !text-white">
							{tHeader("nav.contact")}
						</Link>
					</div>

					<div className="flex flex-col justify-around">
						{siteContact.socials.map((social) => {
							const Icon = socialIcons[social.key];

							return (
								<Link
									key={social.key}
									href={social.href}
									className="!text-white"
									aria-label={social.label}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Icon className="size-7 md:size-5" />
								</Link>
							);
						})}
					</div>
				</div>

				{/* desktop */}
				<div className="hidden md:flex items-center md:justify-around md:items-start gap-8">
					<Link href="/about" className="text-white font-semibold text-[16px] underline-animate">
						{tHeader("nav.about")}
					</Link>
					<Link href="/our-services" className="text-white font-semibold text-[16px] underline-animate">
						{tHeader("nav.services")}
					</Link>
					<Link href="/portfolio" className="text-white font-semibold text-[16px] underline-animate">
						{tHeader("nav.portfolio")}
					</Link>
					<Link href="/careers" className="text-white font-semibold text-[16px] underline-animate">
						{tHeader("nav.careers")}
					</Link>
					<Link href="/contact" className="text-white font-semibold text-[16px] underline-animate">
						{tHeader("nav.contact")}
					</Link>
				</div>

				<div className="hidden md:flex gap-4 justify-around">
					{siteContact.socials.map((social) => {
						const Icon = socialIcons[social.key];

						return (
							<Link
								key={social.key}
								href={social.href}
								className="!text-white transition-transform duration-200 hover:scale-110"
								aria-label={social.label}
								target="_blank"
								rel="noopener noreferrer"
							>
								<div className="size-8 rounded-full border border-white flex items-center justify-center">
									<Icon className="size-6" />
								</div>
							</Link>
						);
					})}
				</div>
			</div>

			<div className="border-t border-white/10 my-10 container mx-auto"></div>

			<div className="flex justify-between items-center container mx-auto">
				<div className="text-[15px] font-semibold text-white/60">{t("rights")}</div>

				<div className="flex items-center gap-6 text-center text-white w-full md:w-auto font-light">
					<Link href="/privacy-policy" className="underline-animate text-[15px] font-semibold">
						Політика конфіденційності
					</Link>
					<Link href="/cookie-policy" className="underline-animate text-[15px] font-semibold">
						Політика cookie
					</Link>
				</div>
			</div>
		</footer>
	);
};
