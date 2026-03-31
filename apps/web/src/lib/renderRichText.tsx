import { STRAPI_API_URL } from "@/lib/api";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function renderRichText(nodes: RichTextNode[], className?: Partial<Record<RichTextElementType, string>>) {
	return nodes.map((node, index) => renderNode(node, index, className));
}

function renderNode(
	node: RichTextNode | RichTextChild,
	key: React.Key,
	className?: Partial<Record<RichTextElementType, string>>
): React.ReactNode {
	// Handle inline text node
	if ("text" in node) {
		let content: React.ReactNode = node.text;

		if (node.bold) content = <strong>{content}</strong>;
		if (node.italic) content = <em>{content}</em>;
		if (node.underline) content = <u>{content}</u>;
		if (node.strikethrough) content = <s>{content}</s>;
		if (node.code)
			content = (
				<code key={key} className={cn("bg-gray-100 px-1 py-0.5 rounded text-sm font-mono", className?.code)}>
					{content}
				</code>
			);

		return <React.Fragment key={key}>{content}</React.Fragment>;
	}

	const children = hasChildren(node) ? node.children.map((child, i) => renderNode(child, i, className)) : null;

	// Handle block-level elements
	switch (node.type) {
		case "paragraph":
			return (
				<p key={key} className={cn("", className?.paragraph)}>
					{children}
				</p>
			);

		case "list":
			return node.format === "ordered" ? (
				<ol key={key} className={cn("list-decimal list-inside", className?.ol)}>
					{children}
				</ol>
			) : (
				<ul key={key} className={cn("list-disc list-inside", className?.ul)}>
					{children}
				</ul>
			);

		case "list-item":
			return (
				<li key={key} className={cn("", className?.li)}>
					{children}
				</li>
			);

		case "heading2":
		case "heading3":
		case "heading4":
		case "heading5":
		case "heading6":
		case "heading":
			return renderHeading(node as RichTextHeadingNode, key, children, className);

		case "quote":
		case "blockquote":
			return (
				<blockquote key={key} className={cn("border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4", className?.blockquote)}>
					{children}
				</blockquote>
			);

		case "link":
			return (
				<a
					key={key}
					href={node.url}
					target="_blank"
					rel="noopener noreferrer"
					className={cn("underline text-blue-600", className?.link)}
				>
					{children}
				</a>
			);

		case "image":
			const imageNode = node as RichTextImageNode;
			const imageSrc = resolveMediaUrl(imageNode.image?.formats?.medium?.url || imageNode.image?.url);

			if (!imageSrc) {
				return null;
			}

			return (
				<div key={key} className="my-8 overflow-hidden rounded-3xl">
					<Image
						src={imageSrc}
						alt={imageNode.image?.alternativeText || "Image"}
						width={imageNode.image?.width || 800}
						height={imageNode.image?.height || 600}
						className={cn("h-auto w-full object-cover", className?.image)}
						unoptimized
					/>
					{imageNode.image?.caption && (
						<p className="mt-3 text-center text-sm text-primary-foreground/70">{imageNode.image.caption}</p>
					)}
				</div>
			);

		default:
			return <div key={key}>{children}</div>;
	}
}

function renderHeading(
	node: RichTextHeadingNode,
	key: React.Key,
	children: React.ReactNode,
	className?: Partial<Record<RichTextElementType, string>>
) {
	const level = getHeadingLevel(node);
	const tagByLevel = {
		1: "h1",
		2: "h2",
		3: "h3",
		4: "h4",
		5: "h5",
		6: "h6",
	} satisfies Record<HeadingLevel, keyof React.JSX.IntrinsicElements>;
	const classNameByLevel = {
		1: className?.heading,
		2: className?.heading2,
		3: className?.heading3,
		4: className?.heading4,
		5: className?.heading5,
		6: className?.heading6,
	} satisfies Record<HeadingLevel, string | undefined>;
	const Tag = tagByLevel[level];

	return (
		<Tag key={key} className={cn("", classNameByLevel[level])}>
			{children}
		</Tag>
	);
}

function hasChildren(node: unknown): node is RichTextBaseNode {
	return typeof node === "object" && node !== null && "children" in node && Array.isArray((node as { children?: unknown }).children);
}

function resolveMediaUrl(url?: string) {
	if (!url) {
		return "";
	}

	return url.startsWith("http") ? url : `${STRAPI_API_URL.replace("/api", "")}${url}`;
}

function getHeadingLevel(node: RichTextHeadingNode): HeadingLevel {
	if (node.type === "heading") {
		return isHeadingLevel(node.level) ? node.level : 1;
	}

	const headingLevelMap = {
		heading2: 2,
		heading3: 3,
		heading4: 4,
		heading5: 5,
		heading6: 6,
	} as const;

	return headingLevelMap[node.type] ?? 1;
}

function isHeadingLevel(value: unknown): value is HeadingLevel {
	return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 6;
}

interface RichTextChild {
	type?: "text";
	text: string;
	bold?: boolean;
	italic?: boolean;
	underline?: boolean;
	strikethrough?: boolean;
	code?: boolean;
}

interface RichTextImageFormat {
	url: string;
}

interface RichTextImage {
	url: string;
	alternativeText?: string;
	caption?: string;
	formats?: {
		thumbnail?: RichTextImageFormat;
		small?: RichTextImageFormat;
		medium?: RichTextImageFormat;
		large?: RichTextImageFormat;
	};
	width?: number;
	height?: number;
}

interface RichTextImageNode {
	type: "image";
	image: RichTextImage;
	children?: RichTextChild[];
}

interface RichTextBaseNode {
	type: string;
	format?: "unordered" | "ordered";
	url?: string;
	children: Array<RichTextNode | RichTextChild>;
}

interface RichTextHeadingBaseNode extends RichTextBaseNode {
	level?: HeadingLevel;
}

type RichTextHeadingNode =
	| (RichTextHeadingBaseNode & { type: "heading" })
	| (RichTextBaseNode & {
			type: "heading2" | "heading3" | "heading4" | "heading5" | "heading6";
	  });

type RichTextNode = RichTextBaseNode | RichTextImageNode | RichTextHeadingNode;

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type RichTextElementType =
	| "paragraph"
	| "heading"
	| "heading2"
	| "heading3"
	| "heading4"
	| "heading5"
	| "heading6"
	| "blockquote"
	| "ul"
	| "ol"
	| "li"
	| "link"
	| "image"
	| "code";
