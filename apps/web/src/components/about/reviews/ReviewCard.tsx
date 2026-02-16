import { Card } from "@/components/ui";
import Image from "next/image";

export interface Review {
	name: string;
	role: string;
	text: string;
	avatar?: string;
}

interface ReviewCardProps {
	review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
	return (
		<Card variant="default" className="h-full flex flex-col text-left">
			<div className="flex items-start gap-4 mb-4">
				<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden">
					{review.avatar ? (
						<Image
							src={review.avatar}
							alt={review.name}
							width={48}
							height={48}
							className="w-full h-full object-cover"
						/>
					) : (
						<span className="text-primary font-semibold text-sm">
							{review.name
								.split(" ")
								.map((n) => n[0])
								.join("")
								.slice(0, 2)
								.toUpperCase()}
						</span>
					)}
				</div>
				<div>
					<h3 className="text-primary font-bold uppercase">{review.name}</h3>
					<p className="text-primary/45 text-sm">{review.role}</p>
				</div>
			</div>
			<p className="text-primary flex-1">{review.text}</p>
		</Card>
	);
}
