import { Pagination, PaginationContent, PaginationItem, PaginationPrevious } from "@/components";

interface Props {
	currentPage: number;
	totalPages: number;
}

export function BlogPagination({ currentPage, totalPages }: Props) {
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<Pagination className="mt-6">
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious href="#" />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
