import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import Highlight from "@tiptap/extension-highlight";
import Button from "./Button";
import { initialDoc } from "../constants/initialDoc";
import { useEffect, useState } from "react";
import type { Doc, Mode } from "../types/docs";
import Input from "./Input";
import { File, Pencil, Save } from "lucide-react";

type EditorProp = {
  onSetTree: (doc: Doc) => void;
  selectedDoc: Doc | null;
  mode: Mode;
  onChangeMode: (mode: Mode) => void;
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
    editable: mode === "edit",
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

    if (selectedDoc) {
      setForm({ title: selectedDoc.title, path: selectedDoc.path });
    }
  }, [selectedDoc, editor]);

  useEffect(() => {
    editor.setEditable(mode === "view" ? false : true);
  }, [mode, editor]);

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

  const handleNewPage = () => {
    onChangeMode("create");
    setForm({ title: "", path: "" });
    editor.commands.setContent("");
  };

  return (
    <div className="flex flex-col gap-2 mx-6 my-4 w-full transition-all">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center justify-end gap-2 w-full">
          {mode === "edit" && (
            <Button
              className="bg-transparent text-slate-700 border border-slate-500 hover:bg-slate-100"
              onClick={() => {
                onChangeMode("view");
              }}
            >
              Cancelar
            </Button>
          )}
          <Button
            className="bg-slate-600 hover:bg-slate-700"
            onClick={() => {
              if (mode === "view") onChangeMode("edit");
              if (mode === "edit") handleSaveDoc();
            }}
          >
            {mode == "view" ? (
              <Pencil size={16} strokeWidth={1.8} />
            ) : (
              <Save size={16} strokeWidth={1.8} />
            )}
            {mode == "view" ? "Editar" : "Salvar"}
          </Button>

          {mode === "view" && (
            <Button
              className="bg-slate-600 hover:bg-slate-700"
              onClick={handleNewPage}
            >
              <File size={16}></File>
              Nova página
            </Button>
          )}
        </div>
      </div>
      {mode === "edit" ? (
        <>
          <Input
            label="Título"
            placeholder="Títiulo"
            name="title"
            value={form.title}
            onChange={handleChangeInput}
          ></Input>
          <Input
            label="Path"
            placeholder="Ex: home/projeto-x/front-end/components/card-component "
            name="path"
            value={form.path}
            onChange={handleChangeInput}
          ></Input>
          <p className="text-xs text-gray-500">
            Use / para criar hierarquia (ex: home/projeto/frontend)
          </p>
          <EditorContent
            editor={editor}
            className="prose border mt-4 pt-6 border-gray-300 rounded-md px-8 w-full max-w-full "
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
