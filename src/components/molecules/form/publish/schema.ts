import { z } from "zod";

export const publishSchema = z.object({
  file: z
    .any()
    .refine((file) => file?.[0]?.type.startsWith("image/"), {
      message: "File must be an image (jpeg or png).",
    })
    .refine((file) => file?.[0]?.size <= 5000000, {
      message: "File size must be less than 5MB.",
    }),
  title: z
    .string({ required_error: "Title is required." })
    .min(1, { message: "Title is required." }),
  subtitle: z
    .string({ required_error: "Subtitle is required." })
    .min(1, { message: "Subtitle is required." }),
  tags: z.preprocess(
    (input) =>
      typeof input === "string"
        ? input.split(",").map((tag) => tag.trim())
        : [],
    z
      .array(z.string({ required_error: "Tag is required." }))
      .max(5, { message: "Max 5 tags." }),
  ).optional(),
  // .array(z.string({ required_error: "Tag is required." }))
  // .max(5, { message: "Max 5 tags." }),
});
