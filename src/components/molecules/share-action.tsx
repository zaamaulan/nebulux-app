"use client";

import { cn } from "@/lib/utils/cn";
import { useState } from "react";
import { toast } from "sonner";
import {
  FacebookIcon,
  InstagramIcon,
  ShareIcon,
  ThreadsIcon,
  TwitterIcon,
} from "../atoms/icon";
import Modal from "../atoms/modal";
import { Button } from "../atoms/ui/button";

interface ShareActionProps {
  className?: string;
}

export default function ShareAction({ className }: ShareActionProps) {
  const [showModal, setShowModal] = useState(false);
  const currentUrl = window.location.href; // Dapatkan URL saat ini

  const handleShare = () => {
    setShowModal(!showModal);
  };

  const copyUrl = () => {
    navigator.clipboard
      .writeText(currentUrl) // Salin URL ke clipboard
      .then(() => {
        toast("URL copied to clipboard!");
        setShowModal(false);
      })
      .catch((err) => {
        toast("Failed to copy URL: " + err);
        setShowModal(false);
      });
  };

  return (
    <>
      <Button
        className={cn(
          className,
          "flex items-center gap-x-2 rounded-full !p-2.5",
        )}
        variant={"ghost"}
        onClick={handleShare}
      >
        <ShareIcon className="size-5" />
        <span>Share</span>
      </Button>
      <Modal open={showModal} setOpen={setShowModal} title="Share">
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center gap-x-3">
            <Button className="size-10 rounded-full !p-0">
              <FacebookIcon />
            </Button>
            <Button className="size-10 rounded-full !p-0">
              <InstagramIcon />
            </Button>
            <Button className="size-10 rounded-full !p-0">
              <TwitterIcon />
            </Button>
            <Button className="size-10 rounded-full !p-0">
              <ThreadsIcon />
            </Button>
          </div>
          <div className="relative grid h-10 w-full grid-cols-[1fr_44px] rounded-xl border border-input bg-background px-3 py-2 text-sm">
            <p className="line-clamp-1">{currentUrl}</p>
            <button onClick={copyUrl} className="mx-auto">
              Copy
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
