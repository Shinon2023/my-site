"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/utils/redux/store";
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
import { addVector } from "@/utils/redux/slices/math-vector-Slice";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [z, setZ] = useState<number>(0);
  const dispatch = useDispatch();

  const handleAddVector = () => {
    const newVector = { x, y, z };
    dispatch(addVector(newVector));
  };

  const { Vector3D } = useSelector((state: RootState) => state.MathVector);
  console.log(Vector3D);

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
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Add Vector</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Vector</DialogTitle>
                  <DialogDescription>
                    Add a new vector to 3D dimensions
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="x" className="text-right">
                      x
                    </Label>
                    <Input
                      id="x"
                      type="number"
                      className="col-span-3"
                      value={x}
                      onChange={(e) => setX(Number(e.target.value))}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="y" className="text-right">
                      y
                    </Label>
                    <Input
                      id="y"
                      type="number"
                      className="col-span-3"
                      value={y}
                      onChange={(e) => setY(Number(e.target.value))}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="z" className="text-right">
                      z
                    </Label>
                    <Input
                      id="z"
                      type="number"
                      className="col-span-3"
                      value={z}
                      onChange={(e) => setZ(Number(e.target.value))}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" onClick={handleAddVector}>
                    Add Vector
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <ResetCameraButton />
          </div>
        </header>
        <main className="flex flex-1 gap-2 w-full items-start">{children}</main>
      </div>
    </div>
  );
}
