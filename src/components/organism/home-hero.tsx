import React from "react";
import { Button } from "../atoms/ui/button";
import { ArrowUpRightIcon } from "../atoms/icon";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";

export default function HomeHero() {
  return (
    <section className="flex h-[60vh] flex-col items-center justify-center md:h-[50vh]">
      <hgroup className="flex flex-col">
        <h1 className="text-center text-3xl font-semibold leading-normal text-zinc-600">
          Nebulux
        </h1>
        <h2 className="text-center text-5xl font-bold leading-tight">
          Where Stories Find Their Voice
        </h2>
        <p className="text-center text-lg">
          Nebulux is a platform for sharing and discovering stories.
        </p>
      </hgroup>

      <Link href={"/write"}>
        <Button className="mt-8 rounded-full" size="lg">
          Start Your Storytelling Journey
          {/* <ArrowUpRightIcon className="size-6"/> */}
        </Button>
      </Link>
    </section>
  );
}
