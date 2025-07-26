import "./global.css"

import { RootProvider } from "fumadocs-ui/provider"
import { Metadata } from "next"
import type { ReactNode } from "react"

import { Toaster } from "@/components/ui/sonner"
import { fontMono, fontSans } from "@/lib/fonts"
import { cn } from "@/registry/default/lib/utils"

export const metadata: Metadata = {
  title: {
    default: "HoanUI - Modern React Component Library",
    template: "%s | HoanUI",
  },
  description:
    "HoanUI is a collection of re-usable components that you can copy and paste into your web apps.",
  keywords: [
    "Next.js",
    "React",
    "Component Library",
    "UI Library",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
    "TypeScript",
    "Frontend Development",
    "Web Development",
    "UI Components",
    "Design System",
  ],
  authors: [
    {
      name: "liorael",
      url: "https://github.com/liorael",
    },
  ],
  creator: "liorael",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.hoanui.org",
    title: "HoanUI - Modern React Component Library",
    description:
      "HoanUI is a collection of reusable components that you can copy and paste into your web apps.",
    siteName: "HoanUI",
  },
  twitter: {
    card: "summary_large_image",
    title: "HoanUI - Modern React Component Library",
    description:
      "HoanUI is a collection of reusable components that you can copy and paste into your web apps.",
    creator: "@liorael",
  },
  metadataBase: new URL("https://www.hoanui.org"),
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(fontSans.variable, fontMono.variable)}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-svh font-sans antialiased">
        <RootProvider>{children}</RootProvider>
        <Toaster />
      </body>
    </html>
  )
}
