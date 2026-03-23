"use client";

import { DETAIL_CONTENT_CLASSNAMES } from "@/lib/detailContentClassNames";
import renderRichText from "@/lib/renderRichText";

interface ProjectDetailContentSectionProps {
	content: Parameters<typeof renderRichText>[0] | null;
	fallbackDescription: string;
}

export function ProjectDetailContentSection({ content, fallbackDescription }: ProjectDetailContentSectionProps) {
	return (
		<section className="px-4 py-16 md:py-20">
			<div className="container mx-auto">
				<div className="mx-auto max-w-[1100px] space-y-6">
					{content ? (
						renderRichText(content, DETAIL_CONTENT_CLASSNAMES)
					) : (
						<p className="!text-[16px] !font-medium !leading-[24px] !text-primary-foreground">{fallbackDescription}</p>
					)}
				</div>
			</div>
		</section>
	);
}
