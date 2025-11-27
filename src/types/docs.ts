export type Doc = {
  id: string;
  title: string;
  path: string;
  content: string;
  category: string;
  format: "markdown";
  updated_at: string;
};

export type TreeNodeGroup = {
  category: string;
  items: TreeNode[];
};

export type TreeNode = {
  name: string;
  path: string;
  children: TreeNode[];
  doc?: Doc;
};

export type Mode = "view" | "edit" | "create";
