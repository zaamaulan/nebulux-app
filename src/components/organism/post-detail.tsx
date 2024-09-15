import { format } from "date-fns";
import Image from "next/image";
import Container from "../templates/container";
import { Article } from "@prisma/client";
import { ArrowLeft } from "lucide-react";
import { Badge } from "../atoms/ui/badge";
import { Button } from "../atoms/ui/button";
import { Separator } from "../atoms/ui/separator";
import ActionsButton from "../molecules/actions-button";

interface PostDetailProps {
  data: Article | null;
}

export default function PostDetail({ data }: PostDetailProps) {
  if (!data) {
    return null;
  }

  return (
    <section className="my-10 space-y-10">
      <Button
        backButton
        className="flex items-center gap-x-2 rounded-full !py-2 max-md:hidden lg:ml-20"
        variant={"ghost"}
      >
        <ArrowLeft className="size-5" />
        <span>Back</span>
      </Button>
      <Container>
        <article className="flex flex-col">
          <div className="mb-6">
            <p className="text-center text-zinc-600">
              Published {format(new Date(), "PPP")}
            </p>

            <h1 className="mt-4 text-center text-4xl font-bold leading-tight">
              {data.title}
            </h1>
            {/* {data.description && (
              <p className="mx-auto mt-2 text-center text-zinc-600 md:w-3/4">
                {data.description}
              </p>
            )} */}
            <p className="mx-auto mt-2 text-center text-zinc-600 md:w-3/4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
              velit veritatis vel nisi sequi ad exercitationem cumque ab, nulla
              quos.
            </p>
            <Badge
              variant={"secondary"}
              className="mx-auto mt-4 flex w-fit justify-center !py-2 text-center capitalize"
            >
              {data.category}
            </Badge>
          </div>

          <div className="relative aspect-[4/5] md:aspect-[16/8]">
            <Image
              src={"/images/3.jpg"}
              alt={data.title}
              fill
              className="rounded-xl object-cover"
            />
          </div>
          <div
            className="markdown mx-auto md:w-3/4"
            dangerouslySetInnerHTML={{ __html: data.content }}
          >
            {/* <p>{data.content}</p> */}
          </div>
        </article>

        <ActionsButton data={data} />
      </Container>
      <Separator />
      <section>
        <Container>
          <h2 className="text-3xl font-semibold">More Article</h2>
          <p className="mb-6 mt-2 text-zinc-600">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Repudiandae, vero?
          </p>
        </Container>
        {/* <PostList withoutCategory withoutFeatured take={4} /> */}
      </section>
    </section>
  );
}
