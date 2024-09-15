import React, { ReactNode } from "react";
import NavigationBar from "../molecules/navigation-bar";
import { cn } from "@/lib/utils/cn";
import Image from "next/image";

export default function AuthLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        className,
        "grid min-h-screen p-8 md:gap-x-6 lg:grid-cols-[0.8fr_1fr] lg:p-12",
      )}
    >
      <div className="relative max-lg:hidden">
        <Image
          src={"/images/3.jpg"}
          alt="sign in image"
          fill
          className="rounded-xl object-cover"
        />
      </div>
      {children}
    </div>
  );
}
