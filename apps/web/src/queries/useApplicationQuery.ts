import { STRAPI_API_URL } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

interface CreateAppPayload {
	name: string;
	phone: string;
	coverText: string;
	job: number | string;
	email?: string | null;
	cvFile?: File | null;
}

export default function useCreateApplication() {
	return useMutation({
		mutationFn: async (payload: CreateAppPayload) => {
			const fd = new FormData();

			const data: {
				name: string;
				phone: string;
				coverText: string;
				job: number | string;
				email?: string;
			} = {
				name: payload.name?.trim(),
				phone: payload.phone?.trim(),
				coverText: payload.coverText?.trim(),
				job: payload.job,
			};

			const email = payload.email?.trim();
			if (email) data.email = email;

			fd.append("data", JSON.stringify(data));

			// файл — назва поля повинна збігатися з media-полем у моделі (cv)
			if (payload.cvFile) {
				fd.append("files.cv", payload.cvFile);
			}

			const res = await fetch(`${STRAPI_API_URL}/applications`, {
				method: "POST",
				body: fd, // Content-Type не ставимо — браузер проставить boundary сам
			});

			if (!res.ok) {
				const txt = await res.text().catch(() => "");
				throw new Error(`Application creation failed: ${res.status} ${txt}`);
			}
			return res.json();
		},
	});
}
