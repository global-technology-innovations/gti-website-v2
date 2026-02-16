import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"flex justify-center items-center rounded-full w-fit px-4.5 py-2 font-medium transition-colors text-[15px] leading-none",
	{
		variants: {
			variant: {
				default: "bg-blue-100 text-blue-700 border-transparent",
				secondary: "bg-secondary/10 !text-secondary border-none",
				outline: "text-gray-800",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLSpanElement>,
		VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
	({ className, variant, ...props }, ref) => {
		return <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />;
	}
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
