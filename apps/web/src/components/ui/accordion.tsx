"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ArrowRightIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

function Accordion({ ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
	return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
	return (
		<AccordionPrimitive.Item
			data-slot="accordion-item"
			className={cn(
				"rounded-3xl p-6 flex flex-col gap-4 bg-background transition-colors has-[[data-state=open]]:bg-primary data-[state=open]:bg-primary",
				className
			)}
			{...props}
		/>
	);
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
	return (
		<AccordionPrimitive.Header className="flex group">
			<AccordionPrimitive.Trigger
				data-slot="accordion-trigger"
				className={cn(
					"cursor-pointer flex flex-1 items-start justify-between text-left text-[18px] font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 text-primary group-data-[state=open]:text-white leading-6",
					className
				)}
				{...props}
			>
				{children}
				<ArrowRightIcon className="text-primary group-data-[state=open]:text-white group-data-[state=open]:rotate-45 pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
	return (
		<AccordionPrimitive.Content
			data-slot="accordion-content"
			className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
			{...props}
		>
			<div className={cn("", className)}>{children}</div>
		</AccordionPrimitive.Content>
	);
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
