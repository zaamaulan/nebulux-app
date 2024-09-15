"use client";

import React, {
  ChangeEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import { Button } from "@/components/atoms/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atoms/ui/form";
import { Input } from "@/components/atoms/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { publishSchema } from "./schema";
import { ImageAddIcon } from "@/components/atoms/icon";
import { Textarea } from "@/components/atoms/ui/textarea";
import Image from "next/image";
import { X } from "lucide-react";

export default function PublishForm({ children }: { children: ReactNode }) {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  console.log(selectedFile);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    console.log(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    console.log("file", e.target.files);

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  const form = useForm<z.infer<typeof publishSchema>>({
    resolver: zodResolver(publishSchema),
  });

  function onSubmit(values: z.infer<typeof publishSchema>) {
    console.log(values);
  }

  function removeFile() {
    setSelectedFile(undefined);
    setPreview(undefined);

    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input programmatically
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4 md:gap-6">
          <div>
            <div className="relative aspect-video">
              {preview && (
                <>
                  <Image
                    src={preview}
                    alt="preview"
                    fill={true}
                    className="rounded-xl object-cover object-center"
                    priority
                  />
                  <Button
                    variant="secondary"
                    onClick={removeFile}
                    className="absolute right-2 top-2 z-10 aspect-square rounded-full p-1 md:p-2 size-fit"
                  >
                    <X className="size-4 w-fit" />
                  </Button>
                </>
              )}
              {!preview && (
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="absolute flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl bg-gray-100">
                        <ImageAddIcon />
                        <span className="h-[3em] max-w-60 text-center leading-normal text-zinc-600">
                          Add a cover image to make your post stand out
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={""}
                          ref={fileInputRef}
                          accept="image/*"
                          type="file"
                          className="hidden"
                          onChangeCapture={onSelectFile}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Title</FormLabel>
                  <FormControl>
                    <Textarea
                      className="hide-scrollbar h-[3em] resize-none rounded-none border-b !text-base font-semibold"
                      placeholder="Write a preview title..."
                      maxLength={100}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Subtitle</FormLabel>
                  <FormControl>
                    <Textarea
                      className="hide-scrollbar resize-none rounded-none border-b text-sm text-zinc-600"
                      placeholder="Write a preview subtitle..."
                      maxLength={140}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <div>
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Tag</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none rounded-none border-b text-sm text-zinc-600"
                      placeholder="Add or change tags (up to 5) to let readers know what your post is about"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="mt-4 text-sm text-zinc-600 max-lg:text-center">
              Publishing to: <span className="font-semibold">{"johndoe"}</span>
            </p>
          </div> */}
        </div>
        {children}
      </form>
    </Form>
  );
}
