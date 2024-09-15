import { cn } from "@/lib/utils/cn";
import Image from "next/image";
import React from "react";
import { Button } from "../atoms/ui/button";
import { ArrowUpRightIcon } from "../atoms/icon";
import Link from "next/link";

// interface PostCardProps {
//   id: number;
//   title: string;
//   excerpt: string;
//   author: string;
//   category: string;
//   image: string;
//   date: string;
//   readTime: number;
//   commentsCount: number;
//   likesCount: number;
//   dislikesCount: number;
//   isLiked: boolean;
//   isDisliked: boolean;
//   isBookmarked: boolean;
//   isSaved: boolean;
//   isShared: boolean;
//   isPinned: boolean;
//   isPublished: boolean;
//   isFeatured: boolean;
//   isSticky: boolean;
//   isSponsored: boolean;
//   isHighlighted: boolean;
//   isRepublished: boolean;
//   isTrashed: boolean;
//   isArchived: boolean;
//   isDeleted: boolean;
//   isDraft: boolean;
//   isPrivate: boolean;
//   isPublishedLater: boolean;
//   isScheduled: boolean;
//   isScheduledFor: string;
//   isPublishedAt: string
// }

interface PostCardProps {
  id: string;
  title: string;
  // description: string;
  slug: string;
  className?: string;
  thumbnail?: string;
}

export default function PostCard({
  // description,
  slug,
  title,
  className,
  thumbnail,
}: PostCardProps) {
  return (
    <div className={cn(className, "")}>
      <div className="relative">
        <div className="group absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-zinc-800 bg-opacity-0 transition-all hover:bg-opacity-40">
          <Link href={`/read/${slug}`}>
            <Button
              className={cn(
                "group hidden flex-none rounded-full !p-2 group-hover:block",
              )}
            >
              <ArrowUpRightIcon />
            </Button>
          </Link>
        </div>
        <div className={cn("relative aspect-[16/10] md:aspect-[16/8]")}>
          <Image
            src={"/images/3.jpg"}
            alt=""
            fill
            className="rounded-xl object-cover object-center"
          />
        </div>
      </div>
      <figcaption className="mt-4">
        <h3 className={cn("line-clamp-2 text-xl font-semibold")}>{title}</h3>
        <p className="mt-2 line-clamp-2 text-zinc-600">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae
          dolorem id nobis error, ab eum optio officia dicta autem explicabo?
        </p>
        {/* <div className="relative w-6 h-6">
        <Image src="/images/avatar.jpg" alt="" width={24} height={24} className="rounded-full" />
      </div> */}
        <div className="mt-4 flex items-center gap-x-2">
          <div className="relative h-10 w-10 rounded-full bg-black md:h-8 md:w-8">
            {" "}
            <Image
              src={"/images/1.jpg"}
              alt=""
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h5>Lorem, ipsum.</h5>
            <p className="text-sm text-zinc-600">Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
      </figcaption>
    </div>
  );
}
