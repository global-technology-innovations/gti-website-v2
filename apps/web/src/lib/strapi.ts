export const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL!;

function appendSearchParams(searchParams: URLSearchParams, value: unknown, prefix = "") {
	if (typeof value !== "object" || value === null) {
		if (prefix && value !== undefined) {
			searchParams.append(prefix, String(value));
		}

		return;
	}

	Object.entries(value).forEach(([key, nestedValue]) => {
		const paramKey = prefix ? `${prefix}[${key}]` : key;
		appendSearchParams(searchParams, nestedValue, paramKey);
	});
}

export function buildStrapiUrl(path: string, params?: Record<string, unknown>) {
	const normalizedPath = path.startsWith("/") ? path : `/${path}`;
	const url = new URL(`${STRAPI_API_URL}${normalizedPath}`);

	if (params) {
		appendSearchParams(url.searchParams, params);
	}

	return url.toString();
}

export async function fetchStrapiData<T>(path: string, params?: Record<string, unknown>, options: { revalidate?: number } = {}) {
	const response = await fetch(buildStrapiUrl(path, params), {
		next: { revalidate: options.revalidate ?? 300 },
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch ${path}: ${response.status}`);
	}

	return (await response.json()) as T;
}

export function resolveStrapiMediaUrl(url?: string) {
	if (!url) {
		return "";
	}

	return url.startsWith("http") ? url : `${STRAPI_API_URL.replace("/api", "")}${url}`;
}
