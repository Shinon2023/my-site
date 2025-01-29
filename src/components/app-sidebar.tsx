"use client";

import * as React from "react";
import { SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/nav-main";
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
  const project = useSelector((state: RootState) => state.Project);
  const user = useSelector((state: RootState) => state.User.user);

  const navMain = [
    {
      title: "Vector",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: assets.filter((asset) => asset.project_id === project.project_selected?.id),
    },
  ];
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ProjectSwitcher project={project.projects} />
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
