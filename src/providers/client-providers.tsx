"use client";

import { SWRConfig } from "swr";
import { fetcher } from "@/lib/utils/api";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig value={{ fetcher, revalidateOnFocus: false }}>
      <SessionProvider>{children}</SessionProvider>
    </SWRConfig>
  );
}
