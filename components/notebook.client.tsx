"use client"

import type { PageTree } from "fumadocs-core/server"
import { SearchOnly, useTreeContext, useTreePath } from "fumadocs-ui/provider"
import Image from "next/image"
import Link from "next/link"
import { type HTMLAttributes, type ReactNode } from "react"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/cn"

import { Navbar } from "./docs/navbar"
import {
    SidebarFolder,
    SidebarFolderContent,
    SidebarFolderLink,
    SidebarFolderTrigger,
    SidebarItem,
    SidebarSeparator,
} from "./docs/sidebar"
import { LargeSearchToggle, SearchToggle } from "./layout/search-toggle"
import { ThemeToggle } from "./layout/theme-toggle"
import type { SidebarComponents } from "./notebook"
import { Icons } from "./ui/icon"
import { SidebarMenu, SidebarTrigger, useSidebar } from "./ui/sidebar"

export function LayoutBody(props: HTMLAttributes<HTMLElement>) {
  const { open } = useSidebar()

  return (
    <main
      id="nd-docs-layout"
      {...props}
      className={cn("flex w-full flex-1 flex-row", props.className)}
      style={
        {
          ...props.style,
          "--fd-content-width": !open
            ? "100vw"
            : "calc(min(100vw, var(--fd-layout-width)) - var(--fd-sidebar-width))",
        } as object
      }
    >
      {props.children}
    </main>
  )
}

export function SidebarItems(props: {
  components?: Partial<SidebarComponents>
}) {
  const { root } = useTreeContext()

  return (
    <SidebarMenu className="-mt-2" {...props}>
      {renderSidebarList(root.children, 1)}
    </SidebarMenu>
  )
}

function PageTreeFolder({
  item,
  children,
  level,
}: {
  item: PageTree.Folder
  level: number
  children: ReactNode
}) {
  const path = useTreePath()

  return (
    <SidebarFolder
      defaultOpen={item.defaultOpen || path.includes(item)}
      level={level + 1}
    >
      {children}
    </SidebarFolder>
  )
}

function renderSidebarList(items: PageTree.Node[], level: number): ReactNode[] {
  return items.map((item, i) => {
    const id = `${item.type}_${i.toString()}`

    switch (item.type) {
      case "separator":
        return <SidebarSeparator key={id}>{item.name}</SidebarSeparator>
      case "folder":
        return (
          <PageTreeFolder key={id} item={item} level={level + 1}>
            {item.index ? (
              <SidebarFolderLink
                href={item.index.url}
                external={item.index.external}
              >
                {item.icon}
                {item.name}
              </SidebarFolderLink>
            ) : (
              <SidebarFolderTrigger>
                {item.icon}
                {item.name}
              </SidebarFolderTrigger>
            )}
            <SidebarFolderContent>
              {renderSidebarList(item.children, level + 1)}
            </SidebarFolderContent>
          </PageTreeFolder>
        )
      default:
        return (
          <SidebarItem
            key={item.url}
            href={item.url}
            external={item.external}
            icon={item.icon}
          >
            {item.name}
          </SidebarItem>
        )
    }
  })
}

export function DocsNavbar() {
  const { open } = useSidebar()
  const isMobile = useIsMobile()

  return (
    <Navbar id="nd-subnav" className="z-[2] md:gap-1.5 h-14">
      {!open && <SidebarTrigger className="-ms-1.5 size-8" />}
      <SearchOnly>
        <LargeSearchToggle className="max-md:hidden rounded-lg w-full max-w-[240px]" />
      </SearchOnly>
      <div className="md:hidden">
        <Link href="/">
          <Image src="/logo.png" alt="HoanUI" width={24} height={24} />
        </Link>
      </div>
      <div className="flex flex-row flex-1 items-center gap-6 px-2"></div>
      <SearchOnly>
        <SearchToggle className="md:hidden" />
      </SearchOnly>
      <div className="empty:hidden max-lg:hidden flex flex-row items-center"></div>
      <ThemeToggle className="max-md:hidden p-0" />
      <Link
        className="hover:bg-secondary [&_svg]:fill-current ml-auto p-1.5 rounded-md [&_svg]:size-5 hover:text-secondary-foreground"
        href="https://github.com/hoanui-org/hoanui"
        target="_blank"
      >
        <Icons.Github />
      </Link>
      {isMobile && <SidebarTrigger className="size-8 [&_svg]:size-[18px]" />}
    </Navbar>
  )
}
