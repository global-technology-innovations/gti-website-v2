import { StrapiResponse, StrapiService } from "@/types/strapi";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

async function fetchServices(locale: string): Promise<Service[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/services?locale=${locale}&populate=image`,
    {
      next: { revalidate: 60 },
    },
  );

  const json: StrapiResponse<StrapiService> = await res.json();

  return json.data.map((item) => ({
    id: String(item.id),
    title: item.attributes.title,
    slug: item.attributes.slug,
    shortDescription: item.attributes.shortDescription,
    description: item.attributes.description,
    image: item.attributes.image?.data?.attributes?.url ?? "",
    icon: item.attributes.icon,
  }));
}

export function useServicesQuery() {
  const locale = useLocale();

  return useQuery<Service[]>({
    queryKey: ["services", locale],
    queryFn: () => fetchServices(locale),
    staleTime: 1000 * 60 * 5,
  });
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  image: string;
  icon: string;
}
