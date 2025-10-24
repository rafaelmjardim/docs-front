export type Doc = {
  id: string;
  title: string;
  path: string;
  content: string;
  format: "markdown";
  updated_at: string;
};

export type TreeNode = {
  name: string;
  path: string;
  children: TreeNode[];
  doc?: Doc;
};
