import type { TreeNode, TreeNodeGroup } from "../types/docs";
import { DocTree } from "./DocTree";

type NavProps = {
  treeGroup: TreeNodeGroup[];
  onSelect: (node: TreeNode) => void;
  selectedPath?: string;
};

export default function Nav({ treeGroup, onSelect, selectedPath }: NavProps) {
  return (
    <nav className="w-72 h-full p-4 bg-slate-50 border-r border-gray-200">
      <ul className="flex flex-col gap-3">
        {treeGroup.map((category, index) => (
          <div key={index}>
            <h1>{category.category}</h1>
            <DocTree
              nodes={category.items}
              onSelect={onSelect}
              selectedPath={selectedPath}
            ></DocTree>
          </div>
        ))}
      </ul>
    </nav>
  );
}
