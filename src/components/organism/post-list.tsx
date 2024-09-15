"use client";

import { cn } from "@/lib/utils/cn";
import { Article } from "@prisma/client";
import { useState } from "react";
import { Button } from "../atoms/ui/button";
import { ScrollArea, ScrollBar } from "../atoms/ui/scroll-area";
import PostCard from "../molecules/post-card";
import Container from "../templates/container";

const postCategories = [
  { title: "View all", value: "all" },
  { title: "Technology", value: "Technology" },
  { title: "Lifestyle", value: "Life Style" },
  { title: "Travel", value: "Travel" },
  { title: "Food", value: "Food" },
  { title: "Business", value: "Business" },
  { title: "Health", value: "Health" },
  { title: "Sport", value: "Sport" },
];

interface PostListProps {
  className?: string;
  withoutCategory?: boolean;
  withoutFeatured?: boolean;
  take?: number;
  data: Article[];
}

export default function PostList({
  className,
  withoutCategory,
  withoutFeatured,
  take,
  data,
}: PostListProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  function handleCategoryChange(category: string) {
    setSelectedCategory(category);
  }

  const filteredPosts =
    selectedCategory === "all"
      ? data
      : data.filter((post) => post.category === selectedCategory);

  return (
    <section className="space-y-4 max-md:mt-6">
      {!withoutCategory && (
        <Container>
          <nav className="">
            <ScrollArea className="w-full max-w-full">
              <ul className="mb-3 flex items-center justify-center gap-x-2">
                {postCategories.map((category) => (
                  <li key={category.value}>
                    <Button
                      variant={
                        selectedCategory === category.value
                          ? "default"
                          : "outline"
                      }
                      onClick={() => handleCategoryChange(category.value)}
                      className="rounded-full"
                    >
                      {category.title}
                    </Button>
                  </li>
                ))}
              </ul>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </nav>
        </Container>
      )}
      <Container>
        <div
          className={cn(
            "grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2",
            className,
          )}
        >
          {filteredPosts.slice(0, take).map((post) => (
            <PostCard
              key={post.id}
              className={cn(!withoutFeatured && "md:first:col-span-2")}
              {...post}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
