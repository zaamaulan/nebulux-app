import dynamic from "next/dynamic";
import Container from "../templates/container";
import { Button } from "../atoms/ui/button";
import PublishButton from "../molecules/publish-button";

const TextEditor = dynamic(
  () => import("../molecules/text-editor/text-editor"),
  { ssr: false },
);

export default function WritePost() {
  return (
    <section>
      <Container className="relative">
        <TextEditor />
        <PublishButton className="fixed bottom-6 left-1/2 -translate-x-1/2 md:hidden" />
      </Container>
    </section>
  );
}
