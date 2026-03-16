"use client";

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components";
import { cn } from "@/lib/utils";

interface Props {
	currentPage: number;
	totalPages: number;
	onChange: (page: number) => void;
}

export function BlogPagination({ currentPage, totalPages, onChange }: Props) {
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
	const goTo = (page: number) => {
		if (page < 1 || page > totalPages) return;
		onChange(page);
	};

	return (
		<Pagination className="mt-6">
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href="#"
						onClick={(e) => {
							e.preventDefault();
							goTo(currentPage - 1);
						}}
						className={cn("rounded-md p-2", {
							"pointer-events-none opacity-50": currentPage === 1,
						})}
					/>
				</PaginationItem>
				{pages.map((page) => (
					<PaginationItem key={page}>
						<PaginationLink
							href="#"
							className="flex size-8.5 items-center justify-center"
							isActive={page === currentPage}
							onClick={(e) => {
								e.preventDefault();
								goTo(page);
							}}
						>
							{page}
						</PaginationLink>
					</PaginationItem>
				))}
				<PaginationItem>
					<PaginationNext
						href="#"
						onClick={(e) => {
							e.preventDefault();
							goTo(currentPage + 1);
						}}
						className={cn("rounded-md p-2", {
							"pointer-events-none opacity-50": currentPage === totalPages,
						})}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
