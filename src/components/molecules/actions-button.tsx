import { cn } from "@/lib/utils/cn";
import SaveAction from "./save-action";
import ShareAction from "./share-action";
import StarAction from "./star-action";
import { Article } from "@prisma/client";

interface ActionsButtonProps {
  className?: string;
  data: Article;
}

export default function ActionsButton({ data, className }: ActionsButtonProps) {
  return (
    <div
      className={cn(
        className,
        "mt-10 flex flex-wrap items-center gap-x-4 gap-y-2",
      )}
    >
      <StarAction data={data} />

      {/* <Button
          className="flex items-center gap-x-2 rounded-full !p-2.5"
          variant={"ghost"}
        >
          <BubbleChatIcon className="size-5" />
          <span className="max-md:hidden">Comment</span>
        </Button> */}
      <ShareAction />
      <SaveAction data={data} />
    </div>
  );
}
