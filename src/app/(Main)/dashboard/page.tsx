"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DashboardPage() {

  return (
    <ScrollArea className="h-full rounded-xl bg-muted/50 w-full border items-center justify-center m-4 ">
      <div className="flex flex-row flex-wrap justify-start">
        {/* {projects.map((project) => (
          <div
            key={project.id}
            className="aspect-video rounded-xl bg-muted/50 m-4 h-48 items-center flex justify-center flex-row"
          >
            {project.name}
          </div>
        ))} */}
      </div>
    </ScrollArea>
  );
}
