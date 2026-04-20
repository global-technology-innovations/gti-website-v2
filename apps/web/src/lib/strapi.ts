export const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL!;

export class StrapiFetchError extends Error {
	status: number;
	path: string;

	constructor(path: string, status: number) {
		super(`Failed to fetch ${path}: ${status}`);
		this.name = "StrapiFetchError";
		this.status = status;
		this.path = path;
	}
}

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
		throw new StrapiFetchError(path, response.status);
	}

	return (await response.json()) as T;
}

export function resolveStrapiMediaUrl(url?: string) {
	if (!url) {
		return "";
	}

	return url.startsWith("http") ? url : `${STRAPI_API_URL.replace("/api", "")}${url}`;
}
