import type { TreeNode } from "../types/docs";
import { DocTree } from "./DocTree";

type NavProps = {
  nodes: TreeNode[];
  onSelect: (node: TreeNode) => void;
  onCurrentDocIndex?: (index: number) => void;
};

export default function Nav({ nodes, onSelect }: NavProps) {
  return (
    <nav className="w-72 h-full p-4 bg-slate-50 border-r border-gray-200">
      <ul className="flex flex-col gap-3">
        <DocTree nodes={nodes} onSelect={onSelect}></DocTree>
      </ul>
    </nav>
  );
}
