import { articleSchema } from "@/lib/schema";
import { generateSlugWithShortUUID } from "@/lib/utils/slug";
import db from "@/services/db";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const GET = async () => {
  try {
    const response = await db.article.findMany();
    return NextResponse.json({ data: response }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred, please try again later" },
      { status: 500 },
    );
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const validatedData = await articleSchema.safeParseAsync(body);
    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Invalid article data" },
        { status: 400 },
      );
    }

    const { title } = validatedData.data;
    const slug = await generateSlugWithShortUUID(title);
    console.log(slug);

    const article = await db.article.create({
      data: {
        ...validatedData.data,
        slug: slug,
      },
    });
    return NextResponse.json({ data: article }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
};
