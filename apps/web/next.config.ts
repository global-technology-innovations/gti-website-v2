// import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig = {
	images: {
		domains: ["glowing-duck-95751bc0bf.media.strapiapp.com", "localhost"],
	},
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
