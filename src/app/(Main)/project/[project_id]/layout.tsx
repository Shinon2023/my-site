"use client";

import React, { useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { useDispatch } from "react-redux";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ResetCameraButton } from "@/components/math/components/reset-camera";
import { selectProject } from "@/utils/redux/slices/project-Slice";

export default function TestLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { project_id: string };
}>) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(selectProject(params.project_id));
  });
  // console.log(params);
  return (
    <div className="flex flex-row w-full h-screen">
      <AppSidebar className="absolute" />
      <div className="flex flex-col w-full justify-start h-screen flex-1">
        <header className="flex h-16 gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 w-full items-center z-10">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex flex-1 justify-end gap-2 px-4">
            <ResetCameraButton />
          </div>
        </header>
        <main className="flex flex-1 gap-2 w-full items-start">{children}</main>
      </div>
    </div>
  );
}
