"use client"

import AppLogo from "@/components/common/app-logo"
import { SearchBar } from "@/components/common/search-bar"
import { Github, Linkedin } from "lucide-react"
import Link from "next/link"
import ThemeToggle from "./theme-toggle"

export default function NavbarDesktop() {
	const navbarItemClass =
		"dark:text-white text-gray-900 hover:text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 dark:hover:bg-white/10 hover:bg-black/10"

	return (
		<div className="hidden bg-background dark:bg-background lg:flex w-full h-16 items-center justify-around fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 py-2 sm:py-3">
			{/* Logo */}
			<AppLogo />
			{/* Navigation Links */}
			<div className="flex items-center space-x-8">
				<Link href="/components" className={navbarItemClass}>
					Components
				</Link>
				<Link href="/templates" className={navbarItemClass}>
					Templates
				</Link>
				<Link href="/pricing" className={navbarItemClass}>
					Pricing
				</Link>
				<Link href="/showcase" className={navbarItemClass}>
					Showcase
				</Link>
			</div>
			{/* Actions */}
			<div className="flex items-center space-x-3">
				<Link
					href="https://www.linkedin.com/in/phan-dinh-thanh-hoan/"
					className="dark:text-white text-gray-900 hover:text-gray-700 transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
					aria-label="LinkedIn"
					target="_blank"
				>
					<Linkedin className="h-4 w-4" />
				</Link>
				<Link
					href="https://github.com/thanhhoan-v2"
					className="dark:text-white text-gray-900 hover:text-gray-700 transition-colors duration-200 p-2 rounded-lg hover:bg-white/10 flex items-center space-x-1"
					aria-label="Star on GitHub"
					target="_blank"
				>
					<Github className="h-4 w-4" />
				</Link>
				<SearchBar />
				<ThemeToggle />
			</div>
		</div>
	)
}
