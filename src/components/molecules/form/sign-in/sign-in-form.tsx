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
import { signInSchema } from "./schema";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SignInForm() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl,
    });

    if (result?.error && result.error === "CredentialsSignin") {
      // toast({
      //   title: "Error Signing In",
      //   description: "An unexpected error occurred. Please try again later.",
      //   variant: "destructive",
      // });
      toast({
        title: "Invalid credentials",
        description: "Please double-check your email and password.",
        variant: "destructive",
      });
    } else {
      // router.push(callbackUrl); // <-- 1 BARIS JADI MASALAH DALAM 6 JAM, NGTT
      window.location.href = callbackUrl; // <-- 1 BARIS JADI SOLUSI UNTUK MASALAH 6 JAM
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

        <p className="mt-4 text-center text-sm underline">
          <Link href={"/"}>Forgot password? </Link>
        </p>

        <div className="space-y-4">
          <Button type="submit" className="w-full">
            Sign In
          </Button>
          <div className="flex items-center gap-4 max-2xl:flex-wrap">
            <Button
              type="button"
              className="flex w-full items-center gap-x-2"
              variant={"secondary"}
            >
              <GoogleIcon className="size-6" />
              <span>Sign In with Google</span>
            </Button>
            <Button
              type="button"
              className="flex w-full items-center gap-x-2"
              variant={"secondary"}
            >
              <GithubIcon className="size-6" />
              <span>Sign In with Github</span>
            </Button>
          </div>
        </div>

        <p className="mt-4 text-center text-sm">
          New Here?{" "}
          <Link href={"/auth/sign-up"} className="underline">
            Create Your Account!{" "}
          </Link>
        </p>
      </form>
    </Form>
  );
}
