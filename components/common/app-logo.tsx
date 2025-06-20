import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function AppLogo({
	showBadge = true,
	fontSize = "text-2xl",
	isLink = true,
}: {
	showBadge?: boolean
	fontSize?: string
	isLink?: boolean
}) {
	if (isLink) {
		return (
			<Link href="/" className={cn("flex items-center gap-2", fontSize)}>
				<div className="flex items-center gap-2 font-rubik-puddles font-bold">
					HoanUI {showBadge && <Badge>v1.0.0</Badge>}
				</div>
			</Link>
		)
	}

	return (
		<div className={cn("flex items-center gap-2 font-bold font-rubik-puddles", fontSize)}>
			HoanUI {showBadge && <Badge>v1.0.0</Badge>}
		</div>
	)
}
