// lib/api.ts
export const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL!; // має бути з /api

// Створюємо API клієнт з fetch
export const api = {
	async get<T>(url: string, config?: { params?: Record<string, unknown> }): Promise<{ data: T }> {
		let fullUrl = `${STRAPI_API_URL}${url}`;

		if (config?.params) {
			// Використовуємо URLSearchParams для правильного кодування
			const searchParams = new URLSearchParams();

			// Рекурсивно обробляємо вкладені об'єкти
			const addParams = (obj: Record<string, unknown>, prefix = "") => {
				Object.entries(obj).forEach(([key, value]) => {
					const paramKey = prefix ? `${prefix}[${key}]` : key;

					if (typeof value === "object" && value !== null) {
						addParams(value as Record<string, unknown>, paramKey);
					} else if (value !== undefined && value !== null) {
						searchParams.append(paramKey, String(value));
					}
				});
			};

			addParams(config.params);
			fullUrl = `${fullUrl}?${searchParams.toString()}`;
		}

		const response = await fetch(fullUrl);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return { data };
	},
};
