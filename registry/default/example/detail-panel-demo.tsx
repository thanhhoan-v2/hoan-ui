"use client"

import {
    ArrowRight,
    CommandIcon,
    EllipsisIcon,
    MessageSquareIcon,
    PlusIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { ColoredLabel } from "../hoanui/colored-label"
import {
    DetailPanel,
    DetailPanelHeader,
    DetailPanelHeaderAction,
    DetailPanelHeaderActions,
    DetailPanelHeaderTitle,
    DetailPanelProperties,
    DetailPanelProperty,
    DetailPanelPropertyLabel,
    DetailPanelPropertyValue,
    DetailPanelSection,
    DetailPanelSectionContent,
    DetailPanelSectionDescription,
    DetailPanelSectionTitle,
} from "../hoanui/detail-panel"

export default function DetailPanelDemo() {
  return (
    <DetailPanel className="bg-accent rounded-lg w-[320px]">
      <DetailPanelHeader>
        <DetailPanelHeaderTitle>Detail Panel</DetailPanelHeaderTitle>
        <DetailPanelHeaderActions>
          <DetailPanelHeaderAction>
            Open in full view <LinkIcon />
          </DetailPanelHeaderAction>
        </DetailPanelHeaderActions>
      </DetailPanelHeader>

      <DetailPanelProperties>
        <DetailPanelProperty>
          <DetailPanelPropertyLabel>ID</DetailPanelPropertyLabel>
          <DetailPanelPropertyValue asChild>
            <a href="#" className="text-blue-500">
              #290
            </a>
          </DetailPanelPropertyValue>
        </DetailPanelProperty>
        <DetailPanelProperty>
          <DetailPanelPropertyLabel>Status</DetailPanelPropertyLabel>
          <DetailPanelPropertyValue className="text-yellow-500">
            In Progress
          </DetailPanelPropertyValue>
        </DetailPanelProperty>
        <DetailPanelProperty>
          <DetailPanelPropertyLabel>Estimate</DetailPanelPropertyLabel>
          <DetailPanelPropertyValue>16 points</DetailPanelPropertyValue>
        </DetailPanelProperty>
        <DetailPanelProperty>
          <DetailPanelPropertyLabel>Duration</DetailPanelPropertyLabel>
          <DetailPanelPropertyValue>3 days</DetailPanelPropertyValue>
        </DetailPanelProperty>
      </DetailPanelProperties>

      <DetailPanelSection>
        <DetailPanelSectionTitle>Labels</DetailPanelSectionTitle>
        <DetailPanelSectionContent className="flex gap-1.5">
          <ColoredLabel color="#A294F9">Code</ColoredLabel>
          <ColoredLabel color="#99BC85">Frontend</ColoredLabel>
          <button className="flex justify-center items-center border border-primary/30 border-dashed rounded-md size-5 text-muted-foreground text-xs">
            <PlusIcon className="size-3" />
          </button>
        </DetailPanelSectionContent>
      </DetailPanelSection>

      <DetailPanelSection>
        <DetailPanelSectionTitle>Assignees</DetailPanelSectionTitle>
        <DetailPanelSectionDescription>
          Developers assigned from here will override developers assigned to
          subtasks.
        </DetailPanelSectionDescription>
        <DetailPanelSectionContent className="flex flex-col gap-2 mt-2">
          <Assignee name="LioRael" avatar="https://github.com/liorael.png" />
          <Assignee name="Shadcn" avatar="https://github.com/shadcn.png" />
          <Assignee
            name="Fuma Nama"
            avatar="https://github.com/fuma-nama.png"
          />
          <button className="flex justify-center items-center gap-1.5 w-fit h-5 text-sm">
            <div className="flex justify-center items-center w-5 text-muted-foreground">
              <PlusIcon className="size-[14px]" />
            </div>
            <span className="font-medium">Add assignee</span>
            <div className="flex justify-center items-center text-muted-foreground">
              <CommandIcon className="size-[14px]" />A
            </div>
          </button>
        </DetailPanelSectionContent>
      </DetailPanelSection>

      <DetailPanelSection>
        <DetailPanelSectionTitle>Subtasks</DetailPanelSectionTitle>
        <DetailPanelSectionContent>
          <p className="text-muted-foreground text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </DetailPanelSectionContent>
      </DetailPanelSection>
    </DetailPanel>
  )
}

function LinkIcon() {
  return (
    <span className="flex justify-center items-center bg-primary/20 group-hover:bg-primary/30 p-[1px] rounded-full transition-colors duration-200">
      <ArrowRight className="-rotate-45" />
    </span>
  )
}

function Assignee({ name, avatar }: { name: string; avatar: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <Avatar className="size-5">
        <AvatarImage src={avatar} />
        <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <span className="font-medium text-sm">{name}</span>
      <div className="flex items-center gap-0.5 ml-auto">
        <button className="flex justify-center items-center size-5 text-muted-foreground text-xs">
          <MessageSquareIcon className="size-3" />
        </button>
        <button className="flex justify-center items-center size-5 text-muted-foreground text-xs">
          <EllipsisIcon className="size-3" />
        </button>
      </div>
    </div>
  )
}
