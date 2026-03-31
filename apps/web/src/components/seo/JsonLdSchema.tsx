"use client";

import { siteConfig } from "@/config/site";
import { useTranslations } from "next-intl";
import Script from "next/script";

interface OrganizationSchemaProps {
	type?: "Organization" | "LocalBusiness" | "ConstructionCompany";
	locale?: string;
}

export function OrganizationSchema({ type = "ConstructionCompany" }: OrganizationSchemaProps) {
	const t = useTranslations("Seo.organization");
	const tGeo = useTranslations("Seo.geo");
	const tExpertise = useTranslations("Seo.expertise");
	const siteUrl = siteConfig.url;
	const organizationSchema = {
		"@context": "https://schema.org",
		"@type": type,
		name: siteConfig.legalName,
		alternateName: siteConfig.shortName,
		description: t("description"),
		url: siteUrl,
		logo: `${siteUrl}/logo.png`,
		image: `${siteUrl}/opengraph-image`,
		foundingDate: "2009",
		founders: [
			{
				"@type": "Person",
				name: t("founder"),
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
				name: tGeo("slovakia"),
			},
			{
				"@type": "Country",
				name: tGeo("czechRepublic"),
			},
			{
				"@type": "Country",
				name: tGeo("ukraine"),
			},
		],
		serviceType: [
			tExpertise("constructionServices"),
			tExpertise("buildingRenovation"),
			tExpertise("projectManagement"),
			tExpertise("architecturalServices"),
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

	return <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />;
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
		<Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
	);
}

interface ServiceSchemaProps {
	locale?: string;
	serviceType: "outstaffing" | "portfolio";
}

export function ServiceSchema({ serviceType }: ServiceSchemaProps) {
	const t = useTranslations(`Seo.services.${serviceType}`);
	const tGeo = useTranslations("Seo.geo");
	const siteUrl = siteConfig.url;

	const serviceSchema = {
		"@context": "https://schema.org",
		"@type": "Service",
		name: t("name"),
		description: t("description"),
		provider: {
			"@type": "Organization",
			name: siteConfig.legalName,
			url: siteUrl,
			telephone: "+421021234567",
			email: "info@global-technology-innovations.com",
		},
		serviceType: t("serviceType"),
		areaServed: [
			{
				"@type": "Country",
				name: tGeo("slovakia"),
			},
			{
				"@type": "Country",
				name: tGeo("czechRepublic"),
			},
			{
				"@type": "Country",
				name: tGeo("ukraine"),
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
	const t = useTranslations("Seo.contactPage");
	const tLanguages = useTranslations("LanguageSwitcher.languages");
	const siteUrl = siteConfig.url;
	const contactPageSchema = {
		"@context": "https://schema.org",
		"@type": "ContactPage",
		mainEntity: {
			"@type": "Organization",
			name: siteConfig.legalName,
			url: siteUrl,
			logo: `${siteUrl}/logo.png`,
			contactPoint: {
				"@type": "ContactPoint",
				telephone: "+421021234567",
				contactType: t("contactType"),
				email: "info@global-technology-innovations.com",
				availableLanguage: [
					tLanguages("sk"),
					tLanguages("cs"),
					tLanguages("en"),
					tLanguages("uk"),
					tLanguages("de"),
					tLanguages("fr"),
				],
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

export function AboutPageSchema({}: AboutPageSchemaProps = {}) {
	const t = useTranslations("AboutPage.meta");
	const tSeoOrganization = useTranslations("Seo.organization");
	const tExpertise = useTranslations("Seo.expertise");
	const siteUrl = siteConfig.url;

	const aboutPageSchema = {
		"@context": "https://schema.org",
		"@type": "AboutPage",
		mainEntity: {
			"@type": "Organization",
			"@id": `${siteUrl}/#organization`,
			name: siteConfig.legalName,
			alternateName: siteConfig.shortName,
			description: t("description"),
			foundingDate: "2009",
			founders: [
				{
					"@type": "Person",
					name: tSeoOrganization("founder"),
				},
			],
			numberOfEmployees: {
				"@type": "QuantitativeValue",
				value: "50+",
			},
			knowsAbout: [
				tExpertise("constructionServices"),
				tExpertise("buildingRenovation"),
				tExpertise("projectManagement"),
				tExpertise("architecturalServices"),
			],
		},
	};

	return (
		<Script id="about-page-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
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
	const siteUrl = siteConfig.url;
	const jobPostingSchema = {
		"@context": "https://schema.org",
		"@type": "JobPosting",
		title: job.title,
		description: job.description,
		datePosted: job.datePosted,
		employmentType: job.employmentType,
		hiringOrganization: {
			"@type": "Organization",
			name: siteConfig.legalName,
			sameAs: siteUrl,
			logo: `${siteUrl}/logo.png`,
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
		<Script id="job-posting-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }} />
	);
}

interface ProjectSchemaProps {
	project: {
		name: string;
		description: string;
		url: string;
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
		"@id": project.url,
		name: project.name,
		description: project.description,
		image: project.image,
		creator: {
			"@type": "Organization",
			name: siteConfig.legalName,
			url: siteConfig.url,
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

	return <Script id="project-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }} />;
}

interface ArticleSchemaProps {
	article: {
		title: string;
		description: string;
		url: string;
		image?: string;
		publishedAt?: string;
		modifiedAt?: string;
		category?: string;
	};
}

export function ArticleSchema({ article }: ArticleSchemaProps) {
	const articleSchema = {
		"@context": "https://schema.org",
		"@type": "Article",
		mainEntityOfPage: article.url,
		headline: article.title,
		description: article.description,
		image: article.image || `${siteConfig.url}/opengraph-image`,
		datePublished: article.publishedAt,
		dateModified: article.modifiedAt || article.publishedAt,
		articleSection: article.category,
		author: {
			"@type": "Organization",
			name: siteConfig.legalName,
			url: siteConfig.url,
		},
		publisher: {
			"@type": "Organization",
			name: siteConfig.legalName,
			logo: {
				"@type": "ImageObject",
				url: `${siteConfig.url}/logo.png`,
			},
		},
	};

	return <Script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />;
}

interface WebPageSchemaProps {
	name: string;
	description: string;
	url: string;
	locale?: string;
}

export function WebPageSchema({ name, description, url, locale = "uk" }: WebPageSchemaProps) {
	const siteUrl = siteConfig.url;
	const webPageSchema = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		name,
		description,
		url,
		inLanguage: locale,
		isPartOf: {
			"@type": "WebSite",
			"@id": `${siteUrl}/#website`,
			name: siteConfig.name,
			url: siteUrl,
		},
		publisher: {
			"@type": "Organization",
			"@id": `${siteUrl}/#organization`,
			name: siteConfig.legalName,
		},
	};

	return <Script id="webpage-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />;
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
	ArticleSchema,
	WebPageSchema,
};

export default JsonLdSchema;
