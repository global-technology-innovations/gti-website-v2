import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center bg-primary justify-center font-medium text-white text-[17px] px-4 rounded-full transition-all duration-200 ease-[cubic-bezier(.08,.52,.52,1)] cursor-pointer border border-solid shadow-sm hover:scale-[1.01] active:scale-[0.99]",
	{
		variants: {
			variant: {
				default: "",
				secondary: "bg-secondary",
				outline: "bg-transparent border border-foreground text-primary text-sm shadow-none",
				white: "bg-white text-primary border-none",
			},
			size: {
				default: "px-7 py-3.5",
				small: "px-4 py-2",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);
function Button({
	className,
	variant,
	size,
	asChild = false,
	children,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }), "gap-2")} {...props}>
			{asChild ? children : <>{children}</>}
		</Comp>
	);
}

export { Button, buttonVariants };
