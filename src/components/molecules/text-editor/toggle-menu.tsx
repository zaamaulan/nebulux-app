import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/atoms/ui/toggle-group";
import { cn } from "@/lib/utils/cn";
import type { Editor } from "@tiptap/react";
import {
  Heading01Icon,
  Heading02Icon,
  ImageIcon,
  LeftToRightListBulletIcon,
  LeftToRightListNumberIcon,
  LinkIcon,
  QuoteDownIcon,
  SourceCodeIcon,
  TextBoldIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
  TextUnderlineIcon,
} from "../../atoms/icon";
import { Toggle } from "../../atoms/ui/toggle";

interface ToggleMenuProps {
  editor: Editor | null;
  className?: string;
}

export default function ToggleMenu({ editor, className }: ToggleMenuProps) {
  if (!editor) {
    return null;
  }
  return (
    <div
      className={cn(
        className,
        "flex flex-wrap gap-1 rounded-xl border border-input bg-white p-1",
      )}
    >
      <ToggleGroup type="single" className="min-w-fit">
        <ToggleGroupItem
          value="heading1"
          size={"sm"}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <Heading01Icon />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="heading2"
          size={"sm"}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading02Icon />
        </ToggleGroupItem>
      </ToggleGroup>

      {/* <Separator orientation="vertical" className="my-auto h-8" /> */}

      <Toggle
        size={"sm"}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <TextBoldIcon />
      </Toggle>
      <Toggle
        size={"sm"}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <TextItalicIcon />
      </Toggle>
      <Toggle
        size={"sm"}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <TextUnderlineIcon />
      </Toggle>
      <Toggle
        size={"sm"}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <TextStrikethroughIcon />
      </Toggle>

      {/* <Separator orientation="vertical" className="my-auto h-8" /> */}

      <Toggle
        size={"sm"}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <LinkIcon />
      </Toggle>
      <Toggle
        size={"sm"}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <QuoteDownIcon />
      </Toggle>
      <Toggle
        size={"sm"}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <SourceCodeIcon />
      </Toggle>
      <Toggle
        size={"sm"}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ImageIcon />
      </Toggle>

      {/* <Separator orientation="vertical" className="my-auto h-8" /> */}

      <Toggle
        size={"sm"}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <LeftToRightListBulletIcon />
      </Toggle>
      <Toggle
        size={"sm"}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <LeftToRightListNumberIcon />
      </Toggle>
    </div>
  );
}
