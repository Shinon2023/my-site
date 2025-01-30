"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/redux/store";
import { SidebarProvider } from "@/components/ui/sidebar";
function TestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useSelector((state: RootState) => state.User);
  const project = useSelector((state: RootState) => state.Project);
  const asset = useSelector((state: RootState) => state.Asset);
  // console.log("asset", asset);
  // console.log("project", project);
  // console.log("user", user);

  if (user.loading || project.loading || asset.loading) {
    return <div suppressHydrationWarning>Loading...</div>;
  }
  return <SidebarProvider>{children}</SidebarProvider>;
}

export default TestLayout;
