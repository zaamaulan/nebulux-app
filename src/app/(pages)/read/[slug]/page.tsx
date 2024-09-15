import PostDetail from "@/components/organism/post-detail";
import Layout from "@/components/templates/layout";
import db from "@/services/db";
import React from "react";

export default async function PostDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const article = await db.article.findUnique({
    where: { slug },
  });

  return (
    <Layout>
      <PostDetail data={article} />
    </Layout>
  );
}
