"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/atoms/ui/sheet";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MenuIcon } from "../atoms/icon";
import { Avatar, AvatarImage } from "../atoms/ui/avatar";
import { Button } from "../atoms/ui/button";
import { Separator } from "../atoms/ui/separator";
import NavigatonLink from "./navigation-link";
import PublishButton from "./publish-button";

export default function NavigationBar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  const handleSidebar = () => {
    setOpen(!open);
  };

  return (
    <>
      <header className="sticky top-0 z-50 flex h-full items-center gap-x-10 bg-white px-2 py-6">
        <div className="flex items-center gap-x-2">
          <Button
            variant={"ghost"}
            onClick={handleSidebar}
            className="p-2 md:hidden"
          >
            <MenuIcon />
          </Button>
          <Link href={"/"}>
            <p className="text-lg font-semibold">Nebulux</p>
          </Link>
        </div>
        <nav className="max-md:hidden">
          <ul className="flex items-center gap-x-6">
            <NavigatonLink />
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-x-2">
          {pathname === "/write" && <PublishButton variant={"ghost"} className="max-md:hidden" />}
          {!session && (
            <>
              <Link href={"/auth/sign-in"}>
                <Button
                  className="rounded-full text-base max-md:hidden"
                  variant={"ghost"}
                >
                  Sign in
                </Button>
              </Link>
              <Link href={"/auth/sign-up"}>
                <Button className="rounded-full text-base">Sign up</Button>
              </Link>
            </>
          )}

          {session && (
            <Link href={"/profile"}>
             <Avatar>
              <AvatarImage src={'/images/1.jpg'} className="object-cover" />
             </Avatar>
            </Link>
          )}
        </div>
      </header>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side={"left"} className="flex flex-col gap-y-6">
          <SheetHeader>
            <SheetTitle className="text-left">Nebulux</SheetTitle>
            <SheetDescription className="text-left">
              Nebulux is a platform for sharing and discovering stories.
            </SheetDescription>
          </SheetHeader>
          <Separator />
          <div>
            <h2 className="font-semibold text-foreground">Navigation</h2>
            <nav className="mt-4">
              <ul className="flex flex-col gap-y-4">
                <NavigatonLink />
              </ul>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
