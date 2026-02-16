// src/lib/consent.ts

// Категорії, які будемо вмикати/вимикати
export type ConsentCategory = "necessary" | "preferences" | "analytics" | "marketing";

export type Consent = Record<ConsentCategory, boolean> & {
	// технічні поля для аудиту/версіонування
	version: string;
	timestamp: number; // ms since epoch
};

export const CONSENT_COOKIE = "gti_cc"; // ім'я cookie згоди
export const CONSENT_VERSION = "v1"; // міняй при зміні категорій/логіки
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 180; // 180 днів

export const DEFAULT_CONSENT: Consent = {
	necessary: true, // завжди true
	preferences: false,
	analytics: false,
	marketing: false,
	version: CONSENT_VERSION,
	timestamp: 0,
};

// зручні «готові стани»
export const acceptAll = (): Consent => ({
	...DEFAULT_CONSENT,
	preferences: true,
	analytics: true,
	marketing: true,
	timestamp: Date.now(),
});

export const rejectAll = (): Consent => ({
	...DEFAULT_CONSENT,
	// все залишаємо false (крім necessary)
	preferences: false,
	analytics: false,
	marketing: false,
	timestamp: Date.now(),
});

// ---- CLIENT ONLY helpers ----
export function readConsentFromDocument(): Consent | null {
	if (typeof document === "undefined") return null;
	const match = document.cookie.split("; ").find((c) => c.startsWith(`${CONSENT_COOKIE}=`));
	if (!match) return null;
	try {
		const raw = decodeURIComponent(match.split("=")[1] || "");
		const parsed = JSON.parse(raw);
		// мінімальна валідація ключів
		if (
			typeof parsed === "object" &&
			["necessary", "preferences", "analytics", "marketing"].every((k) => k in parsed)
		) {
			return parsed as Consent;
		}
	} catch {}
	return null;
}

export function writeConsentToDocument(consent: Consent) {
	if (typeof document === "undefined") return;
	const value = encodeURIComponent(JSON.stringify(consent));
	document.cookie = `${CONSENT_COOKIE}=${value}; Path=/; Max-Age=${CONSENT_MAX_AGE}; SameSite=Lax; Secure`;
}

// ---- SERVER ONLY helper (використаємо пізніше в layout при потребі) ----
export function readConsentFromHeaderCookie(
	getCookie: (name: string) => string | undefined
): Consent | null {
	try {
		const raw = getCookie(CONSENT_COOKIE);
		if (!raw) return null;
		const parsed = JSON.parse(decodeURIComponent(raw));
		if (
			typeof parsed === "object" &&
			["necessary", "preferences", "analytics", "marketing"].every((k) => k in parsed)
		) {
			return parsed as Consent;
		}
	} catch {}
	return null;
}
