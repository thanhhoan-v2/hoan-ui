"use client"

import { PlusIcon, SettingsIcon } from "lucide-react"

import {
    IconHoverButton,
    IconHoverButtonIcon,
    IconHoverButtonText,
} from "@/registry/default/hoanui/icon-hover-button"

export default function IconHoverButtonBothSide() {
  return (
    <IconHoverButton>
      <IconHoverButtonIcon>
        <SettingsIcon />
      </IconHoverButtonIcon>
      <IconHoverButtonText>Button</IconHoverButtonText>
      <IconHoverButtonIcon className="ml-1">
        <PlusIcon />
      </IconHoverButtonIcon>
    </IconHoverButton>
  )
}
