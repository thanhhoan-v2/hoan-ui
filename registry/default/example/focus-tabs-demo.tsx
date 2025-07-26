"use client"

import { LockIcon, SettingsIcon, UserIcon } from "lucide-react"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    TabsTriggerIcon,
    TabsTriggerText,
} from "@/registry/default/hoanui/focus-tabs"

export default function FocusTabsDemo() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">
          <TabsTriggerIcon>
            <UserIcon />
          </TabsTriggerIcon>
          <TabsTriggerText>Account</TabsTriggerText>
        </TabsTrigger>
        <TabsTrigger value="password">
          <TabsTriggerIcon>
            <LockIcon />
          </TabsTriggerIcon>
          <TabsTriggerText>Password</TabsTriggerText>
        </TabsTrigger>
        <TabsTrigger value="settings">
          <TabsTriggerIcon>
            <SettingsIcon />
          </TabsTriggerIcon>
          <TabsTriggerText>Settings</TabsTriggerText>
        </TabsTrigger>
      </TabsList>
      <DemoContent value="account">This is the account content.</DemoContent>
      <DemoContent value="password">This is the password content.</DemoContent>
      <DemoContent value="settings">This is the settings content.</DemoContent>
    </Tabs>
  )
}

const DemoContent = ({
  value,
  children,
}: {
  value: string
  children?: React.ReactNode
}) => {
  return (
    <TabsContent
      className="bg-muted p-4 rounded-md w-72 h-32 text-muted-foreground"
      value={value}
    >
      {children}
    </TabsContent>
  )
}
