import type { TreeNode, TreeNodeGroup } from "../types/docs";
import { DocTree } from "./DocTree";

type NavProps = {
  treeGroup: TreeNodeGroup[];
  onSelect: (node: TreeNode) => void;
  selectedPath?: string;
};

export default function Nav({ treeGroup, onSelect, selectedPath }: NavProps) {
  return (
    <nav className="min-w-[300px] w-[300px] h-full p-4 bg-white border-r border-gray-200">
      <ul className="flex flex-col gap-3">
        {treeGroup.map((category, index) => (
          <div key={index}>
            <h1 className="mt-3 mb-2 text-xs text-[#888] font-semibold">
              {category.category}
            </h1>
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
