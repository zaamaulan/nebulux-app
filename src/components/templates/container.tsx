import { cn } from "@/lib/utils/cn";
import React, { ReactNode } from "react";

export default function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(className, "lg:w-7/12 w-11/12 mx-auto")}>{children}</div>
  );
}
