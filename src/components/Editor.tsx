import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import Highlight from "@tiptap/extension-highlight";
import Button from "./Button";
import { initialDoc } from "../constants/initialDoc";
import { useEffect, useState } from "react";
import type { Doc, EditMode } from "../types/docs";
import Input from "./Input";
import { Pencil, Save } from "lucide-react";

type EditorProp = {
  onSetTree: (doc: Doc) => void;
  selectedDoc: Doc | null;
  mode: EditMode;
  onChangeMode: (mode: EditMode) => void;
};

export default function Editor({
  onSetTree,
  selectedDoc,
  mode,
  onChangeMode,
}: EditorProp) {
  const [form, setForm] = useState({ title: "", path: "" });
  const [content, setContent] = useState<string>(initialDoc);

  const editor = useEditor({
    extensions: [StarterKit, Highlight, Typography],
    content,
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-[30rem] ",
      },
    },
  });

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (editor && selectedDoc) {
      editor.commands.setContent(selectedDoc.content);
      setContent(selectedDoc.content);
    }
  }, [selectedDoc, editor]);

  const handleSaveDoc = () => {
    const doc: Doc = {
      id: "",
      title: form.title,
      path: form.path,
      format: "markdown",
      updated_at: new Date().toString(),
      content: editor.getHTML(),
    };
    onChangeMode("view");
    onSetTree(doc);
  };

  return (
    <div className="flex flex-col gap-2 mx-6 my-4 w-full transition-all">
      <div className="w-full flex justify-end">
        <Button
          className="bg-slate-600 hover:bg-slate-700"
          onClick={() => {
            if (mode === "view") onChangeMode("edit");
            if (mode === "edit") handleSaveDoc();
          }}
        >
          {mode == "view" ? (
            <Pencil size={15} strokeWidth={1.8} />
          ) : (
            <Save size={15} strokeWidth={1.8} />
          )}
          {mode == "view" ? "Editar" : "Salvar"}
        </Button>
      </div>
      {mode === "edit" ? (
        <>
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
            className="prose border mt-4 border-gray-300 rounded-md px-8 w-full max-w-full "
          />
        </>
      ) : (
        <EditorContent
          editor={editor}
          className="prose rounded-md px-8 w-full max-w-[60rem] "
        />
      )}
    </div>
  );
}
