import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Italic,
  List,
  Redo,
  TextAlignCenter,
  TextAlignEnd,
  TextAlignStart,
  Undo,
  type LucideProps,
} from "lucide-react";

interface ToolbarButton {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
  label: string;
  action: () => void;
  hasSeparator?: boolean;
}

export function Toolbar() {
  const toolbarButtons: ToolbarButton[] = [
    { icon: Undo, label: "Desfazer", action: () => "" },
    { icon: Redo, label: "Refazer", action: () => "", hasSeparator: true },
    {
      icon: Heading1,
      label: "Heading 1",
      action: () => "",
    },
    {
      icon: Heading2,
      label: "Heading 2",
      action: () => "",
    },
    {
      icon: List,
      label: "Lista",
      action: () => "",
    },
    {
      icon: Code,
      label: "Bloco de código",
      action: () => "",
      hasSeparator: true,
    },
    { icon: Bold, label: "Bold", action: () => alert("em desenvolvimento") },
    { icon: Italic, label: "Italico", action: () => "", hasSeparator: true },
    { icon: TextAlignStart, label: "Alinhar no inicio", action: () => "" },
    { icon: TextAlignCenter, label: "Alinhar ao centro", action: () => "" },
    { icon: TextAlignEnd, label: "Alinhar no fim", action: () => "" },
  ];

  return (
    <div className="flex jus gap-1 mb-3 pb-2 border-b w-full ">
      {toolbarButtons.map((item, index) => (
        <div className="flex items-center">
          <button
            className="p-2 text-gray-600 rounded-md hover:bg-slate-100 transition-colors  border-gray-200"
            key={index}
            onClick={item.action}
            title={item.label}
          >
            <item.icon className="w-4 h-4"></item.icon>
          </button>

          {item.hasSeparator && (
            <span className=" h-full w-[1px] mx-[4px] bg-gray-200"></span>
          )}
        </div>
      ))}
    </div>
  );
}
