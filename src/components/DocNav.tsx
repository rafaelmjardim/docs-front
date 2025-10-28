import type { TreeNode } from "../types/docs";
import { DocTree } from "./DocTree";

type NavProps = {
  nodes: TreeNode[];
  onSelect: (node: TreeNode) => void;
  selectedPath?: string;
};

export default function Nav({ nodes, onSelect, selectedPath }: NavProps) {
  return (
    <nav className="w-72 h-full p-4 bg-slate-50 border-r border-gray-200">
      <ul className="flex flex-col gap-3">
        <DocTree
          nodes={nodes}
          onSelect={onSelect}
          selectedPath={selectedPath}
        ></DocTree>
      </ul>
    </nav>
  );
}
