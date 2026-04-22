export interface StrapiJob {
	id: number;
	attributes: {
		title: string;
		location: string;
		shortDescription: string;
		createdAt?: string;
		updatedAt?: string;
	};
}

export interface StrapiResponse<T> {
	data: T[];
}

export interface StrapiMedia {
	data: {
		id: number;
		attributes: {
			name: string;
			alternativeText?: string;
			caption?: string;
			width: number;
			height: number;
			formats?: {
				thumbnail?: {
					url: string;
					width: number;
					height: number;
				};
				small?: {
					url: string;
					width: number;
					height: number;
				};
				medium?: {
					url: string;
					width: number;
					height: number;
				};
				large?: {
					url: string;
					width: number;
					height: number;
				};
			};
			hash: string;
			ext: string;
			mime: string;
			size: number;
			url: string;
			previewUrl?: string;
			provider: string;
			createdAt: string;
			updatedAt: string;
		};
	} | null;
}

// Backward compatibility
export type StrapiImage = StrapiMedia;

export interface StrapiLocalizationEntry {
	id: number;
	attributes: {
		locale: string;
		slug?: string | null;
		title?: string;
	};
}

export interface StrapiLocalizationsRelation {
	data: StrapiLocalizationEntry[];
}

export interface StrapiService {
	id: number;
	attributes: {
		title: string;
		slug: string;
		shortDescription: string;
		description: unknown;
		image: StrapiMedia;
		icon: string;
		localizations?: StrapiLocalizationsRelation;
		createdAt?: string;
		updatedAt?: string;
	};
}

export interface StrapiProject {
	id: number;
	attributes: {
		title: string;
		slug?: string;
		shortDescription: string;
		description?: string;
		category?: string;
		client: string;
		location: string;
		startDate: string;
		endDate?: string;
		status: "completed" | "in-progress" | "planned";
		technologies?: string[];
		images: {
			data: Array<{
				id: number;
				attributes: {
					name: string;
					alternativeText?: string;
					caption?: string;
					width: number;
					height: number;
					formats?: {
						thumbnail?: {
							url: string;
							width: number;
							height: number;
						};
						small?: {
							url: string;
							width: number;
							height: number;
						};
						medium?: {
							url: string;
							width: number;
							height: number;
						};
						large?: {
							url: string;
							width: number;
							height: number;
						};
					};
					hash: string;
					ext: string;
					mime: string;
					size: number;
					url: string;
					previewUrl?: string;
					provider: string;
					createdAt: string;
					updatedAt: string;
				};
			}>;
		};
		mainImage: StrapiMedia;
		featured: boolean;
		localizations?: StrapiLocalizationsRelation;
		createdAt?: string;
		updatedAt?: string;
	};
}

export interface StrapiBlogCategory {
	id: number;
	attributes: {
		name: string;
		slug?: string;
	};
}

export interface StrapiBlogArticle {
	id: number;
	attributes: {
		title: string;
		slug: string;
		excerpt: string;
		content: unknown;
		image: StrapiMedia;
		featured: boolean;
		publishedAt?: string;
		localizations?: StrapiLocalizationsRelation;
		createdAt?: string;
		updatedAt?: string;
		blog_category?: {
			data: StrapiBlogCategory | null;
		};
	};
}
