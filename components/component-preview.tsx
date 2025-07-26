"use client"

import { Index } from "@/__registry__"
import { CodeIcon, Eye, Loader2 } from "lucide-react"
import Image from "next/image"
import * as React from "react"

import { cn } from "@/lib/utils"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    TabsTriggerIcon,
    TabsTriggerText,
} from "@/registry/default/hoanui/focus-tabs"
import { styles } from "@/registry/registry-styles"

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  extractClassname?: boolean
  extractedClassNames?: string
  align?: "center" | "start" | "end"
  description?: string
  hideCode?: boolean
  type?: "block" | "component" | "example"
}

export function ComponentPreview({
  name,
  type,
  children,
  className,
  align = "center",
  hideCode = false,
  ...props
}: ComponentPreviewProps) {
  const index = styles.findIndex((style) => style.name === "default")

  const Codes = React.Children.toArray(children) as React.ReactElement[]
  const Code = Codes[index]

  const Preview = React.useMemo(() => {
    const Component = Index["default"][name]?.component

    if (!Component) {
      return (
        <p className="text-muted-foreground text-sm">
          Component{" "}
          <code className="relative bg-muted px-[0.3rem] py-[0.2rem] rounded-lg font-mono text-sm">
            {name}
          </code>{" "}
          not found in registry.
        </p>
      )
    }

    return <Component />
  }, [name])

  if (type === "block") {
    return (
      <div className="relative border rounded-lg w-full aspect-[4/2.5] overflow-hidden">
        <Image
          src={`/images/blocks/${name}.png`}
          alt={name}
          width={1440}
          height={900}
          className="md:dark:hidden md:hidden dark:hidden top-0 left-0 z-20 absolute bg-background w-[970px] sm:w-[1280px] max-w-none"
        />
        <Image
          src={`/images/blocks/${name}-dark.png`}
          alt={name}
          width={1440}
          height={900}
          className="hidden md:dark:hidden md:hidden dark:block top-0 left-0 z-20 absolute bg-background w-[970px] sm:w-[1280px] max-w-none"
        />
        <div className="hidden md:block absolute inset-0 bg-background w-[1600px]">
          <iframe src={`/blocks/default/${name}`} className="size-full" />
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn("group relative my-4 flex flex-col space-y-2", className)}
      {...props}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex justify-between items-center">
          {!hideCode && (
            <TabsList>
              <TabsTrigger value="preview">
                <TabsTriggerIcon>
                  <Eye />
                </TabsTriggerIcon>
                <TabsTriggerText>Preview</TabsTriggerText>
              </TabsTrigger>
              <TabsTrigger value="code">
                <TabsTriggerIcon>
                  <CodeIcon />
                </TabsTriggerIcon>
                <TabsTriggerText>Code</TabsTriggerText>
              </TabsTrigger>
            </TabsList>
          )}
        </div>
        <TabsContent value="preview" className="relative border rounded-lg">
          <div
            className={cn(
              "not-prose preview flex min-h-[350px] w-full justify-center p-10",
              {
                "items-center": align === "center",
                "items-start": align === "start",
                "items-end": align === "end",
              }
            )}
          >
            <React.Suspense
              fallback={
                <div className="flex justify-center items-center w-full text-muted-foreground text-sm">
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Loading...
                </div>
              }
            >
              {Preview}
            </React.Suspense>
          </div>
        </TabsContent>
        <TabsContent value="code">
          <div className="flex flex-col space-y-4">
            <div className="[&_figure]:my-0 rounded-md w-full [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
              {Code}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
