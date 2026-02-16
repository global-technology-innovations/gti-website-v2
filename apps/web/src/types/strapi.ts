export interface StrapiJob {
	id: number;
	attributes: {
		title: string;
		location: string;
		shortDescription: string;
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

export interface StrapiService {
	id: number;
	attributes: {
		title: string;
		slug: string;
		shortDescription: string;
		description: string;
		image: StrapiMedia;
		icon: string;
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
	};
}
