"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
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
import { addNewAsset } from "@/utils/redux/slices/assets-Slice";
import { v4 as uuidv4 } from "uuid";

function AddVector() {
  const dispatch = useDispatch();
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [z, setZ] = useState<number>(0);

  const handleAddVector = () => {
    const newVector = { x: x, y: y, z: z };
    dispatch(
      addNewAsset({
        id: uuidv4(),
        name: "Vector1",
        data: {
          type: "Vector",
          vector: newVector,
        },
        project_id: "01a1c762-9ac7-4079-9c06-26eb281bec0d",
      })
    );
  };
  return (
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
  );
}

export default AddVector;
