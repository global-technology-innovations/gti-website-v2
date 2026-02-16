"use client";

import { useMutation } from "@tanstack/react-query";

export type ContactPayload = {
	name: string;
	phone?: string;
	email?: string;
	message: string;
	_hp?: string;
};

async function postContact(payload: ContactPayload) {
	const base = process.env.NEXT_PUBLIC_STRAPI_API_URL!;
	const res = await fetch(`${base}/contact-form`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	if (!res.ok) {
		let msg = "Failed to send";
		try {
			const j = await res.json();
			msg = j?.error?.message || j?.message || msg;
		} catch {}
		throw new Error(msg);
	}

	return res.json(); // { ok: true }
}

export function useSendContactForm() {
	return useMutation({
		mutationFn: postContact,
	});
}
