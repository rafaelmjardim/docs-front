import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import Highlight from "@tiptap/extension-highlight";
import Button from "./Button";
import { initialDoc } from "../constants/initialDoc";
import { useEffect, useState } from "react";
import type { Doc } from "../types/docs";
import Input from "./Input";

type EditorProp = {
  onSetDoc: (doc: Doc) => void;
  currentDoc: Doc | null;
};

export default function Editor({ onSetDoc, currentDoc }: EditorProp) {
  const [content, setContent] = useState<string>(initialDoc);

  const editor = useEditor({
    extensions: [StarterKit, Highlight, Typography],
    content,
  });

  useEffect(() => {
    if (editor && currentDoc) {
      editor.commands.setContent(currentDoc.content);
      setContent(currentDoc.content);
    }
  }, [currentDoc, editor]);

  const handleSetDoc = () => {
    const title = editor.getText().split("\n")[0];
    const doc: Doc = {
      id: "",
      title: title,
      path: "",
      format: "markdown",
      updated_at: new Date().toString(),
      content: editor.getHTML(),
    };

    return doc;
  };

  return (
    <div className="flex flex-col gap-3 mx-6 my-4">
      <Input label="Título" placeholder="Títiulo"></Input>
      <Input
        label="Path"
        placeholder="Ex: home/projeto-x/front-end/components/card-component "
      ></Input>
      <EditorContent className="prose" editor={editor} />
      <Button onClick={() => onSetDoc(handleSetDoc())}>Salvar</Button>
    </div>
  );
}
