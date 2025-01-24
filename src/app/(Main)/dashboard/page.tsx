"use client";

import React, {use, useEffect, useState} from "react";
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
    <div className="flex rounded-xl bg-muted/50 flex-row flex-wrap m-4 items-start">
      {projects.map((project) => (
        <div
          key={project.id}
          className="aspect-video rounded-xl bg-muted/50 m-4 h-48 items-center flex justify-center flex-row"
        >
          {project.name}
        </div>
      ))}
      <div className="aspect-video rounded-xl bg-background m-4 h-48 items-center flex justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="rounded-full w-12 h-12 p-0 text-3xl text-neutral-500"
            >
              +
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <form>
              <DialogHeader>
                <DialogTitle>New Project</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Project name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue="Project 1"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Project description"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Dimension
                  </Label>
                  <RadioGroup className="flex" name="dimension">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2D" id="2d" />
                      <Label htmlFor="r1">3D</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3D" id="3d" />
                      <Label htmlFor="r2">2D</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <DialogFooter>
                <SubmitButton pendingText="Saving..." formAction={crateProject}>
                  Save changes
                </SubmitButton>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
