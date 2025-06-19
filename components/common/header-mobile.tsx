"use client"

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
		<div className="lg:hidden w-full">
			<div className="flex h-16 items-center justify-between px-4">
				{/* Logo */}
				<h1 className="text-2xl font-bold dark:text-white">
					Hoan<span className="text-primary-500">UI</span>
				</h1>
				{/* Hamburger Menu */}
				<Button
					variant="ghost"
					size="icon"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					className="text-gray-900 hover:text-gray-900 hover:bg-white/10 border-0"
				>
					{isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
				</Button>
			</div>
			{/* Mobile Menu */}
			{isMenuOpen && (
				<div className="z-30 h-[90vh] px-6 pt-2 fixed flex max-w-full top-[var(--navbar-height)] inset-x-0 bottom-0 w-screen flex-col gap-2 overflow-y-auto backdrop-blur-xl backdrop-saturate-150 bg-background/70">
					<div className="space-y-1 flex flex-col">
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
						<div className="flex items-center backdrop-blur-md border rounded-lg px-3 py-2">
							<Search className="h-4 w-4 mr-2" />
							<Input
								type="text"
								placeholder="Search..."
								className="bg-transparent border-0 focus:ring-0 focus:outline-none flex-1"
							/>
						</div>
					</div>
					<div className="pt-4 border-t mt-4 flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<Link
								href="https://www.linkedin.com/in/phan-dinh-thanh-hoan/"
								className="transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
								aria-label="LinkedIn"
								target="_blank"
							>
								<Linkedin className="h-5 w-5" />
							</Link>
							<Link
								href="https://github.com/thanhhoan-v2"
								className="transition-colors duration-200 p-2 rounded-lg hover:bg-white/10 flex items-center space-x-1"
								aria-label="Star on GitHub"
								target="_blank"
							>
								<Github className="h-5 w-5" />
							</Link>
						</div>
						<ThemeToggle />
					</div>
				</div>
			)}
		</div>
	)
}
