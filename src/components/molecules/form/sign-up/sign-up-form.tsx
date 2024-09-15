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
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signUpSchema } from "./schema";

export default function SignInForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    try {
      await axios.post("/api/auth/register", data);
      router.push("/auth/sign-in");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          return toast({
            title: "User already exists",
            description: "Please try again with another username or email.",
            variant: "destructive",
          });
        } else if (error.response?.status === 400) {
          return toast({
            title: "Invalid credentials",
            description: "Please double-check your email and password.",
            variant: "destructive",
          });
        } else {
          return toast({
            title: "Error",
            description:
              "An unexpected error occurred. Please try again later.",
            variant: "destructive",
          });
        }
      } else {
        return toast({
          title: "Error",
          description:
            "An unexpected error occurred. Please check your connection or try again later.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 lg:space-y-8"
      >
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
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
