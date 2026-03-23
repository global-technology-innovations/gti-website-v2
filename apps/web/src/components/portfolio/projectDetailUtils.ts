import { format, type Locale } from "date-fns";
import type renderRichText from "@/lib/renderRichText";

export function formatProjectPeriod(startDate: string, endDate: string | undefined, locale: Locale) {
	if (!startDate) {
		return "";
	}

	const formattedStart = format(new Date(startDate), "LLLL yyyy", { locale });

	if (!endDate) {
		return capitalizeFirst(formattedStart);
	}

	const formattedEnd = format(new Date(endDate), "LLLL yyyy", { locale });

	if (formattedStart === formattedEnd) {
		return capitalizeFirst(formattedStart);
	}

	return `${capitalizeFirst(formattedStart)} - ${capitalizeFirst(formattedEnd)}`;
}

export function getProjectStatusKey(status: "completed" | "in-progress" | "planned") {
	if (status === "completed") return "completed";
	if (status === "in-progress") return "inProgress";
	return "planned";
}

export function parseProjectDescription(description?: string): Parameters<typeof renderRichText>[0] | null {
	if (!description) {
		return null;
	}

	try {
		return JSON.parse(description) as Parameters<typeof renderRichText>[0];
	} catch (error) {
		console.error("Failed to parse project description", error);
		return null;
	}
}

function capitalizeFirst(value: string) {
	return value.charAt(0).toUpperCase() + value.slice(1);
}
