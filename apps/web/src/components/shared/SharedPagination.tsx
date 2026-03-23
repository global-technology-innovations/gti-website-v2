"use client";

import { Pagination, PaginationItem, PaginationLink } from "@/components/ui";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface SharedPaginationProps {
	currentPage: number;
	totalPages: number;
	onChange: (page: number) => void;
	previousLabel?: string;
	nextLabel?: string;
	className?: string;
}

export function SharedPagination({
	currentPage,
	totalPages,
	onChange,
	previousLabel = "Previous",
	nextLabel = "Next",
	className,
}: SharedPaginationProps) {
	const goTo = (page: number) => {
		if (page < 1 || page > totalPages) return;
		onChange(page);
	};

	const visiblePages = getVisiblePages(currentPage, totalPages);

	return (
		<Pagination className={cn("mt-10", className)}>
			<div className="flex w-full items-center justify-between gap-4">
				<a
					href="#"
					onClick={(event) => {
						event.preventDefault();
						goTo(currentPage - 1);
					}}
					className={cn(
						"flex items-center gap-2 text-[18px] text-primary transition-opacity hover:opacity-70",
						currentPage === 1 && "pointer-events-none opacity-50"
					)}
				>
					<ArrowLeft className="size-5" />
					<span>{previousLabel}</span>
				</a>

				<ul className="flex items-center gap-2 md:gap-4">
					{visiblePages.map((item, index) =>
						item === "ellipsis" ? (
							<li key={`ellipsis-${index}`} className="px-2 text-[18px] text-primary/60">
								...
							</li>
						) : (
							<PaginationItem key={item}>
								<PaginationLink
									href="#"
									className={cn(
										"flex size-9 items-center justify-center rounded-full border-0 bg-transparent px-0 py-0 text-[16px] text-primary hover:bg-transparent hover:text-primary",
										item === currentPage && "bg-secondary text-white hover:bg-secondary hover:text-white"
									)}
									isActive={item === currentPage}
									onClick={(event) => {
										event.preventDefault();
										goTo(item);
									}}
								>
									{item}
								</PaginationLink>
							</PaginationItem>
						)
					)}
				</ul>

				<a
					href="#"
					onClick={(event) => {
						event.preventDefault();
						goTo(currentPage + 1);
					}}
					className={cn(
						"flex items-center gap-2 text-[18px] text-primary transition-opacity hover:opacity-70",
						currentPage === totalPages && "pointer-events-none opacity-50"
					)}
				>
					<span>{nextLabel}</span>
					<ArrowRight className="size-5" />
				</a>
			</div>
		</Pagination>
	);
}

function getVisiblePages(currentPage: number, totalPages: number): Array<number | "ellipsis"> {
	if (totalPages <= 5) {
		return Array.from({ length: totalPages }, (_, index) => index + 1);
	}

	const pages = new Set<number>([1, 2, currentPage - 1, currentPage, currentPage + 1, totalPages - 1, totalPages]);
	const sortedPages = Array.from(pages)
		.filter((page) => page >= 1 && page <= totalPages)
		.sort((a, b) => a - b);

	const visiblePages: Array<number | "ellipsis"> = [];

	for (let index = 0; index < sortedPages.length; index += 1) {
		const page = sortedPages[index];
		const previousPage = sortedPages[index - 1];

		if (previousPage && page - previousPage > 1) {
			visiblePages.push("ellipsis");
		}

		visiblePages.push(page);
	}

	return visiblePages;
}
