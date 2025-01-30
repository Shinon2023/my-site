"use client";

import { ChevronRight, CircleX, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { asset } from "@/utils/types/project";
import {
  AddVector,
  AddFunction,
} from "@/components/canvas/components/add-assets";
import { useDispatch } from "react-redux";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { removeAsset } from "@/utils/redux/slices/assets-Slice";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: asset[];
  }[];
}) {
  const dispatch = useDispatch();
  const handleRemoveAsset = (id: string) => {
    dispatch(removeAsset(id));
  };
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem: asset) => (
                    <SidebarMenuSubItem key={subItem.id}>
                      <SidebarMenuSubButton asChild>
                        <div className="flex justify-between">
                          <span>{subItem.name}</span>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant={"ghost"}
                                className="w-2 h-full rounded-full"
                              >
                                <CircleX className="text-red-700" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete your asset and remove your
                                  asset from project.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleRemoveAsset(subItem.id)}
                                >
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </SidebarMenuSubButton>
                      <CollapsibleContent></CollapsibleContent>
                    </SidebarMenuSubItem>
                  ))}
                  {item.title === "Vector" && (
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <AddVector />
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  )}
                  {item.title === "Functions" && (
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <AddFunction />
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  )}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
