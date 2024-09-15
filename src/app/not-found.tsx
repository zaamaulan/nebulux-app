import { Button } from "@/components/atoms/ui/button";
import Layout from "@/components/templates/layout";
import { ArrowLeft } from "lucide-react";
import React from "react";

export default function NotFoundPage() {
  return (
    <Layout className="min-h-screen">
      <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2">
        <p className="text-center text-lg font-semibold">404</p>
        <h1 className="text-center text-3xl font-semibold">Page Not Found</h1>
        <p className="mt-2 text-center">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur,
          corporis!
        </p>
        <Button
          backButton
          className="mx-auto mt-4 flex items-center gap-x-2 rounded-full !py-2"
        >
          <ArrowLeft className="size-5" />
          <span>Go Back</span>
        </Button>
      </div>
    </Layout>
  );
}
