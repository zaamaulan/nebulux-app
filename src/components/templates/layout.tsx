import React, { ReactNode } from "react";
import NavigationBar from "../molecules/navigation-bar";
import { cn } from "@/lib/utils/cn";

export default function Layout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(className, "mx-auto w-11/12 mb-20")}>
      <NavigationBar />
      <main>{children}</main>
    </div>
  );
}
