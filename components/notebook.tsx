import type { PageTree } from "fumadocs-core/server"
import { TreeContextProvider } from "fumadocs-ui/provider"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { FC, type HTMLAttributes, type ReactNode } from "react"

import { RootToggle, type Option } from "@/components/layout/root-toggle"
import { cn } from "@/lib/cn"
import { getSidebarTabs, TabOptions } from "@/lib/get-sidebar-tabs"

import { Sidebar, SidebarProps } from "./docs/sidebar"
import { DocsNavbar, LayoutBody, SidebarItems } from "./notebook.client"
import {
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarInset,
    SidebarTrigger,
} from "./ui/sidebar"

interface SidebarOptions extends SidebarProps {
  /**
   * Root Toggle options
   */
  tabs?: Option[] | TabOptions | false

  components?: Partial<SidebarComponents>
}

export interface SidebarComponents {
  Item: FC<{ item: PageTree.Item }>
  Folder: FC<{ item: PageTree.Folder; level: number }>
  Separator: FC<{ item: PageTree.Separator }>
}

export interface DocsLayoutProps {
  tree: PageTree.Root

  sidebar?: Partial<SidebarOptions>

  containerProps?: HTMLAttributes<HTMLDivElement>

  children?: ReactNode
}

export function DocsLayout({
  sidebar: { tabs: tabOptions, components: sidebarComponents } = {},
  children,
  ...props
}: DocsLayoutProps) {
  if (props.tree === undefined) notFound()

  let tabs: Option[] = []
  if (Array.isArray(tabOptions)) {
    tabs = tabOptions
  } else if (typeof tabOptions === "object") {
    tabs = getSidebarTabs(props.tree, tabOptions)
  } else if (tabOptions !== false) {
    tabs = getSidebarTabs(props.tree)
  }

  return (
    <TreeContextProvider tree={props.tree}>
      <LayoutBody
        {...props.containerProps}
        className={cn(
          "[--fd-nav-height:3.5rem] md:[--fd-sidebar-width:260px] lg:[--fd-toc-width:260px] [&_#nd-toc]:max-lg:hidden [&_#nd-tocnav]:lg:hidden",
          props.containerProps?.className
        )}
      >
        <Sidebar className="md:[--fd-nav-height:0px]">
          <SidebarHeader>
            <SidebarHeaderItems>
              <SidebarTrigger className="ms-auto text-fd-muted-foreground" />
            </SidebarHeaderItems>
            {tabs.length > 0 ? <RootToggle options={tabs} /> : null}
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarItems components={sidebarComponents} />
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <div className="w-full min-w-0 max-w-[var(--fd-content-width)] [--fd-nav-height:3.5rem]">
            <DocsNavbar />
            <div className="z-[1] flex flex-row">{children}</div>
          </div>
          <div
            className="flex-1 min-w-[var(--fd-sidebar-width)]"
            style={{
              marginInlineStart: "calc(var(--fd-sidebar-width) * -1)",
            }}
          />
        </SidebarInset>
      </LayoutBody>
    </TreeContextProvider>
  )
}

function SidebarHeaderItems({ children }: { children: ReactNode }) {
  return (
    <SidebarGroup className="flex flex-row items-center">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 py-1 font-medium"
      >
        <Image src="/logo.png" alt="HoanUI" width={24} height={24} />
        HoanUI
      </Link>
      {children}
    </SidebarGroup>
  )
}
