import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  username: z.string().min(1, { message: "Username is required" }),
});

export const articleSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  // description: z.string().min(1, { message: "Description is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  slug: z.string().min(1, { message: "Slug is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  authorId: z.string().min(1, { message: "Author is required" }),
})