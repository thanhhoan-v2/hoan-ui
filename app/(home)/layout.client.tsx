"use client"

import { cva } from "class-variance-authority"
import { Moon, Sun } from "lucide-react"
import { motion, useMotionValueEvent, useScroll } from "motion/react"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import { ButtonHTMLAttributes, useState } from "react"

import { Icons } from "@/components/ui/icon"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "p-[5px] rounded-full size-6 text-muted-foreground",
  {
    variants: {
      dark: {
        true: "dark:bg-accent dark:text-accent-foreground",
        false:
          "bg-accent text-accent-foreground dark:bg-transparent dark:text-muted-foreground",
      },
    },
  }
)

const Header = () => {
  const { scrollY } = useScroll()
  const isMobile = useIsMobile()

  const [scrollMargin, setScrollMargin] = useState(0)

  const criticalValue = isMobile ? 70 : 140

  useMotionValueEvent(scrollY, "change", (latest) => {
    const newMargin = Math.min(criticalValue, latest * 0.5)
    setScrollMargin(newMargin)
  })

  return (
    <motion.header
      className="top-0 right-0 left-0 z-50 fixed flex items-center mx-auto w-full max-w-screen-xl h-16 container"
      initial={{ opacity: 0, y: -10 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      style={{
        paddingLeft: `${isMobile ? Math.max(4, scrollMargin / 4) : Math.max(16, scrollMargin)}px`,
        paddingRight: `${isMobile ? Math.max(4, scrollMargin / 4) : Math.max(16, scrollMargin)}px`,
      }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative flex justify-between items-center shadow-primary px-3 py-3 w-full"
        animate={{
          marginTop: scrollMargin > criticalValue / 2 ? "2rem" : "0",
          backgroundColor:
            scrollMargin > criticalValue / 2
              ? "hsl(var(--background))"
              : "transparent",
          borderRadius: scrollMargin > criticalValue / 2 ? "1.25rem" : "0.5rem",
          boxShadow:
            scrollMargin > criticalValue / 2
              ? "0 0 10px 0 rgba(0, 0, 0, 0.1)"
              : "none",
        }}
      >
        <Link href="/">
          <Item
            className="flex items-center gap-2 font-medium text-xl"
            icon={isMobile}
          >
            <Image src="/logo.png" alt="HoanUI" width={32} height={32} />
            <span className="max-md:hidden">HoanUI</span>
          </Item>
        </Link>
        <div className="top-1/2 right-1/2 absolute -translate-y-1/2 translate-x-1/2">
          <Link href="/docs">
            <Item>Documentation</Item>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="https://github.com/hoanui-org/hoanui">
            <Item icon>
              <Icons.Github />
            </Item>
          </Link>
          <Link href="https://discord.gg/Sy48hVDD">
            <Item icon>
              <Icons.Discord />
            </Item>
          </Link>
        </div>
      </motion.div>
    </motion.header>
  )
}

const ThemeToggle = ({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>): React.ReactElement => {
  const { setTheme, resolvedTheme } = useTheme()

  const onToggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center rounded-full border p-[2px]",
        className
      )}
      data-theme-toggle=""
      aria-label="Toggle Theme"
      onClick={onToggle}
      {...props}
    >
      <Sun className={cn(buttonVariants({ dark: false }))} />
      <Moon className={cn(buttonVariants({ dark: true }))} />
    </button>
  )
}

const Item = ({
  children,
  className,
  icon,
}: {
  children: React.ReactNode
  className?: string
  icon?: boolean
}) => {
  const [isHover, setIsHover] = useState(false)
  return (
    <motion.div
      className={cn(
        "flex items-center gap-2 rounded-lg overflow-hidden cursor-pointer relative group",
        icon ? "size-9 justify-center" : "px-2 py-1"
      )}
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
    >
      <motion.div
        className="absolute inset-0 bg-accent rounded-lg"
        animate={{ scale: isHover ? 1 : 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      />
      <span
        className={cn(
          "relative font-medium text-muted-foreground transition-colors",
          isHover && "text-foreground",
          icon && "[&>svg]:size-5 [&>svg]:fill-current",
          className
        )}
      >
        {children}
      </span>
    </motion.div>
  )
}

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, translateY: 5 }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{ duration: 0.5 }}
      className="bg-background/80 backdrop-blur-sm border-t border-border/60"
    >
      <motion.div
        className="flex justify-between items-center px-4 h-16 container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-4">
          <Link href="https://github.com/hoanui-org/hoanui">
            <Item icon>
              <Icons.Github />
            </Item>
          </Link>
          <Link href="https://discord.gg/EnzWx4Ck">
            <Item icon>
              <Icons.Discord />
            </Item>
          </Link>
        </div>

        <div className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} HoanUI. MIT License.
        </div>
      </motion.div>
    </motion.footer>
  )
}

export { Footer, Header, Item }

