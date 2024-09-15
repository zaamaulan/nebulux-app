"use client";

import React, { useState } from "react";
// import { toast } from "sonner";
import { Button } from "../atoms/ui/button";
import { BookmarkIcon } from "../atoms/icon";
import { cn } from "@/lib/utils/cn";
import { useToast } from "@/hooks/use-toast";

interface SaveActionProps {
  className?: string;
  data: any;
}

export default function SaveAction({ data, className }: SaveActionProps) {
  const [saved, setSaved] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    setSaved(!saved);

    if (!saved) {
      toast(
        {
          title: "This post has been saved",
          description: data.title,
          duration: 1500,
        },
        // <div className="grid w-full grid-cols-[1fr_24px]">
        //   <p className="text-base font-semibold">Saved</p>
        //   <BookmarkIcon
        //     className={cn(
        //       "size-5",
        //       !saved ? "!fill-blue-500 !text-blue-500" : "",
        //     )}
        //   />
        //   <p className="line-clamp-2">{data.title}</p>
        // </div>,
      );
    } else {
      toast(
        {
          title: "This post has been unsaved",
          description: data.title,
          duration: 1500,
        },
        // <div className="grid w-full grid-cols-[1fr_24px]">
        //   <p className="text-base font-semibold">Unsaved</p>
        //   <BookmarkIcon
        //     className={cn(
        //       "size-5",
        //       !saved ? "!fill-blue-500 !text-blue-500" : "",
        //     )}
        //   />
        //   <p className="line-clamp-2">{data.title}</p>
        // </div>,
      );
    }
  };

  return (
    <Button
      className={cn(className, "flex items-center gap-x-2 rounded-full !p-2.5")}
      variant={"ghost"}
      onClick={handleSave}
    >
      <BookmarkIcon
        className={cn("size-5", saved ? "!fill-blue-500 !text-blue-500" : "")}
      />
      <span>{saved ? "Saved" : "Save"}</span>
    </Button>
  );
}
