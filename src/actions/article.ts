"use server";

import db from "@/services/db";

export const addStar = async (articleId: string) => {
  try {
    await db.article.update({
      where: { id: articleId },
      data: {
        stars: {
          increment: 1,
        },
      },
      select: { stars: true },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
