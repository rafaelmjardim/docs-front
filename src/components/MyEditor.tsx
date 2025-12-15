import { Editor, EditorContent } from "@tiptap/react";
import { Toolbar } from "./Toolbar";

type MyEditorProps = {
  editor: Editor;
  isEditable?: boolean;
};

export function MyEditor({ editor, isEditable }: MyEditorProps) {
  return (
    <div
      data-editable={isEditable}
      className="rounded-md data-[editable=true]:border data-[editable=true]:border-gray-300 data-[editable=true]:h-[85vh] overflow-y-auto"
    >
      {isEditable && (
        <div className="flex items-center gap-1 sticky top-0 z-10">
          <Toolbar editor={editor} />
        </div>
      )}
      <EditorContent
        editor={editor}
        className="prose rounded-md px-10 w-full max-w-[60rem]"
      />
    </div>
  );
}
