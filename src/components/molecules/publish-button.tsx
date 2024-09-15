"use client";

import { cn } from "@/lib/utils/cn";
import { VariantProps } from "class-variance-authority";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "../atoms/modal";
import { Button, buttonVariants } from "../atoms/ui/button";
import { Textarea } from "../atoms/ui/textarea";
import PublishForm from "./form/publish/publish-form";
import Image from "next/image";

interface PublishButtonProps extends VariantProps<typeof buttonVariants> {
  className?: string;
}

export default function PublishButton({
  variant = "default",
  className,
}: PublishButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const title = `Lorem ipsum dolor sit amet consectetur`;
  const subtitle = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur
            minima a blanditiis doloremque porro?`;

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const handlePublish = () => {
    setShowModal(false);
    router.push("/");
  };

  return (
    <>
      <Button
        variant={variant}
        onClick={handleModal}
        className={cn(className, "rounded-full !text-base")}
      >
        Publish
      </Button>

      <Modal
        open={showModal}
        setOpen={setShowModal}
        title="Preview"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
        className=""
      >
        <PublishForm>
          <div className="grid gap-2 lg:grid-cols-2 lg:gap-6">
            <Button
              variant={"secondary"}
              onClick={() => setShowModal(false)}
              className="rounded-full"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant={"default"}
              className="rounded-full max-lg:order-first"
            >
              Publish
            </Button>
          </div>
        </PublishForm>
      </Modal>
    </>
  );
}
