// lib/api.ts
import { buildStrapiUrl, STRAPI_API_URL } from "@/lib/strapi";

export { STRAPI_API_URL };

// Створюємо API клієнт з fetch
export const api = {
	async get<T>(url: string, config?: { params?: Record<string, unknown> }): Promise<{ data: T }> {
		const response = await fetch(buildStrapiUrl(url, config?.params));
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return { data };
	},
};
