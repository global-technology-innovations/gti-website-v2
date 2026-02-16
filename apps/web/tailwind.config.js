// import defaultTheme from "tailwindcss/defaultTheme";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
const config = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: "1rem",
				sm: "1.5rem",
				lg: "2rem",
				xl: "3rem",
				"2xl": "4rem",
			},
		},
		extend: {
			colors: {
				background: "#F8F8F8",
				primary: "#1E1E1E",
				secondary: "#0766FF",
				foreground: "#ECECEC",
				success: "#42b72a",
				black: "#000000",
				white: "#FFFFFF",
			},
			fontFamily: {
				sans: ["var(--font-manrope)", "sans-serif"],
			},
			borderRadius: {
				xl: "1rem",
			},
			spacing: {
				xs: "0.25rem", // 4px
				sm: "0.5rem", // 8px
				md: "1rem", // 16px
				lg: "1.5rem", // 24px
				xl: "2rem", // 32px
				"2xl": "3rem", // 48px
				"3xl": "4rem", // 64px
			},
		},
	},
	plugins: [animate],
};

export default config;
