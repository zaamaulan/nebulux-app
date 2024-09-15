import { z } from "zod";

export const signUpSchema = z
  .object({
    full_name: z
      .string({ required_error: "Full name is required" })
      .min(1, "Full name is required"),
    username: z
      .string({ required_error: "Username is required" })
      .min(1, "Username is required")
      .min(3, "Username must be at least 3 characters long"),
    email: z
      .string({ required_error: "Email is required" })
      .min(1, "Email is required")
      .email(),
    password: z
      .string({ required_error: "Password is required" })
      .min(1, "Password is required"),
    confirmPassword: z
      .string({ required_error: "Confirm password is required" })
      .min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
