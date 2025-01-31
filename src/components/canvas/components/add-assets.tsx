"use client";

import React, { useEffect, useState } from "react";
import { z as zod } from "zod";
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
import { parseEquation } from "@/utils/func/parse-equation";

export function AddVector() {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [z, setZ] = useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const project_id = useSelector(
    (state: RootState) => state.Project.project_selected?.id
  );

  const asset = useSelector((state: RootState) => state.Asset.assets);

  const schema = zod.object({
    name: zod
      .string()
      .min(1, "Name is required")
      .superRefine((val, ctx) => {
        const isNameDuplicate = asset.some(
          (existingAsset) =>
            existingAsset.name.toLowerCase() === val.toLowerCase()
        );
        if (isNameDuplicate) {
          ctx.addIssue({
            path: ["name"],
            message: "The name already exists. Please choose a different name.",
            code: zod.ZodIssueCode.custom,
          });
        }
      }),
    x: zod
      .number()
      .refine((val) => !isNaN(val), { message: "X must be a valid number" }),
    y: zod
      .number()
      .refine((val) => !isNaN(val), { message: "Y must be a valid number" }),
    z: zod
      .number()
      .refine((val) => !isNaN(val), { message: "Z must be a valid number" }),
  });

  const handleAddVector = () => {
    const result = schema.safeParse({ name, x, y, z });

    if (!result.success) {
      const errorMessages = result.error.errors
        .map((e) => e.message)
        .join(", ");
      setErrorMessage(errorMessages);
      return;
    }

    if (project_id) {
      const newVector = { x: x, y: y, z: z };
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
      setIsDialogOpen(false);
    } else {
      console.log("No project selected");
    }
  };

  useEffect(() => {
    if (isDialogOpen) {
      setName("");
      setX(0);
      setY(0);
      setZ(0);
      setErrorMessage("");
    }
  }, [isDialogOpen]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
            required
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
        {errorMessage && (
          <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
        )}
        <DialogFooter>
          <Button type="button" onClick={handleAddVector}>
            Add Vector
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function AddFunction() {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [equation, setEquation] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const project_id = useSelector(
    (state: RootState) => state.Project.project_selected?.id
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const asset = useSelector((state: RootState) => state.Asset.assets);
  const schema = zod.object({
    name: zod
      .string()
      .min(1, "Name is required")
      .superRefine((val, ctx) => {
        const isNameDuplicate = asset.some(
          (existingAsset) =>
            existingAsset.name.toLowerCase() === val.toLowerCase()
        );
        if (isNameDuplicate) {
          ctx.addIssue({
            path: ["name"],
            message: "The name already exists. Please choose a different name.",
            code: zod.ZodIssueCode.custom,
          });
        }
      }),
    equation: zod.string(),
  });
  const handleAddFunc = () => {
    const result = schema.safeParse({ name, equation });

    if (!result.success) {
      const errorMessages = result.error.errors
        .map((e) => e.message)
        .join(", ");
      setErrorMessage(errorMessages);
      return;
    }

    if (project_id) {
      dispatch(
        addNewAsset({
          id: uuidv4(),
          name: name,
          data: {
            type: "General",
            terms: parseEquation(equation),
          },
          project_id: project_id,
        })
      );
      setIsDialogOpen(false);
    } else {
      console.log("No project selected");
    }
  };
  useEffect(() => {
    if (isDialogOpen) {
      setName("");
      setEquation("");
      setErrorMessage("");
    }
  }, [isDialogOpen]);
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button className="w-full hover:bg-foreground/10 rounded-lg flex justify-center">
          <Plus />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Function</DialogTitle>
          <DialogDescription>
            Add a new function to 3D dimensions
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <Label htmlFor="equation" className="text-right">
            Equation
          </Label>
          <Input
            id="equation"
            type="text"
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
          />
        </div>
        {errorMessage && (
          <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
        )}
        <DialogFooter>
          <Button type="button" onClick={handleAddFunc}>
            Add Function
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
