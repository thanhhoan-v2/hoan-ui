"use client"

import ThemeToggle from "@/components/common/theme-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github, Linkedin, Menu, Search, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import NavbarDesktop from "./header-desktop"
import NavbarMobile from "./header-mobile"
import { SearchBar } from "./search-bar"

export default function Navbar() {
	return (
		<nav className="relative z-50 w-full">
			<NavbarDesktop />
			<NavbarMobile />
		</nav>
	)
}
