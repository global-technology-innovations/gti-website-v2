import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const size = {
	width: 512,
	height: 512,
};

export const contentType = "image/png";

export default function Icon() {
	return new ImageResponse(
		<div
			style={{
				height: "100%",
				width: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: "linear-gradient(135deg, #0B2A4A 0%, #15538A 100%)",
				color: "#FFFFFF",
				fontSize: 180,
				fontWeight: 700,
				letterSpacing: "-0.08em",
			}}
		>
			{siteConfig.shortName}
		</div>,
		size
	);
}
