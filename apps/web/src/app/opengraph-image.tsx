import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";

export const alt = `${siteConfig.name} social preview`;

export default function OpenGraphImage() {
	return new ImageResponse(
		<div
			style={{
				height: "100%",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				padding: "56px 64px",
				background:
					"radial-gradient(circle at top right, rgba(69, 155, 255, 0.35), transparent 35%), linear-gradient(135deg, #071A30 0%, #0B2A4A 55%, #15538A 100%)",
				color: "#FFFFFF",
			}}
		>
			<div
				style={{
					display: "flex",
					alignSelf: "flex-start",
					alignItems: "center",
					gap: 16,
					padding: "14px 22px",
					border: "1px solid rgba(255,255,255,0.22)",
					borderRadius: 999,
					fontSize: 28,
					fontWeight: 500,
					background: "rgba(255,255,255,0.08)",
				}}
			>
				{siteConfig.shortName}
				<span style={{ opacity: 0.8, fontSize: 24 }}>Construction. Renovation. Delivery.</span>
			</div>
			<div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 920 }}>
				<div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.02, letterSpacing: "-0.05em" }}>{siteConfig.name}</div>
				<div style={{ fontSize: 34, lineHeight: 1.25, color: "rgba(255,255,255,0.84)" }}>
					Full-cycle construction services, project execution, fit-outs, and outstaffing support for teams that need reliable
					delivery.
				</div>
			</div>
			<div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "rgba(255,255,255,0.8)" }}>
				<span>{siteConfig.url.replace("https://", "")}</span>
				<span>Slovakia and Europe</span>
			</div>
		</div>,
		size
	);
}
