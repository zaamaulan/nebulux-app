"use server";

import db from "@/services/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { z, ZodError } from "zod";

const registerUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
  username: z.string(),
});

export const registerUser = async (
  data: z.infer<typeof registerUserSchema>,
) => {
  try {
    const validatedData = await registerUserSchema.safeParseAsync(data);

    if (!validatedData.success) {
      return null;
    }

    const user = await db.user.create({ data: validatedData.data });

    return user;
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error("Invalid user data");
    }
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error("User already exists");
      }
    }
    throw new Error("Failed to register user");
  }
};
