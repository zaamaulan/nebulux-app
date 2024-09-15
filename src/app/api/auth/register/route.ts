import { userSchema } from "@/lib/schema";
import db from "@/services/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const validatedData = await userSchema.safeParseAsync(body);
    if (!validatedData.success) {
      return NextResponse.json({ error: "Invalid user data" }, { status: 400 });
    }

    const { email, password, name, username } = validatedData.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        ...validatedData.data,
        password: hashedPassword,
      },
      omit: {
        password: true,
      },
    });
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "User already exists" },
          { status: 409 },
        );
      }
    }
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
};
