"use client";

import Document from "@tiptap/extension-document";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { all, createLowlight } from "lowlight";
import ToggleMenu from "./toggle-menu";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";

//
const CustomDocument = Document.extend({
  content: "heading block*",
});

export default function TextEditor() {
  const editor = useEditor({
    extensions: [
      CustomDocument,
      StarterKit.configure({
        document: false,
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link,
      Underline,
      Highlight.configure({ multicolor: true }),
    ],
    editorProps: {
      attributes: {
        class: "text-editor",
      },
    },
    content: `
      <h1>Title</h1>
      <p>Tell your story...</p>
       `,
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="space-y-2 max-md:mb-10">
      <ToggleMenu editor={editor} />

      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <ToggleMenu editor={editor} />
      </BubbleMenu>

      <EditorContent editor={editor} />
    </div>
  );
}
