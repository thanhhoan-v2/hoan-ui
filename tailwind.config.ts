// tailwind.config.ts
import type { Config } from "tailwindcss"

const config: Config = {
	darkMode: "class", // Enable class-based dark mode
	theme: {
		extend: {
			colors: {
				// Background colors for light/dark mode
				background: {
					DEFAULT: "hsl(var(--background))",
					secondary: "hsl(var(--background-secondary))",
					light: "#f8f8f4",
					dark: "#121212",
					lightGray: "#f5f5f5",
					darkGray: "#1a1a1a",
					lightBlue: "#e6f0ff",
					darkBlue: "#007bff",
					lightGreen: "#e6ffe6",
					darkGreen: "#008000",
				},
				foreground: {
					DEFAULT: "hsl(var(--foreground))",
					secondary: "hsl(var(--foreground-secondary))",
					muted: "hsl(var(--foreground-muted))",
				},

				// Glassmorphism colors - adapt to light/dark mode
				glass: {
					50: "rgba(var(--glass-50), 0.05)",
					100: "rgba(var(--glass-100), 0.1)",
					200: "rgba(var(--glass-200), 0.2)",
					300: "rgba(var(--glass-300), 0.3)",
					400: "rgba(var(--glass-400), 0.4)",
					500: "rgba(var(--glass-500), 0.5)",
				},

				// Semantic colors for your design system
				primary: {
					50: "hsl(var(--primary-50))",
					100: "hsl(var(--primary-100))",
					200: "hsl(var(--primary-200))",
					300: "hsl(var(--primary-300))",
					400: "hsl(var(--primary-400))",
					500: "hsl(var(--primary-500))",
					600: "hsl(var(--primary-600))",
					700: "hsl(var(--primary-700))",
					800: "hsl(var(--primary-800))",
					900: "hsl(var(--primary-900))",
				},
				accent: {
					50: "hsl(var(--accent-50))",
					100: "hsl(var(--accent-100))",
					200: "hsl(var(--accent-200))",
					300: "hsl(var(--accent-300))",
					400: "hsl(var(--accent-400))",
					500: "hsl(var(--accent-500))",
					600: "hsl(var(--accent-600))",
					700: "hsl(var(--accent-700))",
					800: "hsl(var(--accent-800))",
					900: "hsl(var(--accent-900))",
				},
			},
		},
	},
}

export default config
