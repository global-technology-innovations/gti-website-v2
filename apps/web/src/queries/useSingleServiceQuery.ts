import { useQuery } from "@tanstack/react-query";
// import { StrapiImage } from "@/types/strapi";

async function fetchServiceBySlug(slug: string, locale: string) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/services?filters[slug][$eq]=${slug}&locale=${locale}&populate=image`,
		{ next: { revalidate: 60 } }
	);
	const json = await res.json();
	const service = json.data?.[0];

	if (!service) return null;

	const { attributes } = service;

	return {
		title: attributes.title,
		slug: attributes.slug,
		shortDescription: attributes.shortDescription,
		description: attributes.description,
		icon: attributes.icon,
		image: attributes.image?.data?.attributes?.url ?? "",
	};
}

export function useSingleServiceQuery(slug: string, locale: string) {
	return useQuery({
		queryKey: ["service", slug, locale],
		queryFn: () => fetchServiceBySlug(slug, locale),
		enabled: !!slug,
		staleTime: 1000 * 60 * 10,
	});
}

// interface StrapiService {
//   id: number;
//   attributes: {
//     title: string;
//     slug: string;
//     shortDescription: string;
//     description: string;
//     icon: string;
//     image: StrapiImage;
//   };
// }
