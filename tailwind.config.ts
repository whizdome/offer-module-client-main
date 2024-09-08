import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				ap: {
					red: {
						600: "#E71615",
						700: "#C51110",
					},
					grey: {
						50: "#F5F5F5",
						200: "#6B767D",
						300: "#ADAFB3",
						350: "#D1D5DB",
						400: "#808080",
						500: "#686B72",
						600: "#53555A",
						700: "#4C4E52",
						800: "#434447",
						900: "#101928",
						950: "#252627",
					},
					success: "#27A713",
					green: "#43BA00",
					invearn: {
						green: "#43BA00",
					},
				},
			},
			fontSize: {
				tiny: ["10px", {}],
			},
		},
	},
	plugins: [],
};
export default config;
