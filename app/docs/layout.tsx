import { Book, Pen } from "lucide-react"
import type { ReactNode } from "react"

import { DocsLayout } from "@/components/notebook"
import { SidebarProvider } from "@/components/ui/sidebar"
import { source } from "@/lib/source"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <DocsLayout
        sidebar={{
          tabs: [
            {
              icon: <TabIcon icon={<Book />} />,
              title: "HoanUI",
              description: "Learn how to use HoanUI",
              url: "/docs",
            },
            {
              icon: <TabIcon icon={<Pen />} />,
              title: "Utilities",
              description: "Some utilities for developers",
              url: "https://utilities.hoanui.org",
            },
          ],
        }}
        tree={source.pageTree}
      >
        {children}
      </DocsLayout>
    </SidebarProvider>
  )
}

const TabIcon = ({ icon }: { icon: ReactNode }) => {
  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-fd-muted-foreground/20 to-fd-muted-foreground/40 rounded-md w-8 h-8 [&>svg]:size-5 text-fd-foreground">
      {icon}
    </div>
  )
}
