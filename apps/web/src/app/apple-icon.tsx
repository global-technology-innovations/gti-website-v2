import { ImageResponse } from "next/og";

export const size = {
	width: 180,
	height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
	return new ImageResponse(
		<div
			style={{
				height: "100%",
				width: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				background: "#0B2A4A",
				borderRadius: 36,
				color: "#FFFFFF",
				fontSize: 62,
				fontWeight: 700,
				letterSpacing: "-0.08em",
			}}
		>
			GTI
		</div>,
		size
	);
}
