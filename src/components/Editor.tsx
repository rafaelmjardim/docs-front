import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import Highlight from "@tiptap/extension-highlight";
import { initialDoc } from "../constants/initialDoc";
import { useEffect, useState } from "react";
import type { Doc } from "../types/docs";

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
      title: title,
      content: editor.getHTML(),
    };

    return doc;
  };

  return (
    <div className="m-16">
      <button onClick={() => onSetDoc(handleSetDoc())}>Salvar</button>

      <EditorContent className="prose" editor={editor} />
    </div>
  );
}
