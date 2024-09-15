"use client";

import { addStar } from "@/actions/article";
import { cn } from "@/lib/utils/cn";
import { Article } from "@prisma/client";
import { useState } from "react";
import { StarsIcon } from "../atoms/icon";
import { Button } from "../atoms/ui/button";

interface StarActionProps {
  className?: string;
  data: Pick<Article, "id" | "stars">;
}

export default function StarAction({ data, className }: StarActionProps) {
  const { id, stars } = data;
  const [currentStars, setCurrentStars] = useState(stars);

  const handleLike = async () => {
    setCurrentStars((prev) => prev + 1);

    try {
      await addStar(id);
    } catch (error) {
      console.error(error);
      setCurrentStars((prev) => prev - 1);
    }
  };

  return (
    <Button
      className={cn(
        className,
        "group flex items-center gap-x-2 rounded-full !p-2.5",
      )}
      variant={"ghost"}
      onClick={handleLike}
    >
      <StarsIcon className="size-5 transition-colors duration-300 ease-in-out group-hover:fill-amber-500 group-hover:text-amber-500" />
      {currentStars}
    </Button>
  );
}
