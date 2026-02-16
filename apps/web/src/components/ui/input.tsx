import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				"w-full rounded-2xl border px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground focus:outline-none mb-0",
				className
			)}
			{...props}
		/>
	);
}

export { Input };
