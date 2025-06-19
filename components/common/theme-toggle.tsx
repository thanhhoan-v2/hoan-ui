"use client"

import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()

	// Avoid hydration mismatch
	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return <div className="w-10 h-10" />
	}

	return (
		<Button
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			className="bg-glass-200/80 hover:bg-glass-300/80 dark:bg-glass-800/80 dark:hover:bg-glass-700/80 backdrop-blur-md p-2 border border-glass-400/50 dark:border-glass-600/50 rounded-lg transition-colors"
			aria-label="Toggle theme"
		>
			{theme === "dark" ? (
				<svg
					className="w-5 h-5 text-foreground"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
					/>
				</svg>
			) : (
				<svg
					className="w-5 h-5 text-foreground"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
					/>
				</svg>
			)}
		</Button>
	)
}
