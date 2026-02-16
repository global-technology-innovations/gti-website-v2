"use client";

import Script from "next/script";

interface OrganizationSchemaProps {
	type?: "Organization" | "LocalBusiness" | "ConstructionCompany";
	locale?: string;
}

export function OrganizationSchema({
	type = "ConstructionCompany",
	locale = "sk",
}: OrganizationSchemaProps) {
	const descriptionMap = {
		sk: "Profesionálne stavebné služby a komplexné riešenia pre obytné, komerčné a špecializované objekty.",
		en: "Professional construction services and comprehensive solutions for residential, commercial and specialized facilities.",
		uk: "Професійні будівельні послуги та комплексні рішення для житлових, комерційних та спеціалізованих об'єктів.",
		cs: "Profesionální stavební služby a komplexní řešení pro obytné, komerční a specializované objekty.",
		fr: "Services de construction professionnels et solutions complètes pour les installations résidentielles, commerciales et spécialisées.",
		de: "Professionelle Baudienstleistungen und umfassende Lösungen für Wohn-, Gewerbe- und Spezialgebäude.",
	};
	const organizationSchema = {
		"@context": "https://schema.org",
		"@type": type,
		name: "Global Technology Innovations s. r. o.",
		alternateName: "GTI",
		description: descriptionMap[locale as keyof typeof descriptionMap] || descriptionMap.uk,
		url: "https://global-technology-innovations.vercel.app",
		logo: "https://global-technology-innovations.vercel.app/logo.png",
		image: "https://global-technology-innovations.vercel.app/og-image.png",
		foundingDate: "2009",
		founders: [
			{
				"@type": "Person",
				name: "Founder",
			},
		],
		telephone: "+421021234567",
		email: "info@global-technology-innovations.com",
		address: {
			"@type": "PostalAddress",
			streetAddress: "Jenisejská 45A",
			addressLocality: "Košice-Nad Jazerom",
			postalCode: "040 12",
			addressCountry: "SK",
		},
		geo: {
			"@type": "GeoCoordinates",
			latitude: "48.7164",
			longitude: "21.2611",
		},
		openingHours: "Mo-Fr 09:00-18:00",
		priceRange: "€€",
		areaServed: [
			{
				"@type": "Country",
				name: "Slovakia",
			},
			{
				"@type": "Country",
				name: "Czech Republic",
			},
			{
				"@type": "Country",
				name: "Ukraine",
			},
		],
		serviceType: [
			"Construction Services",
			"Building Renovation",
			"Project Management",
			"Architectural Services",
		],
		sameAs: [
			"https://www.linkedin.com/company/global-technology-innovations",
			"https://www.facebook.com/gti.innovations",
			"https://www.instagram.com/gti.innovations",
		],
	};

	return (
		<Script
			id="organization-schema"
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
		/>
	);
}

interface FAQSchemaProps {
	faqs: Array<{
		question: string;
		answer: string;
	}>;
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
	const faqSchema = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqs.map((faq) => ({
			"@type": "Question",
			name: faq.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: faq.answer,
			},
		})),
	};

	return (
		<Script
			id="faq-schema"
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
		/>
	);
}

interface BreadcrumbSchemaProps {
	items: Array<{
		name: string;
		url: string;
	}>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
	const breadcrumbSchema = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: item.url,
		})),
	};

	return (
		<Script
			id="breadcrumb-schema"
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
		/>
	);
}

interface ServiceSchemaProps {
	locale?: string;
	serviceType: "outstaffing" | "portfolio";
}

export function ServiceSchema({ locale = "sk", serviceType }: ServiceSchemaProps) {
	const serviceDescriptions = {
		outstaffing: {
			sk: "Profesionálny outstaffing stavebných špecialistov pre vaše projekty. Poskytujeme skúsených murári, elektrikári, inštalatéri a iných odborníkov.",
			en: "Professional outstaffing of construction specialists for your projects. We provide experienced bricklayers, electricians, plumbers and other professionals.",
			uk: "Професійний аутстафінг будівельних спеціалістів для ваших проєктів. Надаємо досвідчених мулярів, електриків, сантехніків та інших фахівців.",
			cs: "Profesionální outstaffing stavebních specialistů pro vaše projekty. Poskytujeme zkušené zedníky, elektrikáře, instalatéře a další odborníky.",
			fr: "Externalisation professionnelle de spécialistes en construction pour vos projets. Nous fournissons des maçons, électriciens, plombiers expérimentés et d'autres professionnels.",
			de: "Professionelles Outstaffing von Bauspezialisten für Ihre Projekte. Wir stellen erfahrene Maurer, Elektriker, Klempner und andere Fachkräfte zur Verfügung.",
		},
		portfolio: {
			sk: "Pozrite si naše realizované stavebné projekty a získajte inšpiráciu pre váš vlastný projekt. Široké spektrum úspešne dokončených stavieb.",
			en: "View our completed construction projects and get inspiration for your own project. Wide range of successfully completed buildings.",
			uk: "Перегляньте наші реалізовані будівельні проєкти та отримайте натхнення для вашого власного проєкту. Широкий спектр успішно завершених будівель.",
			cs: "Podívejte se na naše realizované stavební projekty a získejte inspiraci pro váš vlastní projekt. Široké spektrum úspěšně dokončených staveb.",
			fr: "Découvrez nos projets de construction réalisés et inspirez-vous pour votre propre projet. Large éventail de bâtiments achevés avec succès.",
			de: "Sehen Sie sich unsere realisierten Bauprojekte an und lassen Sie sich für Ihr eigenes Projekt inspirieren. Breites Spektrum erfolgreich abgeschlossener Gebäude.",
		},
	};

	const serviceNames = {
		outstaffing: {
			sk: "Outstaffing stavebných špecialistov",
			en: "Construction Specialists Outstaffing",
			uk: "Аутстафінг будівельних спеціалістів",
			cs: "Outstaffing stavebních specialistů",
			fr: "Externalisation de spécialistes en construction",
			de: "Outstaffing von Bauspezialisten",
		},
		portfolio: {
			sk: "Portfólio projektov",
			en: "Project Portfolio",
			uk: "Портфоліо проєктів",
			cs: "Portfolio projektů",
			fr: "Portfolio de projets",
			de: "Projektportfolio",
		},
	};

	const serviceSchema = {
		"@context": "https://schema.org",
		"@type": "Service",
		name:
			serviceNames[serviceType][locale as keyof typeof serviceNames.outstaffing] ||
			serviceNames[serviceType].uk,
		description:
			serviceDescriptions[serviceType][locale as keyof typeof serviceDescriptions.outstaffing] ||
			serviceDescriptions[serviceType].uk,
		provider: {
			"@type": "Organization",
			name: "Global Technology Innovations s. r. o.",
			url: "https://global-technology-innovations.vercel.app",
			telephone: "+421021234567",
			email: "info@global-technology-innovations.com",
		},
		serviceType: serviceType === "outstaffing" ? "Personnel Outstaffing" : "Construction Portfolio",
		areaServed: [
			{
				"@type": "Country",
				name: "Slovakia",
			},
			{
				"@type": "Country",
				name: "Czech Republic",
			},
			{
				"@type": "Country",
				name: "Ukraine",
			},
		],
		offers: {
			"@type": "Offer",
			availability: "https://schema.org/InStock",
			validFrom: new Date().toISOString(),
			priceRange: "€€",
		},
	};

	return (
		<Script
			id={`${serviceType}-service-schema`}
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
		/>
	);
}

interface ContactPageSchemaProps {
	locale?: string;
}

export function ContactPageSchema({}: ContactPageSchemaProps = {}) {
	const contactPageSchema = {
		"@context": "https://schema.org",
		"@type": "ContactPage",
		mainEntity: {
			"@type": "Organization",
			name: "Global Technology Innovations s. r. o.",
			url: "https://global-technology-innovations.vercel.app",
			logo: "https://global-technology-innovations.vercel.app/logo.png",
			contactPoint: {
				"@type": "ContactPoint",
				telephone: "+421021234567",
				contactType: "customer service",
				email: "info@global-technology-innovations.com",
				availableLanguage: ["Slovak", "Czech", "English", "Ukrainian", "German", "French"],
				areaServed: ["SK", "CZ", "UA"],
			},
			address: {
				"@type": "PostalAddress",
				streetAddress: "Jenisejská 45A",
				addressLocality: "Košice-Nad Jazerom",
				postalCode: "040 12",
				addressCountry: "SK",
			},
		},
	};

	return (
		<Script
			id="contact-page-schema"
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
		/>
	);
}

interface AboutPageSchemaProps {
	locale?: string;
}

export function AboutPageSchema({ locale = "uk" }: AboutPageSchemaProps) {
	const descriptionMap = {
		sk: "Spoznajte Global Technology Innovations - našu históriu, misiu, víziu a hodnoty. Už viac ako 15 rokov poskytujeme kvalitné stavebné služby.",
		en: "Learn about Global Technology Innovations - our history, mission, vision and values. We have been providing quality construction services for over 15 years.",
		uk: "Дізнайтеся про Global Technology Innovations - нашу історію, місію, бачення та цінності. Ми надаємо якісні будівельні послуги понад 15 років.",
		cs: "Poznejte Global Technology Innovations - naši historii, misi, vizi a hodnoty. Více než 15 let poskytujeme kvalitní stavební služby.",
		fr: "Découvrez Global Technology Innovations - notre histoire, mission, vision et valeurs. Nous fournissons des services de construction de qualité depuis plus de 15 ans.",
		de: "Lernen Sie Global Technology Innovations kennen - unsere Geschichte, Mission, Vision und Werte. Seit über 15 Jahren bieten wir qualitativ hochwertige Baudienstleistungen.",
	};

	const aboutPageSchema = {
		"@context": "https://schema.org",
		"@type": "AboutPage",
		mainEntity: {
			"@type": "Organization",
			"@id": "https://global-technology-innovations.vercel.app/#organization",
			name: "Global Technology Innovations s. r. o.",
			alternateName: "GTI",
			description: descriptionMap[locale as keyof typeof descriptionMap] || descriptionMap.uk,
			foundingDate: "2009",
			founders: [
				{
					"@type": "Person",
					name: "Founder",
				},
			],
			numberOfEmployees: {
				"@type": "QuantitativeValue",
				value: "50+",
			},
			knowsAbout: [
				"Construction Services",
				"Building Renovation",
				"Project Management",
				"Architectural Services",
			],
		},
	};

	return (
		<Script
			id="about-page-schema"
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
		/>
	);
}

interface JobPostingSchemaProps {
	job: {
		title: string;
		description: string;
		location: string;
		employmentType: string;
		salaryMin?: number;
		salaryMax?: number;
		salaryCurrency?: string;
		datePosted: string;
	};
}

export function JobPostingSchema({ job }: JobPostingSchemaProps) {
	const jobPostingSchema = {
		"@context": "https://schema.org",
		"@type": "JobPosting",
		title: job.title,
		description: job.description,
		datePosted: job.datePosted,
		employmentType: job.employmentType,
		hiringOrganization: {
			"@type": "Organization",
			name: "Global Technology Innovations s. r. o.",
			sameAs: "https://global-technology-innovations.vercel.app",
			logo: "https://global-technology-innovations.vercel.app/logo.png",
		},
		jobLocation: {
			"@type": "Place",
			address: {
				"@type": "PostalAddress",
				addressLocality: job.location,
				addressCountry: "SK",
			},
		},
		...(job.salaryMin &&
			job.salaryMax && {
				baseSalary: {
					"@type": "MonetaryAmount",
					currency: job.salaryCurrency || "EUR",
					value: {
						"@type": "QuantitativeValue",
						minValue: job.salaryMin,
						maxValue: job.salaryMax,
						unitText: "MONTH",
					},
				},
			}),
	};

	return (
		<Script
			id="job-posting-schema"
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
		/>
	);
}

interface ProjectSchemaProps {
	project: {
		name: string;
		description: string;
		image: string;
		startDate?: string;
		endDate?: string;
		location?: string;
		client?: string;
	};
}

export function ProjectSchema({ project }: ProjectSchemaProps) {
	const projectSchema = {
		"@context": "https://schema.org",
		"@type": "CreativeWork",
		"@id": `https://global-technology-innovations.vercel.app/portfolio/${encodeURIComponent(project.name)}`,
		name: project.name,
		description: project.description,
		image: project.image,
		creator: {
			"@type": "Organization",
			name: "Global Technology Innovations s. r. o.",
			url: "https://global-technology-innovations.vercel.app",
		},
		...(project.startDate && { dateCreated: project.startDate }),
		...(project.endDate && { datePublished: project.endDate }),
		...(project.location && {
			locationCreated: {
				"@type": "Place",
				name: project.location,
			},
		}),
		...(project.client && {
			sponsor: {
				"@type": "Organization",
				name: project.client,
			},
		}),
	};

	return (
		<Script
			id="project-schema"
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
		/>
	);
}

interface WebPageSchemaProps {
	name: string;
	description: string;
	url: string;
	locale?: string;
}

export function WebPageSchema({ name, description, url, locale = "uk" }: WebPageSchemaProps) {
	const webPageSchema = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		name,
		description,
		url,
		inLanguage: locale,
		isPartOf: {
			"@type": "WebSite",
			"@id": "https://global-technology-innovations.vercel.app/#website",
			name: "Global Technology Innovations",
			url: "https://global-technology-innovations.vercel.app",
		},
		publisher: {
			"@type": "Organization",
			"@id": "https://global-technology-innovations.vercel.app/#organization",
			name: "Global Technology Innovations s. r. o.",
		},
	};

	return (
		<Script
			id="webpage-schema"
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
		/>
	);
}

const JsonLdSchema = {
	OrganizationSchema,
	FAQSchema,
	BreadcrumbSchema,
	ServiceSchema,
	ContactPageSchema,
	AboutPageSchema,
	JobPostingSchema,
	ProjectSchema,
	WebPageSchema,
};

export default JsonLdSchema;
