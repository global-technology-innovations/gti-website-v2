import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => {
	const t = useTranslations("Common.accessibility");

	return (
		<nav role="navigation" aria-label={t("pagination")} className={cn("mx-auto flex w-full justify-center", className)} {...props} />
	);
};
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(({ className, ...props }, ref) => (
	<ul ref={ref} className={cn("flex items-center gap-2", className)} {...props} />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(({ className, ...props }, ref) => (
	<li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

interface PaginationLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	isActive?: boolean;
}
const PaginationLink = React.forwardRef<HTMLAnchorElement, PaginationLinkProps>(({ className, isActive, ...props }, ref) => (
	<a
		ref={ref}
		aria-current={isActive ? "page" : undefined}
		className={cn(
			"text-muted-foreground hover:text-foreground flex px-2 py-1 items-center justify-center rounded-md border border-transparent bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
			isActive && "bg-accent text-accent-foreground",
			className
		)}
		{...props}
	/>
));
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
	({ className, ...props }, ref) => (
		<PaginationLink ref={ref} className={cn("", className)} {...props}>
			<ChevronLeft className="size-4" />
			{/* <span>Previous</span> */}
		</PaginationLink>
	)
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
	({ className, ...props }, ref) => (
		<PaginationLink ref={ref} className={cn("", className)} {...props}>
			{/* <span>Next</span> */}
			<ChevronRight className="size-4" />
		</PaginationLink>
	)
);
PaginationNext.displayName = "PaginationNext";

export { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious };
