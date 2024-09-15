"use client";

import { GithubIcon, GoogleIcon } from "@/components/atoms/icon";
import { Button } from "@/components/atoms/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atoms/ui/form";
import { Input } from "@/components/atoms/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signUpSchema } from "./schema";

export default function SignInForm() {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof signUpSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 lg:space-y-8"
      >
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="johnn_doe12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your@mail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
          <div className="flex items-center gap-4 max-2xl:flex-wrap">
            <Button
              type="button"
              className="flex w-full items-center gap-x-2"
              variant={"secondary"}
            >
              <GoogleIcon className="size-6" />
              <span>Sign Up with Google</span>
            </Button>
            <Button
              type="button"
              className="flex w-full items-center gap-x-2"
              variant={"secondary"}
            >
              <GithubIcon className="size-6" />
              <span>Sign Up with Github</span>
            </Button>
          </div>
        </div>

        <p className="mt-4 text-center text-sm">
          Already Have an Account?{" "}
          <Link href={"/auth/sign-in"} className="underline">
            Log In Here!
          </Link>
        </p>
      </form>
    </Form>
  );
}
