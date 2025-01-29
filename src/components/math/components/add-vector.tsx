"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/redux/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addNewAsset } from "@/utils/redux/slices/assets-Slice";
import { v4 as uuidv4 } from "uuid";

function AddVector() {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [z, setZ] = useState<number>(0);
  const project_id = useSelector(
    (state: RootState) => state.Project.project_selected?.id
  );

  const handleAddVector = () => {
    const newVector = { x: x, y: y, z: z };
    if (project_id) {
      dispatch(
        addNewAsset({
          id: uuidv4(),
          name: name,
          data: {
            type: "Vector",
            vector: newVector,
          },
          project_id: project_id,
        })
      );
    } else {
      console.log("No project selected");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full hover:bg-foreground/10 rounded-lg flex justify-center">
          <Plus />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Vector</DialogTitle>
          <DialogDescription>
            Add a new vector to 3D dimensions
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            type="string"
            className="col-span-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex gap-4 py-4">
          <div className="flex items-center gap-4">
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
          <div className="flex items-center gap-4">
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
          <div className="flex items-center gap-4">
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
          <DialogClose asChild>
            <Button type="button" onClick={handleAddVector}>
              Add Vector
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddVector;
