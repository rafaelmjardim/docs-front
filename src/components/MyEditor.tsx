import { Editor, EditorContent } from "@tiptap/react";
import { Bold, Italic } from "lucide-react";

type MyEditorProps = {
  editor: Editor | null;
  isEditable?: boolean;
};

export function MyEditor({ editor, isEditable }: MyEditorProps) {
  const toolbarButtons = [
    { icon: Bold, label: "Bold", action: () => alert("em desenvolvimento") },
    { icon: Italic, label: "Italico", action: () => "" },
  ];

  return (
    <div
      className={`rounded-md px-4 ${
        isEditable ? "border  pt-4 border-gray-300" : ""
      }`}
    >
      {isEditable && (
        <div className="flex items-center gap-1">
          {toolbarButtons.map((item, index) => (
            <button
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              key={index}
              onClick={item.action}
              title={item.label}
            >
              <item.icon className="w-4 h-4"></item.icon>
            </button>
          ))}
        </div>
      )}
      <EditorContent
        editor={editor}
        className="prose rounded-md px-8 w-full max-w-[60rem] "
      />
    </div>
  );
}
