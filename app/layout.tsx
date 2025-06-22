import AppLayout from "@/components/common/app-layout"
import Navbar from "@/components/common/header"
import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import "./globals.css"

export const metadata: Metadata = {
	title: "Hoan UI - Glassmorphism Component Library",
	description:
		"A modern, AI-powered UI component library featuring beautiful glassmorphism effects and intelligent component recommendations.",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
					<Navbar />
					<AppLayout>{children}</AppLayout>
				</ThemeProvider>
			</body>
		</html>
	)
}
