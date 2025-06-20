"use client"

import AppLogo from "@/components/common/app-logo"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

function FloatingPaths({ position }: { position: number }) {
	const paths = Array.from({ length: 36 }, (_, i) => ({
		id: i,
		d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
			380 - i * 5 * position
		} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
			152 - i * 5 * position
		} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
			684 - i * 5 * position
		} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
		color: `rgba(15,23,42,${0.1 + i * 0.03})`,
		width: 0.5 + i * 0.03,
	}))

	return (
		<div className="absolute inset-0 pointer-events-none">
			<svg
				className="w-full h-full text-slate-950 dark:text-white"
				viewBox="0 0 696 316"
				fill="none"
			>
				<title>Background Paths</title>
				{paths.map((path) => (
					<motion.path
						key={path.id}
						d={path.d}
						stroke="currentColor"
						strokeWidth={path.width}
						strokeOpacity={0.1 + path.id * 0.03}
						initial={{ pathLength: 0.3, opacity: 0.6 }}
						animate={{
							pathLength: 1,
							opacity: [0.3, 0.6, 0.3],
							pathOffset: [0, 1, 0],
						}}
						transition={{
							duration: 20 + Math.random() * 10,
							repeat: Number.POSITIVE_INFINITY,
							ease: "linear",
						}}
					/>
				))}
			</svg>
		</div>
	)
}

export default function Hero({
	title = "HoanUI",
}: {
	title?: string
}) {
	const words = title.split(" ")

	return (
		<div className="relative flex justify-center items-center bg-white dark:bg-neutral-950 pt-16 w-screen h-auto min-h-screen overflow-hidden">
			<div className="absolute inset-0">
				<FloatingPaths position={1} />
				<FloatingPaths position={-1} />
			</div>

			<div className="z-10 relative flex flex-col justify-center items-center gap-4 mx-auto px-4 md:px-6 text-center container">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 2 }}
					className="mx-auto max-w-4xl"
				>
					<AppLogo
						fontSize="text-[7rem]"
						showBadge={false}
						isLink={false}
					/>
					<div className="group inline-block relative bg-gradient-to-b from-black/10 dark:from-white/10 to-white/10 dark:to-black/10 shadow-lg hover:shadow-xl backdrop-blur-lg p-px rounded-2xl overflow-hidden transition-shadow duration-300">
						<Button
							variant="ghost"
							className="bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 hover:shadow-md dark:hover:shadow-neutral-800/50 backdrop-blur-md px-8 py-6 border dark:border-white/10 border-black/10 rounded-[1.15rem] font-semibold text-black dark:text-white text-lg transition-all group-hover:-translate-y-0.5 duration-300"
						>
							<span className="opacity-90 group-hover:opacity-100 transition-opacity">
								Explore Components
							</span>
							<span className="opacity-70 group-hover:opacity-100 ml-3 transition-all group-hover:translate-x-1.5 duration-300">
								→
							</span>
						</Button>
					</div>
				</motion.div>
			</div>
		</div>
	)
}
