"use client";

import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Provider } from "react-redux";
import { store } from "@/utils/redux/store";

function RootProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Provider store={store}>
        <SidebarProvider>{children}</SidebarProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default RootProvider;
