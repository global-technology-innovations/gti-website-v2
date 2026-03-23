import type renderRichText from "@/lib/renderRichText";

export const DETAIL_CONTENT_CLASSNAMES: Parameters<typeof renderRichText>[1] = {
	heading: "text-[28px] leading-[36px] font-bold uppercase text-primary sm:text-[32px] sm:leading-[40px]",
	heading2: "!text-[32px] text-primary",
	heading3: "text-[24px] leading-[32px] font-bold uppercase text-primary sm:text-[28px] sm:leading-[36px]",
	paragraph: "!text-[16px] !leading-[24px] !font-medium !text-primary-foreground",
	ul: "!list-outside list-disc pl-5 space-y-3 marker:text-secondary",
	ol: "!list-outside list-decimal pl-5 space-y-3 marker:text-secondary",
	li: "!pl-1 !text-[16px] !leading-[24px] !font-medium !text-primary-foreground",
	link: "!text-secondary underline underline-offset-4",
	blockquote: "!my-0 border-l-2 !border-secondary/30 !pl-5 !text-[16px] !leading-[24px] !font-medium !text-primary-foreground",
	image: "rounded-3xl",
};
