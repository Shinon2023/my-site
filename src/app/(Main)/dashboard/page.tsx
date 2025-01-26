"use client";

import React, { use, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { crateProject, getProjects } from "@/utils/supabase/api/project";
import { SubmitButton } from "@/components/submit-button";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/utils/redux/store";
import { addProjects } from "@/utils/redux/slices/project-Slice";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DashboardPage() {
  // const pathname = usePathname().split("/").pop();
  // console.log(pathname);
  const { projects } = useSelector((state: RootState) => state.Project);
  const dispatch = useDispatch();

  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!hasFetched) {
      getProjects().then((data) => {
        console.log(data);
        dispatch(addProjects(data));
        setHasFetched(true);
      });
    }
  }, [hasFetched]);

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
