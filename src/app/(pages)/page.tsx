import HomeHero from "@/components/organism/home-hero";
import PostList from "@/components/organism/post-list";
import Layout from "@/components/templates/layout";
import db from "@/services/db";

export default async function HomePage() {
  const articles = await db.article.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });


  return (
    <Layout>
      <HomeHero />
      <PostList data={articles} />
    </Layout>
  );
}
