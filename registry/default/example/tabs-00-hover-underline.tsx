"use client"

import { Tabs, TabsList, TabsTrigger } from "@/registry/default/hoanui/tabs-00"

export default function Tabs00HoverUnderline() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTriggerDemo value="account">Account</TabsTriggerDemo>
        <TabsTriggerDemo value="password">Password</TabsTriggerDemo>
        <TabsTriggerDemo value="settings">Settings</TabsTriggerDemo>
        <TabsTriggerDemo className="hidden md:block" value="notifications">
          Notifications
        </TabsTriggerDemo>
        <TabsTriggerDemo className="hidden md:block" value="integrations">
          Integrations
        </TabsTriggerDemo>
      </TabsList>
    </Tabs>
  )
}

const TabsTriggerDemo = ({
  value,
  children,
  className,
}: {
  value: string
  children: React.ReactNode
  className?: string
}) => {
  return (
    <TabsTrigger hoverAnimation={false} className={className} value={value}>
      <TabsTriggerHoverUnderline />
      {children}
    </TabsTrigger>
  )
}

const TabsTriggerHoverUnderline = () => {
  return (
    <span className="hidden group-hover/tabs-trigger:inline-block bottom-0 left-0 absolute bg-secondary rounded-full w-full h-1" />
  )
}
