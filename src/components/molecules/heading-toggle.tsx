"use client";

import { Heading01Icon, Heading02Icon, Heading03Icon } from "../atoms/icon";
import { Editor } from "@tiptap/react";

interface HeadingAction {
  name: string;
  action: (editor: Editor) => void;
  icon: JSX.Element;
}

const headingOptions: HeadingAction[] = [
  {
    name: "h1",
    action: (editor: Editor) =>
      editor.chain().focus().toggleHeading({ level: 1 }).run(),
    icon: <Heading01Icon />,
  },
  {
    name: "h2",
    action: (editor: Editor) =>
      editor.chain().focus().toggleHeading({ level: 2 }).run(),
    icon: <Heading02Icon />,
  },
  {
    name: "h3",
    action: (editor: Editor) =>
      editor.chain().focus().toggleHeading({ level: 3 }).run(),
    icon: <Heading03Icon />,
  },
];

interface HeadingToggleProps {
  editor: Editor; // props editor untuk digunakan dalam action
}

export default function HeadingToggle({ editor }: HeadingToggleProps) {
  return (
    <div className="heading-toggle">
      {headingOptions.map((option) => (
        <button
          key={option.name}
          onClick={() => option.action(editor)}
          className="heading-toggle-btn"
        >
          {option.icon}
        </button>
      ))}
    </div>
  );
}
