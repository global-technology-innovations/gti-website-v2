"use client";

import { Button, Card } from "@/components";
import { MapPin, Navigation } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export default function MapSection() {
	const t = useTranslations("ContactPage");
	const locale = useLocale();

	const officeLocation = {
		googleMapsUrl: "https://maps.google.com/?q=Jenisejská+45A,+040+12+Košice-Nad+Jazerom",
		directionsUrl: "https://www.google.com/maps/dir//Jenisejská+45A,+040+12+Košice-Nad+Jazerom",
	};

	return (
		<section className="py-16">
			<div className="container mx-auto px-4">
				<div className="text-center mb-12">
					<h2 className="mb-4">{t("map.title")}</h2>
					<p className="mx-auto">{t("map.description")}</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
					<Card className="">
						{/* Google Maps Embed */}
						<div className="relative w-full h-[400px]">
							<iframe
								src={`https://maps.google.com/maps?q=Jenisejská+45A,+040+12+Košice-Nad+Jazerom&hl=${locale}&z=16&output=embed`}
								width="100%"
								height="100%"
								style={{ border: 0 }}
								allowFullScreen
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
								title={t("map.iframeTitle")}
								className="absolute inset-0 rounded-lg"
							/>
						</div>
					</Card>
					<div className="space-y-6">
						<div className="space-y-4">
							<div className="flex items-start space-x-3">
								<div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mt-1">
									<MapPin className="w-5 h-5 text-blue-600" />
								</div>
								<div>
									<h3 className="text-xl font-semibold text-gray-800 mb-2">{t("map.addressTitle")}</h3>
									<p className="text-gray-600 leading-relaxed">{t("map.address")}</p>
								</div>
							</div>
						</div>

						<div className="space-y-3">
							<Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
								<a
									href={officeLocation.googleMapsUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-center space-x-2"
								>
									<MapPin className="w-4 h-4" />
									<span>{t("map.viewOnGoogleMaps")}</span>
								</a>
							</Button>

							<Button asChild variant="ghost" className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50">
								<a
									href={officeLocation.directionsUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-center space-x-2"
								>
									<Navigation className="w-4 h-4" />
									<span>{t("map.getDirections")}</span>
								</a>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
