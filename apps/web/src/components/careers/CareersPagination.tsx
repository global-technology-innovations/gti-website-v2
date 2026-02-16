"use client";

import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components";
import { cn } from "@/lib/utils";

export function CareersPagination({ page, totalPages, onChange }: Props) {
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	const goTo = (p: number) => {
		if (p < 1 || p > totalPages) return;
		onChange(p);
	};

	return (
		<Pagination className="mt-6">
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href="#"
						onClick={(e) => {
							e.preventDefault();
							goTo(page - 1);
						}}
						className={cn("p-2 rounded-md", {
							"pointer-events-none opacity-50": page === 1,
						})}
					/>
				</PaginationItem>
				{pages.map((p) => (
					<PaginationItem key={p}>
						<PaginationLink
							href="#"
							className="size-8.5 flex items-center justify-center"
							isActive={p === page}
							onClick={(e) => {
								e.preventDefault();
								goTo(p);
							}}
						>
							{p}
						</PaginationLink>
					</PaginationItem>
				))}
				<PaginationItem>
					<PaginationNext
						href="#"
						onClick={(e) => {
							e.preventDefault();
							goTo(page + 1);
						}}
						className={cn("p-2 rounded-md", {
							"pointer-events-none opacity-50": page === totalPages,
						})}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}

interface Props {
	page: number;
	totalPages: number;
	onChange: (page: number) => void;
}
