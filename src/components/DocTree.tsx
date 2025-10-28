import type { TreeNode } from "../types/docs";
import DocTreeItem from "./DocTreeItem";

interface DocTreeProps {
  nodes: TreeNode[];
  onSelect: (node: TreeNode) => void;
  selectedPath?: string;
  level?: number;
}

export function DocTree({
  nodes,
  onSelect,
  selectedPath,
  level = 0,
}: DocTreeProps) {
  return (
    <div className={`${level > 0 ? "ml-2" : ""}`}>
      {nodes.map((node) => (
        <DocTreeItem
          key={node.path}
          node={node}
          onSelect={onSelect}
          selectedPath={selectedPath}
          level={level}
        ></DocTreeItem>
      ))}
    </div>
  );
}
