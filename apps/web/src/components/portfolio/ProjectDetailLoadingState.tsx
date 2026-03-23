"use client";

import { Loader2 } from "lucide-react";

export function ProjectDetailLoadingState() {
	return (
		<div className="mt-[75px] flex min-h-screen items-center justify-center">
			<Loader2 className="h-12 w-12 animate-spin text-primary" />
		</div>
	);
}
