"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

function FloatingPaths() {
	const paths = Array.from({ length: 36 }, (_, i) => ({
		id: i,
		d: `M-${200 + i * 15} ${-200 + i * 25}C-${200 + i * 15} ${-200 + i * 25} ${300 + i * 25} ${200 + i * 30} ${800 + i * 30} ${600 + i * 35}C${1200 + i * 35} ${800 + i * 40} ${1600 + i * 40} ${1000 + i * 45} ${2000 + i * 45} ${1200 + i * 50}`,
		color: `rgba(15,23,42,${0.1 + i * 0.03})`,
		width: 0.5 + i * 0.03,
	}))

	return (
		<div className="absolute inset-0 pointer-events-none">
			<svg
				className="w-full h-full text-slate-950 dark:text-white"
				viewBox="0 0 1920 1400"
				fill="none"
				preserveAspectRatio="xMidYMid slice"
			>
				<title>Background Paths</title>
				{paths.map((path) => (
					<motion.path
						key={path.id}
						d={path.d}
						stroke="currentColor"
						strokeWidth={path.width}
						strokeOpacity={0.3 + path.id * 0.05}
						initial={{ pathLength: 0.3, opacity: 0.8 }}
						animate={{
							pathLength: 1,
							opacity: [0.5, 0.9, 0.5],
							pathOffset: [0, 1, 0],
						}}
						transition={{
							duration: 8 + Math.random() * 5,
							repeat: Number.POSITIVE_INFINITY,
							ease: "linear",
						}}
					/>
				))}
			</svg>
		</div>
	)
}

export default function BackgroundPaths({
	title = "Background Paths",
}: {
	title?: string
}) {
	const words = title.split(" ")

	return (
		<div className="relative flex justify-center items-center bg-white dark:bg-neutral-950 w-screen h-screen overflow-hidden">
			<div className="absolute inset-0">
				<FloatingPaths />
			</div>

			<div className="z-10 relative mx-auto px-4 md:px-6 text-center container">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 2 }}
					className="mx-auto max-w-4xl"
				>
					<h1 className="mb-8 font-bold text-5xl sm:text-7xl md:text-8xl tracking-tighter">
						{words.map((word, wordIndex) => (
							<span key={wordIndex} className="inline-block mr-4 last:mr-0">
								{word.split("").map((letter, letterIndex) => (
									<motion.span
										key={`${wordIndex}-${letterIndex}`}
										initial={{ y: 100, opacity: 0 }}
										animate={{ y: 0, opacity: 1 }}
										transition={{
											delay: wordIndex * 0.1 + letterIndex * 0.03,
											type: "spring",
											stiffness: 150,
											damping: 25,
										}}
										className="inline-block bg-clip-text bg-gradient-to-r from-neutral-900 dark:from-white to-neutral-700/80 dark:to-white/80 text-transparent"
									>
										{letter}
									</motion.span>
								))}
							</span>
						))}
					</h1>

					<div className="group inline-block relative bg-gradient-to-b from-black/10 dark:from-white/10 to-white/10 dark:to-black/10 shadow-lg hover:shadow-xl backdrop-blur-lg p-px rounded-2xl overflow-hidden transition-shadow duration-300">
						<Button
							variant="ghost"
							className="bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 hover:shadow-md dark:hover:shadow-neutral-800/50 backdrop-blur-md px-8 py-6 border dark:border-white/10 border-black/10 rounded-[1.15rem] font-semibold text-black dark:text-white text-lg transition-all group-hover:-translate-y-0.5 duration-300"
						>
							<span className="opacity-90 group-hover:opacity-100 transition-opacity">
								Discover Excellence
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
