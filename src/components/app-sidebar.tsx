"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { ProjectSwitcher } from "@/components/projects-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/redux/store";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const assets = useSelector((state: RootState) => state.Asset.assets);
  const project = useSelector((state: RootState) => state.Project.projects);
  const user = useSelector((state: RootState) => state.User.user);

  const navMain = [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: assets,
    },
  ];
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ProjectSwitcher project={project} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{ name: "test", email: user?.email ?? "", avatar: "" }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
