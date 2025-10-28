import { useState } from "react";
import type { TreeNode } from "../types/docs";
import { DocTree } from "./DocTree";
import { ChevronRight } from "lucide-react";
interface DocTreeProps {
  node: TreeNode;
  onSelect: (node: TreeNode) => void;
  selectedPath?: string;
  level: number;
}

export default function TreeNodeItem({
  node,
  onSelect,
  selectedPath,
  level,
}: DocTreeProps) {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = node.children.length > 0;
  const isSelected = selectedPath === node.path;

  return (
    <div>
      <button
        className={`w-full flex items-center justify-between p-2 rounded-md mb-1 hover:bg-slate-200 ${
          isSelected ? "bg-slate-200" : ""
        }`}
        key={node.path}
        onClick={() => {
          if (hasChildren && isSelected) {
            setIsOpen(!isOpen);
          }
          if (node.doc) {
            onSelect(node);
          }
        }}
      >
        {node.name}

        {hasChildren && (
          <ChevronRight
            className={` transition ${isOpen ? "rotate-90" : ""}`}
            strokeWidth={1}
          />
        )}
      </button>

      {hasChildren && isOpen && (
        <DocTree
          nodes={node.children}
          onSelect={onSelect}
          selectedPath={selectedPath}
          level={level + 1}
        ></DocTree>
      )}
    </div>
  );
}
