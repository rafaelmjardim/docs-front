import type { TreeNode } from "../types/docs";
import DocTreeItem from "./DocTreeItem";

interface DocTreeProps {
  nodes: TreeNode[];
  onSelect: (node: TreeNode) => void;
  selectedPath?: string;
  level?: number;
}

export function DocTree({ nodes, onSelect, level = 1 }: DocTreeProps) {
  return (
    <div>
      {nodes.map((node) => (
        <DocTreeItem
          key={node.path}
          node={node}
          onSelect={onSelect}
          level={level}
        ></DocTreeItem>
      ))}
    </div>
  );
}
