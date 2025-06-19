"use client"

import AppLogo from "@/components/common/app-logo"
import ThemeToggle from "@/components/common/theme-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github, Linkedin, Menu, Search, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function NavbarMobile() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const navbarItemClass =
		"dark:text-white text-gray-900 hover:text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 dark:hover:bg-white/10 hover:bg-black/10"

	useEffect(() => {
		if (isMenuOpen) {
			document.body.classList.add("body-scroll-lock")
		} else {
			document.body.classList.remove("body-scroll-lock")
		}
		return () => {
			document.body.classList.remove("body-scroll-lock")
		}
	}, [isMenuOpen])

	return (
		<div className="lg:hidden top-0 right-0 left-0 z-50 fixed justify-around items-center bg-background dark:bg-background px-4 sm:px-6 py-2 sm:py-3 w-full h-16 transition-all duration-300">
			<div className="flex justify-between items-center px-4 h-16">
				<AppLogo />
				<Button
					variant="ghost"
					size="icon"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					className="hover:bg-white/10 border-0 text-gray-900 hover:text-gray-900"
				>
					{isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
				</Button>
			</div>
			{/* Mobile Menu */}
			{isMenuOpen && (
				<div className="top-[var(--navbar-height)] bottom-0 z-30 fixed inset-x-0 flex flex-col gap-2 bg-background/70 backdrop-blur-xl backdrop-saturate-150 px-6 pt-2 w-screen max-w-full h-[90vh] overflow-y-auto">
					<div className="flex flex-col space-y-1">
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
						<Link href="/playground" className={navbarItemClass}>
							Playground
						</Link>
					</div>
					{/* Mobile Search */}
					<div className="mt-4">
						<div className="flex items-center backdrop-blur-md px-3 py-2 border rounded-lg">
							<Search className="mr-2 w-4 h-4" />
							<Input
								type="text"
								placeholder="Search..."
								className="flex-1 bg-transparent border-0 focus:outline-none focus:ring-0"
							/>
						</div>
					</div>
					<div className="flex justify-between items-center mt-4 pt-4 border-t">
						<div className="flex items-center space-x-4">
							<Link
								href="https://www.linkedin.com/in/phan-dinh-thanh-hoan/"
								className="hover:bg-white/10 p-2 rounded-lg transition-colors duration-200"
								aria-label="LinkedIn"
								target="_blank"
							>
								<Linkedin className="w-5 h-5" />
							</Link>
							<Link
								href="https://github.com/thanhhoan-v2"
								className="flex items-center space-x-1 hover:bg-white/10 p-2 rounded-lg transition-colors duration-200"
								aria-label="Star on GitHub"
								target="_blank"
							>
								<Github className="w-5 h-5" />
							</Link>
						</div>
						<ThemeToggle />
					</div>
				</div>
			)}
		</div>
	)
}
