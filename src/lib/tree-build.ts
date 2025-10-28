import type { Doc, TreeNode } from "../types/docs";

export function buildTree(documents: Doc[]): TreeNode[] {
  const root: TreeNode[] = [];
  const nodeMap = new Map<string, TreeNode>();

  // Ordenar documentos por path
  // const sortedDocs = [...documents].sort((a, b) =>
  //   a.path.localeCompare(b.path)
  // );

  // Ordenar documentos por id
  const sortedDocs = [...documents].sort((a, b) => a.id.localeCompare(b.id));

  sortedDocs.forEach((doc) => {
    const parts = doc.path.split("/");
    let currentPath = "";

    parts.forEach((part) => {
      const parentPath = currentPath;
      currentPath = currentPath ? `${currentPath}/${part}` : part;

      if (!nodeMap.has(currentPath)) {
        const node: TreeNode = {
          name: part,
          path: currentPath,
          children: [],
          doc: currentPath === doc.path ? doc : undefined,
        };

        nodeMap.set(currentPath, node);

        if (parentPath) {
          const parent = nodeMap.get(parentPath);
          if (parent) {
            parent.children.push(node);
          }
        } else {
          root.push(node);
        }
      } else if (currentPath === doc.path) {
        const node = nodeMap.get(currentPath);
        if (node) {
          node.doc = doc;
        }
      }
    });
  });

  return root;
}
