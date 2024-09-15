"use client";

import { signOut, useSession } from "next-auth/react";
import React from "react";
import { Button } from "../atoms/ui/button";

const SignOutButton = () => {
  const { data: session } = useSession();

  return (
    <Button
      className="rounded-full text-base max-md:hidden"
      variant={"ghost"}
      onClick={() => signOut()}
    >
      Sign out
    </Button>
  );
};

export default SignOutButton;
