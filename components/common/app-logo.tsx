import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function AppLogo() {
	return (
		<Link href="/" className="flex items-center gap-2">
			<div className="flex items-center gap-2 font-light text-2xl">
				HoanUI <Badge>v1.0.0</Badge>
			</div>
		</Link>
	)
}
