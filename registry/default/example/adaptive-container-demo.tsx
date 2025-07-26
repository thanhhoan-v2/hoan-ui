"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { AdaptiveContainer } from "@/registry/default/hoanui/adaptive-container"

export default function AdaptiveContainerDemo() {
  const [expanded, setExpanded] = React.useState(false)
  return (
    <AdaptiveContainer className="bg-muted p-6 rounded-lg">
      <h2 className="mb-4 font-bold text-2xl">Adaptive Content</h2>
      <p className="mb-4">
        This is a component that adapts to content size changes. Click the
        button below to change the content size.
      </p>
      {expanded && (
        <p className="mb-4">
          This is additional content that only shows when expanded. It increases
          the component's height, and you can observe how the component smoothly
          adjusts its size to accommodate the new content.
        </p>
      )}
      <Button onClick={() => setExpanded(!expanded)}>
        {expanded ? "Collapse" : "Expand"}
      </Button>
    </AdaptiveContainer>
  )
}
