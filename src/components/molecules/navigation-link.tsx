"use client";

import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationLinks = [
  { title: "Home", href: "/" },
  { title: "Article", href: "/article" },
  { title: "Explore", href: "/explore" },
  // { title: "About", href: "/about" },
  // { title: "Contact", href: "/contact" },
];

export default function NavigatonLink() {
  const pathname = usePathname();

  return (
    <>
      {navigationLinks.map((link, index) => {
        const active = link.href === pathname ? "max-md:border-l-4 max-md:pl-2 max-md:border-black" : "";
        return (
          <li key={index}>
            <Link href={link.href} className={cn(active)}>
              {link.title}
            </Link>
          </li>
        );
      })}
    </>
  );
}
