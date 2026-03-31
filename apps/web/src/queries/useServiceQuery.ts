import { fetchServices, type Service } from "@/lib/services/services";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export type { Service } from "@/lib/services/services";

export function useServicesQuery() {
	const locale = useLocale();

	return useQuery<Service[]>({
		queryKey: ["services", locale],
		queryFn: () => fetchServices(locale),
		staleTime: 1000 * 60 * 5,
	});
}
