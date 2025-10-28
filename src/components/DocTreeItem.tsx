import { useState } from "react";
import type { TreeNode } from "../types/docs";
import { DocTree } from "./DocTree";
interface DocTreeProps {
  node: TreeNode;
  onSelect: (node: TreeNode) => void;
  selectedPath?: string;
  level: number;
}

export default function TreeNodeItem({ node, onSelect, level }: DocTreeProps) {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = node.children.length > 0;

  return (
    <div>
      <button
        key={node.path}
        onClick={() => {
          if (hasChildren) {
            setIsOpen(!isOpen);
          }
          if (node.doc) {
            onSelect(node);
          }
        }}
      >
        {node.name}
      </button>

      {hasChildren && isOpen && (
        <DocTree
          nodes={node.children}
          onSelect={onSelect}
          level={level + 1}
        ></DocTree>
      )}
    </div>
  );
}
