import { Editor, EditorContent } from "@tiptap/react";
import { Toolbar } from "./Toolbar";

type MyEditorProps = {
  editor: Editor | null;
  isEditable?: boolean;
};

export function MyEditor({ editor, isEditable }: MyEditorProps) {
  return (
    <div
      className={`rounded-md px-4 ${
        isEditable ? "border  pt-4 border-gray-300" : ""
      }`}
    >
      {isEditable && (
        <div className="flex items-center gap-1">
          <Toolbar
            editor={editor}
            onChangeBold={() => editor?.chain().focus().toggleBold().run()}
          />
        </div>
      )}
      <EditorContent
        editor={editor}
        className="prose rounded-md px-10 w-full max-w-[60rem] "
      />
    </div>
  );
}
