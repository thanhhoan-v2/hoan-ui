"use client"

import {
	BarChart,
	Bell,
	BookOpen,
	Calculator,
	Calendar,
	Code,
	CreditCard,
	Database,
	FileCode,
	FileText,
	GalleryVertical,
	Globe,
	HelpCircle,
	ImageIcon,
	LayoutDashboard,
	LayoutGrid,
	List,
	Loader2,
	Lock,
	Mail,
	MessageSquare,
	PieChart,
	Search,
	SearchIcon,
	Server,
	Share2,
	ShoppingCart,
	Smile,
	TrendingUp,
	User,
	Users,
	X,
	Zap,
} from "lucide-react"
import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command"
import { ScrollArea } from "@/components/ui/scroll-area"

// Define our item types
type Category =
	| "all"
	| "pages"
	| "tools"
	| "settings"
	| "messages"
	| "documents"
	| "analytics"
	| "users"
	| "products"
	| "help"

interface CommandItemType {
	id: string
	name: string
	description?: string
	icon: React.ReactNode
	category: Category
	shortcut?: string
	tags?: string[]
	action?: () => void
	date?: string
	author?: {
		name: string
		avatar?: string
		email?: string
	}
	status?: "active" | "archived" | "draft" | "published" | "pending"
	priority?: "low" | "medium" | "high"
	views?: number
	size?: string
	location?: string
	url?: string
	metadata?: Record<string, string>
}

export function SearchBar() {
	const [open, setOpen] = React.useState(false)
	const [inputValue, setInputValue] = React.useState("")
	const [selectedCategory, setSelectedCategory] = React.useState<Category>("all")
	const [loading, setLoading] = React.useState(false)
	const [recentSearches, setRecentSearches] = React.useState<string[]>([])
	const [viewMode, setViewMode] = React.useState<"list" | "grid" | "detailed">("list")
	const [sortBy, setSortBy] = React.useState<"name" | "date" | "priority" | "views">("name")
	const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc")

	// Sample data for our command items - expanded with more content
	const commandItems: CommandItemType[] = [
		// Pages Category
		{
			id: "1",
			name: "Dashboard",
			description: "View your main dashboard with key metrics and insights",
			icon: <LayoutDashboard className="w-4 h-4" />,
			category: "pages",
			tags: ["home", "metrics", "overview"],
			shortcut: "⌘D",
			date: "2023-05-15",
			views: 1250,
			status: "published",
			url: "/dashboard",
			metadata: {
				lastUpdated: "2 hours ago",
				creator: "Admin Team",
			},
		},
		{
			id: "2",
			name: "Calendar",
			description: "View your calendar events and schedule meetings",
			icon: <Calendar className="w-4 h-4" />,
			category: "pages",
			tags: ["schedule", "events", "meetings"],
			shortcut: "⌘C",
			date: "2023-05-10",
			views: 890,
			status: "published",
			url: "/calendar",
			metadata: {
				lastUpdated: "1 day ago",
				creator: "Product Team",
			},
		},
		{
			id: "3",
			name: "Analytics",
			description: "View detailed analytics and performance metrics",
			icon: <BarChart className="w-4 h-4" />,
			category: "analytics",
			tags: ["stats", "data", "metrics", "performance"],
			shortcut: "⌘A",
			date: "2023-05-08",
			views: 750,
			status: "published",
			url: "/analytics",
			metadata: {
				lastUpdated: "3 days ago",
				creator: "Data Team",
			},
		},
		{
			id: "4",
			name: "User Management",
			description: "Manage users, permissions and roles",
			icon: <Users className="w-4 h-4" />,
			category: "users",
			tags: ["users", "permissions", "roles", "access"],
			shortcut: "⌘U",
			date: "2023-05-05",
			views: 620,
			status: "published",
			url: "/users",
			metadata: {
				lastUpdated: "1 week ago",
				creator: "Admin Team",
			},
		},
		{
			id: "5",
			name: "Products",
			description: "Browse and manage your product catalog",
			icon: <ShoppingCart className="w-4 h-4" />,
			category: "products",
			tags: ["inventory", "catalog", "items", "shop"],
			shortcut: "⌘P",
			date: "2023-05-03",
			views: 980,
			status: "published",
			url: "/products",
			metadata: {
				lastUpdated: "2 days ago",
				creator: "Product Team",
			},
		},
		{
			id: "6",
			name: "Help Center",
			description: "Access documentation and support resources",
			icon: <HelpCircle className="w-4 h-4" />,
			category: "help",
			tags: ["support", "docs", "help", "faq"],
			shortcut: "⌘H",
			date: "2023-04-28",
			views: 450,
			status: "published",
			url: "/help",
			metadata: {
				lastUpdated: "2 weeks ago",
				creator: "Support Team",
			},
		},

		// Tools Category
		{
			id: "7",
			name: "Search Files",
			description: "Find documents and files across your workspace",
			icon: <FileText className="w-4 h-4" />,
			category: "tools",
			tags: ["documents", "files", "search"],
			shortcut: "⌘F",
			date: "2023-05-12",
			views: 780,
			status: "active",
			metadata: {
				fileCount: "1,245 files",
				storage: "2.3 GB used",
			},
		},
		{
			id: "8",
			name: "Calculator",
			description: "Perform quick calculations and conversions",
			icon: <Calculator className="w-4 h-4" />,
			category: "tools",
			tags: ["math", "calculate", "numbers", "conversion"],
			shortcut: "⌘K",
			date: "2023-05-01",
			views: 320,
			status: "active",
			metadata: {
				lastUsed: "Yesterday",
				mode: "Standard",
			},
		},
		{
			id: "9",
			name: "Code Editor",
			description: "Edit code snippets and scripts",
			icon: <Code className="w-4 h-4" />,
			category: "tools",
			tags: ["code", "development", "programming", "scripts"],
			shortcut: "⌘E",
			date: "2023-04-25",
			views: 560,
			status: "active",
			metadata: {
				language: "JavaScript, Python, Ruby",
				theme: "Dark",
			},
		},
		{
			id: "10",
			name: "Database Explorer",
			description: "Browse and query your databases",
			icon: <Database className="w-4 h-4" />,
			category: "tools",
			tags: ["database", "sql", "query", "data"],
			shortcut: "⌘B",
			date: "2023-04-20",
			views: 410,
			status: "active",
			metadata: {
				connections: "5 active",
				type: "SQL, NoSQL",
			},
		},
		{
			id: "11",
			name: "API Tester",
			description: "Test API endpoints and view responses",
			icon: <Globe className="w-4 h-4" />,
			category: "tools",
			tags: ["api", "testing", "endpoints", "http"],
			shortcut: "⌘T",
			date: "2023-04-18",
			views: 380,
			status: "active",
			metadata: {
				methods: "GET, POST, PUT, DELETE",
				saved: "12 requests",
			},
		},

		// Settings Category
		{
			id: "12",
			name: "Profile Settings",
			description: "Manage your account profile and preferences",
			icon: <User className="w-4 h-4" />,
			category: "settings",
			tags: ["account", "user", "profile", "personal"],
			shortcut: "⌘P",
			date: "2023-05-14",
			status: "active",
			metadata: {
				lastUpdated: "Today",
				section: "Personal",
			},
		},
		{
			id: "13",
			name: "Billing",
			description: "Manage your subscription and payment methods",
			icon: <CreditCard className="w-4 h-4" />,
			category: "settings",
			tags: ["payment", "subscription", "invoice", "billing"],
			shortcut: "⌘B",
			date: "2023-05-11",
			status: "active",
			metadata: {
				plan: "Professional",
				nextBilling: "June 1, 2023",
			},
		},
		{
			id: "14",
			name: "Security",
			description: "Configure security settings and permissions",
			icon: <Lock className="w-4 h-4" />,
			category: "settings",
			tags: ["security", "password", "2fa", "authentication"],
			shortcut: "⌘S",
			date: "2023-05-09",
			status: "active",
			priority: "high",
			metadata: {
				lastScan: "2 days ago",
				status: "Secure",
			},
		},
		{
			id: "15",
			name: "Notifications",
			description: "Configure notification preferences and alerts",
			icon: <Bell className="w-4 h-4" />,
			category: "settings",
			tags: ["alerts", "notifications", "email", "push"],
			shortcut: "⌘N",
			date: "2023-05-07",
			status: "active",
			metadata: {
				channels: "Email, Push, In-app",
				unread: "5 notifications",
			},
		},
		{
			id: "16",
			name: "Integrations",
			description: "Manage third-party integrations and connections",
			icon: <Share2 className="w-4 h-4" />,
			category: "settings",
			tags: ["connect", "api", "third-party", "services"],
			shortcut: "⌘I",
			date: "2023-05-04",
			status: "active",
			metadata: {
				active: "8 integrations",
				available: "25+ services",
			},
		},

		// Messages Category
		{
			id: "17",
			name: "Inbox",
			description: "View your messages and notifications",
			icon: <MessageSquare className="w-4 h-4" />,
			category: "messages",
			tags: ["chat", "notifications", "inbox", "messages"],
			shortcut: "⌘M",
			date: "2023-05-15",
			status: "active",
			priority: "medium",
			metadata: {
				unread: "12 messages",
				lastMessage: "10 minutes ago",
			},
		},
		{
			id: "18",
			name: "Email",
			description: "Check your email inbox and send messages",
			icon: <Mail className="w-4 h-4" />,
			category: "messages",
			tags: ["mail", "inbox", "communication", "email"],
			shortcut: "⌘E",
			date: "2023-05-15",
			status: "active",
			priority: "high",
			metadata: {
				unread: "24 emails",
				lastEmail: "5 minutes ago",
			},
		},
		{
			id: "19",
			name: "Team Chat",
			description: "Collaborate with your team in real-time",
			icon: <Users className="w-4 h-4" />,
			category: "messages",
			tags: ["team", "chat", "collaboration", "communication"],
			shortcut: "⌘T",
			date: "2023-05-15",
			status: "active",
			priority: "medium",
			metadata: {
				activeChannels: "8 channels",
				members: "24 online",
			},
		},
		{
			id: "20",
			name: "Announcements",
			description: "View important company announcements",
			icon: <Bell className="w-4 h-4" />,
			category: "messages",
			tags: ["announcements", "company", "news", "updates"],
			shortcut: "⌘A",
			date: "2023-05-13",
			status: "active",
			priority: "low",
			metadata: {
				latest: "Company meeting - May 20",
				total: "5 unread",
			},
		},

		// Documents Category
		{
			id: "21",
			name: "Documentation",
			description: "Access product documentation and guides",
			icon: <BookOpen className="w-4 h-4" />,
			category: "documents",
			tags: ["docs", "guides", "help", "manuals"],
			shortcut: "⌘D",
			date: "2023-05-10",
			status: "published",
			views: 890,
			metadata: {
				sections: "15 sections",
				lastUpdated: "3 days ago",
			},
		},
		{
			id: "22",
			name: "Reports",
			description: "View and generate business reports",
			icon: <FileText className="w-4 h-4" />,
			category: "documents",
			tags: ["reports", "business", "analytics", "data"],
			shortcut: "⌘R",
			date: "2023-05-08",
			status: "published",
			views: 650,
			metadata: {
				types: "Financial, Performance, Sales",
				format: "PDF, Excel, CSV",
			},
		},
		{
			id: "23",
			name: "Templates",
			description: "Access document and project templates",
			icon: <FileCode className="w-4 h-4" />,
			category: "documents",
			tags: ["templates", "documents", "projects", "forms"],
			shortcut: "⌘T",
			date: "2023-05-05",
			status: "published",
			views: 720,
			metadata: {
				count: "45 templates",
				categories: "Business, Marketing, Development",
			},
		},
		{
			id: "24",
			name: "Contracts",
			description: "Manage legal contracts and agreements",
			icon: <FileText className="w-4 h-4" />,
			category: "documents",
			tags: ["legal", "contracts", "agreements", "documents"],
			shortcut: "⌘L",
			date: "2023-05-03",
			status: "published",
			views: 320,
			priority: "high",
			metadata: {
				status: "5 pending review",
				expiring: "2 contracts expiring soon",
			},
		},
		{
			id: "25",
			name: "Presentations",
			description: "Access and create presentation slides",
			icon: <ImageIcon className="w-4 h-4" />,
			category: "documents",
			tags: ["slides", "presentations", "decks", "meetings"],
			shortcut: "⌘S",
			date: "2023-04-28",
			status: "published",
			views: 480,
			metadata: {
				recent: "Q2 Strategy Presentation",
				count: "24 presentations",
			},
		},

		// Analytics Category
		{
			id: "26",
			name: "Performance Metrics",
			description: "View detailed performance analytics",
			icon: <TrendingUp className="w-4 h-4" />,
			category: "analytics",
			tags: ["performance", "metrics", "kpi", "analytics"],
			shortcut: "⌘M",
			date: "2023-05-14",
			status: "active",
			views: 890,
			metadata: {
				period: "Last 30 days",
				growth: "+12% MoM",
			},
		},
		{
			id: "27",
			name: "Sales Dashboard",
			description: "Track sales performance and revenue",
			icon: <PieChart className="w-4 h-4" />,
			category: "analytics",
			tags: ["sales", "revenue", "performance", "dashboard"],
			shortcut: "⌘S",
			date: "2023-05-12",
			status: "active",
			views: 760,
			priority: "high",
			metadata: {
				revenue: "$1.2M this month",
				target: "92% of monthly goal",
			},
		},
		{
			id: "28",
			name: "User Analytics",
			description: "Analyze user behavior and engagement",
			icon: <Users className="w-4 h-4" />,
			category: "analytics",
			tags: ["users", "behavior", "engagement", "analytics"],
			shortcut: "⌘U",
			date: "2023-05-10",
			status: "active",
			views: 680,
			metadata: {
				activeUsers: "12,450 this week",
				retention: "78% 30-day retention",
			},
		},
		{
			id: "29",
			name: "Marketing Campaigns",
			description: "Track marketing campaign performance",
			icon: <Zap className="w-4 h-4" />,
			category: "analytics",
			tags: ["marketing", "campaigns", "ads", "performance"],
			shortcut: "⌘C",
			date: "2023-05-08",
			status: "active",
			views: 540,
			metadata: {
				active: "5 active campaigns",
				conversion: "3.2% average conversion",
			},
		},
		{
			id: "30",
			name: "Server Monitoring",
			description: "Monitor server health and performance",
			icon: <Server className="w-4 h-4" />,
			category: "analytics",
			tags: ["server", "monitoring", "performance", "health"],
			shortcut: "⌘H",
			date: "2023-05-05",
			status: "active",
			views: 320,
			priority: "medium",
			metadata: {
				uptime: "99.98% this month",
				alerts: "No critical issues",
			},
		},
	]

	// Filter items based on search input and selected category
	const filteredItems = React.useMemo(() => {
		let items = [...commandItems]

		// Filter by category
		if (selectedCategory !== "all") {
			items = items.filter((item) => item.category === selectedCategory)
		}

		// Filter by search term
		if (inputValue) {
			const searchTerm = inputValue.toLowerCase()
			items = items.filter(
				(item) =>
					item.name.toLowerCase().includes(searchTerm) ||
					item.description?.toLowerCase().includes(searchTerm) ||
					item.tags?.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
					(item.metadata &&
						Object.values(item.metadata).some((value) => value.toLowerCase().includes(searchTerm)))
			)
		}

		// Sort items
		items.sort((a, b) => {
			if (sortBy === "name") {
				return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
			} else if (sortBy === "date" && a.date && b.date) {
				return sortOrder === "asc"
					? new Date(a.date).getTime() - new Date(b.date).getTime()
					: new Date(b.date).getTime() - new Date(a.date).getTime()
			} else if (sortBy === "priority") {
				const priorityValue = { high: 3, medium: 2, low: 1, undefined: 0 }
				return sortOrder === "asc"
					? (priorityValue[a.priority || "undefined"] || 0) -
							(priorityValue[b.priority || "undefined"] || 0)
					: (priorityValue[b.priority || "undefined"] || 0) -
							(priorityValue[a.priority || "undefined"] || 0)
			} else if (sortBy === "views" && a.views !== undefined && b.views !== undefined) {
				return sortOrder === "asc" ? a.views - b.views : b.views - a.views
			}
			return 0
		})

		return items
	}, [inputValue, selectedCategory, sortBy, sortOrder])

	// Handle keyboard shortcut to open the command dialog
	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setOpen((open) => !open)
			}
		}

		document.addEventListener("keydown", down)
		return () => document.removeEventListener("keydown", down)
	}, [])

	// Simulate loading state when changing categories
	const handleCategoryChange = (category: Category) => {
		setLoading(true)
		setSelectedCategory(category)

		// Simulate API call or data processing
		setTimeout(() => {
			setLoading(false)
		}, 300)
	}

	// Handle command selection
	const handleSelect = (item: CommandItemType) => {
		// Add to recent searches if it's not already there
		if (!recentSearches.includes(item.name)) {
			setRecentSearches((prev) => [item.name, ...prev].slice(0, 5))
		}

		// Execute the action
		if (item.action) {
			item.action()
		}

		// Close the dialog
		setOpen(false)
	}

	// Get category count
	const getCategoryCount = (category: Category) => {
		return category === "all"
			? commandItems.length
			: commandItems.filter((item) => item.category === category).length
	}

	// Render priority badge
	const renderPriorityBadge = (priority?: "low" | "medium" | "high") => {
		if (!priority) return null

		const variants = {
			low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
			medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
			high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
		}

		return (
			<span className={`text-xs px-2 py-1 rounded-full ${variants[priority]}`}>{priority}</span>
		)
	}

	// Render status badge
	const renderStatusBadge = (status?: string) => {
		if (!status) return null

		const variants: Record<string, string> = {
			active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
			archived: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
			draft: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
			published: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
			pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
		}

		return (
			<span className={`text-xs px-2 py-1 rounded-full ${variants[status] || ""}`}>{status}</span>
		)
	}

	return (
		<div className="flex flex-col justify-center items-center">
			<Button
				variant="outline"
				className="relative flex justify-start items-center sm:pr-12 rounded-full w-full h-9 text-muted-foreground text-sm"
				onClick={() => setOpen(true)}
			>
				<SearchIcon />
				<span>Search</span>
				<kbd className="hidden top-1.8 right-1.5 absolute sm:flex items-center gap-1 bg-muted opacity-100 px-1.5 border rounded-full h-5 font-medium pointer-events-none select-none">
					<span className="text-sm">⌘</span>K
				</kbd>
			</Button>

			<CommandDialog open={open} onOpenChange={setOpen}>
				<div className="">
					<div className="">
						<CommandInput
							placeholder="Type a command or search..."
							value={inputValue}
							onValueChange={setInputValue}
							className="flex bg-transparent disabled:opacity-50 outline-none w-full h-11 placeholder:text-muted-foreground text-sm disabled:cursor-not-allowed"
						/>
						<div className="top-3 right-2 absolute flex items-center gap-2">
							{inputValue && (
								<Button
									variant="ghost"
									size="icon"
									className="w-6 h-6"
									onClick={() => setInputValue("")}
								>
									<X className="w-4 h-4" />
								</Button>
							)}
						</div>
					</div>

					<div className="flex sm:flex-row sm:justify-between sm:items-center px-3 py-2 border-b">
						<div className="flex flex-wrap items-center gap-2 py-1">
							<Badge
								variant={selectedCategory === "all" ? "default" : "outline"}
								className="cursor-pointer"
								onClick={() => handleCategoryChange("all")}
							>
								All ({getCategoryCount("all")})
							</Badge>
							<Badge
								variant={selectedCategory === "pages" ? "default" : "outline"}
								className="cursor-pointer"
								onClick={() => handleCategoryChange("pages")}
							>
								Pages ({getCategoryCount("pages")})
							</Badge>
							<Badge
								variant={selectedCategory === "tools" ? "default" : "outline"}
								className="cursor-pointer"
								onClick={() => handleCategoryChange("tools")}
							>
								Tools ({getCategoryCount("tools")})
							</Badge>
							<Badge
								variant={selectedCategory === "settings" ? "default" : "outline"}
								className="cursor-pointer"
								onClick={() => handleCategoryChange("settings")}
							>
								Settings ({getCategoryCount("settings")})
							</Badge>
							<Badge
								variant={selectedCategory === "messages" ? "default" : "outline"}
								className="cursor-pointer"
								onClick={() => handleCategoryChange("messages")}
							>
								Messages ({getCategoryCount("messages")})
							</Badge>
							<Badge
								variant={selectedCategory === "documents" ? "default" : "outline"}
								className="cursor-pointer"
								onClick={() => handleCategoryChange("documents")}
							>
								Documents ({getCategoryCount("documents")})
							</Badge>
							<Badge
								variant={selectedCategory === "analytics" ? "default" : "outline"}
								className="cursor-pointer"
								onClick={() => handleCategoryChange("analytics")}
							>
								Analytics ({getCategoryCount("analytics")})
							</Badge>
						</div>
					</div>
					<div className="flex items-center gap-1 px-3 py-1 border-b">
						<div className="flex items-center gap-1 p-1 border rounded-xl">
							<Button
								variant={viewMode === "list" ? "secondary" : "ghost"}
								size="sm"
								className="p-0 w-7 h-7"
								onClick={() => setViewMode("list")}
							>
								<List className="w-4 h-4" />
								<span className="sr-only">List view</span>
							</Button>
							<Button
								variant={viewMode === "grid" ? "secondary" : "ghost"}
								size="sm"
								className="p-0 w-7 h-7"
								onClick={() => setViewMode("grid")}
							>
								<LayoutGrid className="w-4 h-4" />
								<span className="sr-only">Grid view</span>
							</Button>
							<Button
								variant={viewMode === "detailed" ? "secondary" : "ghost"}
								size="sm"
								className="p-0 w-7 h-7"
								onClick={() => setViewMode("detailed")}
							>
								<GalleryVertical className="w-4 h-4" />
								<span className="sr-only">Detailed view</span>
							</Button>
						</div>

						<select
							className="bg-background px-2 border rounded-xl h-[38px] text-xs"
							value={`${sortBy}-${sortOrder}`}
							onChange={(e) => {
								const [newSortBy, newSortOrder] = e.target.value.split("-") as [
									"name" | "date" | "priority" | "views",
									"asc" | "desc",
								]
								setSortBy(newSortBy)
								setSortOrder(newSortOrder)
							}}
						>
							<option value="name-asc">Name (A-Z)</option>
							<option value="name-desc">Name (Z-A)</option>
							<option value="date-desc">Date (Newest)</option>
							<option value="date-asc">Date (Oldest)</option>
							<option value="priority-desc">Priority (High-Low)</option>
							<option value="priority-asc">Priority (Low-High)</option>
							<option value="views-desc">Views (High-Low)</option>
							<option value="views-asc">Views (Low-High)</option>
						</select>
					</div>

					<CommandList>
						<ScrollArea className="h-[400px]">
							{loading ? (
								<div className="flex justify-center items-center py-6">
									<Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
								</div>
							) : (
								<div>
									{recentSearches.length > 0 && (
										<>
											<CommandGroup heading="Recent Searches">
												{recentSearches.map((search) => (
													<CommandItem
														key={search}
														onSelect={() => {
															setInputValue(search)
														}}
													>
														<Search className="mr-2 w-4 h-4" />
														<span>{search}</span>
													</CommandItem>
												))}
											</CommandGroup>
											<CommandSeparator />
										</>
									)}

									{filteredItems.length === 0 && inputValue ? (
										<CommandEmpty>
											<div className="flex flex-col justify-center items-center py-6">
												<Smile className="mb-2 w-10 h-10 text-muted-foreground" />
												<p className="text-muted-foreground">No results found for "{inputValue}"</p>
											</div>
										</CommandEmpty>
									) : (
										<>
											{viewMode === "list" && (
												<div>
													{/* Group items by category */}
													{(
														[
															"pages",
															"tools",
															"settings",
															"messages",
															"documents",
															"analytics",
														] as const
													).map((category) => {
														const categoryItems = filteredItems.filter(
															(item) => item.category === category
														)
														if (categoryItems.length === 0) return null

														return (
															<CommandGroup
																key={category}
																heading={category.charAt(0).toUpperCase() + category.slice(1)}
															>
																{categoryItems.map((item) => (
																	<CommandItem
																		key={item.id}
																		onSelect={() => handleSelect(item)}
																		className="flex justify-between items-center"
																	>
																		<div className="flex items-center">
																			{item.icon}
																			<div className="ml-2">
																				<p>{item.name}</p>
																				{item.description && (
																					<p className="text-muted-foreground text-xs">
																						{item.description}
																					</p>
																				)}
																			</div>
																		</div>
																		<div className="flex items-center gap-2">
																			{item.priority && renderPriorityBadge(item.priority)}
																			{item.shortcut && (
																				<kbd className="flex items-center gap-1 bg-muted opacity-100 ml-auto px-1.5 border rounded h-5 font-mono font-medium text-[10px] select-none">
																					{item.shortcut}
																				</kbd>
																			)}
																		</div>
																	</CommandItem>
																))}
															</CommandGroup>
														)
													})}
												</div>
											)}

											{viewMode === "grid" && (
												<div className="gap-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 p-2">
													{filteredItems.map((item) => (
														<div
															key={item.id}
															className="flex flex-col hover:bg-accent p-3 border rounded-xl cursor-pointer"
															onClick={() => handleSelect(item)}
														>
															<div className="flex justify-between items-center">
																<div className="flex items-center">
																	{item.icon}
																	<span className="ml-2 font-medium">{item.name}</span>
																</div>
																{item.priority && renderPriorityBadge(item.priority)}
															</div>
															{item.description && (
																<p className="mt-1 text-muted-foreground text-xs line-clamp-2">
																	{item.description}
																</p>
															)}
															<div className="flex justify-between items-center mt-2 text-muted-foreground text-xs">
																<span>{item.category}</span>
																{item.views !== undefined && (
																	<span>{item.views.toLocaleString()} views</span>
																)}
															</div>
														</div>
													))}
												</div>
											)}

											{viewMode === "detailed" && (
												<div className="space-y-2 p-2">
													{filteredItems.map((item) => (
														<Card
															key={item.id}
															className="hover:bg-accent/50 cursor-pointer"
															onClick={() => handleSelect(item)}
														>
															<CardHeader className="p-3">
																<div className="flex justify-between items-center">
																	<div className="flex items-center gap-2">
																		{item.icon}
																		<CardTitle className="text-base">{item.name}</CardTitle>
																	</div>
																	<div className="flex items-center gap-2">
																		{item.status && renderStatusBadge(item.status)}
																		{item.priority && renderPriorityBadge(item.priority)}
																	</div>
																</div>
																{item.description && (
																	<CardDescription>{item.description}</CardDescription>
																)}
															</CardHeader>
															<CardContent className="px-3 pt-0 pb-3">
																<div className="gap-2 grid grid-cols-2 text-sm">
																	{item.category && (
																		<div>
																			<span className="text-muted-foreground">Category:</span>{" "}
																			{item.category}
																		</div>
																	)}
																	{item.date && (
																		<div>
																			<span className="text-muted-foreground">Date:</span>{" "}
																			{item.date}
																		</div>
																	)}
																	{item.views !== undefined && (
																		<div>
																			<span className="text-muted-foreground">Views:</span>{" "}
																			{item.views.toLocaleString()}
																		</div>
																	)}
																	{item.tags && item.tags.length > 0 && (
																		<div className="col-span-2">
																			<span className="text-muted-foreground">Tags:</span>{" "}
																			{item.tags.map((tag, i) => (
																				<span key={tag}>
																					{tag}
																					{i < item.tags!.length - 1 ? ", " : ""}
																				</span>
																			))}
																		</div>
																	)}
																	{item.metadata && Object.keys(item.metadata).length > 0 && (
																		<div className="gap-1 grid grid-cols-2 col-span-2 bg-muted mt-2 p-2 rounded-xl text-xs">
																			{Object.entries(item.metadata).map(([key, value]) => (
																				<div key={key}>
																					<span className="font-medium">{key}:</span> {value}
																				</div>
																			))}
																		</div>
																	)}
																</div>
															</CardContent>
															{item.shortcut && (
																<CardFooter className="flex justify-between p-3 pt-0 text-muted-foreground text-xs">
																	<span>Press {item.shortcut} to open</span>
																</CardFooter>
															)}
														</Card>
													))}
												</div>
											)}
										</>
									)}
								</div>
							)}
						</ScrollArea>
					</CommandList>
				</div>
			</CommandDialog>
		</div>
	)
}
