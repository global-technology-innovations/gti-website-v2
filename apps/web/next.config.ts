import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
	images: {
		domains: [
			"glowing-duck-95751bc0bf.media.strapiapp.com",
			"glowing-duck-95751bc0bf.strapiapp.com",
			"incredible-presence-5bff245248.media.strapiapp.com",
			"incredible-presence-5bff245248.strapiapp.com",
			"localhost",
		],
	},
	webpack: (config, { dev }) => {
		if (dev) {
			// Avoid flaky filesystem cache writes in .next/cache during local development.
			config.cache = false;
		}

		return config;
	},
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
