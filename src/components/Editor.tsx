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
  const [form, setForm] = useState({ title: "", path: "" });
  const [content, setContent] = useState<string>(initialDoc);

  const editor = useEditor({
    extensions: [StarterKit, Highlight, Typography],
    content,
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
  });

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (editor && currentDoc) {
      editor.commands.setContent(currentDoc.content);
      setContent(currentDoc.content);
    }
  }, [currentDoc, editor]);

  const handleSetDoc = () => {
    const doc: Doc = {
      id: "",
      title: form.title,
      path: form.path,
      format: "markdown",
      updated_at: new Date().toString(),
      content: editor.getHTML(),
    };

    return doc;
  };

  return (
    <div className="flex flex-col gap-2 mx-6 my-4">
      <Input
        label="Título"
        placeholder="Títiulo"
        name="title"
        onChange={handleChangeInput}
      ></Input>
      <Input
        label="Path"
        placeholder="Ex: home/projeto-x/front-end/components/card-component "
        name="path"
        onChange={handleChangeInput}
      ></Input>
      <p className="text-xs text-gray-500">
        Use / para criar hierarquia (ex: home/projeto/frontend)
      </p>
      <EditorContent
        editor={editor}
        className="prose border mt-4 border-gray-300 rounded-md px-8 w-full max-w-full"
      />
      <Button onClick={() => onSetDoc(handleSetDoc())}>Salvar</Button>
    </div>
  );
}
