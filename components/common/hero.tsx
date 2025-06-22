"use client"

import AppLogo from "@/components/common/app-logo"
import { Button } from "@/components/ui/button"
import { useGSAP } from "@gsap/react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"
import { useEffect, useRef, useState } from "react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

function FloatingEmojis() {
	const [elements, setElements] = useState<any[]>([])

	useEffect(() => {
		const emojis = [
			"✨",
			"🎉",
			"🎈",
			"🚀",
			"⭐",
			"💖",
			"🦄",
			"🌈",
			"👋",
			"💻",
			"🔥",
			"🤯",
			"💡",
			"✅",
			"💯",
		]

		const generatedElements = Array.from({ length: 80 }, (_, i) => {
			const emoji = emojis[Math.floor(Math.random() * emojis.length)]
			const size = 20 + Math.random() * 40
			const initialX = Math.random() * 100
			const initialY = Math.random() * 100
			return {
				id: i,
				emoji,
				size,
				initialX,
				initialY,
				duration: 30 + Math.random() * 20,
				delay: Math.random() * 10,
			}
		})
		setElements(generatedElements)
	}, [])

	return (
		<div className="absolute inset-0 overflow-hidden pointer-events-none">
			{elements.map((element) => {
				const animateProps = {
					x: [`${element.initialX}vw`, `${Math.random() * 100}vw`, `${element.initialX}vw`],
					y: [`${element.initialY}vh`, `${Math.random() * 100}vh`, `${element.initialY}vh`],
					rotate: [0, Math.random() * 360, 0],
					opacity: [1, 0.5, 1],
				}

				const transitionProps = {
					duration: element.duration,
					repeat: Number.POSITIVE_INFINITY,
					ease: "linear" as const,
					delay: element.delay,
				}

				return (
					<motion.div
						key={element.id}
						className="absolute"
						style={{
							top: `${element.initialY}vh`,
							left: `${element.initialX}vw`,
							fontSize: `${element.size}px`,
							textShadow: "0 2px 5px rgba(0,0,0,0.1)",
						}}
						animate={animateProps}
						transition={transitionProps}
					>
						{element.emoji}
					</motion.div>
				)
			})}
		</div>
	)
}

export default function Hero() {
	const container = useRef<HTMLDivElement>(null)
	const logoRef = useRef<HTMLDivElement>(null)
	const buttonRef = useRef<HTMLDivElement>(null)
	const emojisRef = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: container.current,
					start: "top top",
					end: "bottom top",
					scrub: true,
					pin: true,
				},
			})

			tl.to(logoRef.current, { scale: 0.2, opacity: 0, y: "-45vh" })
				.to(buttonRef.current, { opacity: 0, y: 100 }, "<")
				.to(emojisRef.current, { opacity: 0, scale: 0.5 }, "<")
		},
		{ scope: container }
	)

	useEffect(() => {
		const lenis = new Lenis()

		function raf(time: number) {
			lenis.raf(time)
			requestAnimationFrame(raf)
		}

		requestAnimationFrame(raf)

		return () => {
			lenis.destroy()
		}
	}, [])

	return (
		<div
			ref={container}
			className="relative flex justify-center items-center bg-white dark:bg-neutral-950 w-screen h-screen overflow-hidden"
		>
			<div ref={emojisRef} className="absolute inset-0">
				<FloatingEmojis />
			</div>
			<div className="z-10 relative flex flex-col justify-center items-center gap-4 mx-auto px-4 md:px-6 text-center container">
				<div ref={logoRef}>
					<AppLogo fontSize="text-[7rem]" showBadge={false} isLink={false} />
				</div>
				<div ref={buttonRef}>
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
				</div>
			</div>
		</div>
	)
}
