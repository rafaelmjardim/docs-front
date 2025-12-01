import type { Doc, TreeNodeGroup } from "../types/docs";
import { buildTree } from "./build-tree";

export function buildTreeByCategory(docs: Doc[]): TreeNodeGroup[] {
  const groups = new Map<string, Doc[]>();

  docs.forEach((doc) => {
    const category = doc.category ?? "Outros";

    if (!groups.has(category)) {
      groups.set(category, []);
    }

    groups.get(category)!.push(doc);
  });

  const result: TreeNodeGroup[] = [];

  groups.forEach((docs, category) => {
    result.push({
      category,
      items: buildTree(docs),
    });
  });

  return result;
}
