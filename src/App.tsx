import { useEffect, useState } from "react";
import Editor from "./components/Editor";
import Header from "./components/Header";
import Nav from "./components/DocNav";
import type { Doc, EditMode, TreeNode } from "./types/docs";
import { initialDocs } from "./lib/storage";
import { buildTree } from "./lib/tree-build";

function App() {
  const [docs, setDocs] = useState<Doc[]>(initialDocs);
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Doc | null>(null);
  const [editMode, setEditMode] = useState<EditMode>("view");

  useEffect(() => {
    loadDocs();
  }, []);

  const handleSelectNode = (node: TreeNode) => {
    if (node.doc) {
      setSelectedDoc(node.doc);

      if (editMode === "edit") {
        setEditMode("view");
      }
    }
  };

  const loadDocs = () => {
    const docList = docs;
    setDocs(docList);
    setTree(buildTree(docs));

    if (!selectedDoc && docs.length > 0) {
      setSelectedDoc(docs[0]);
    }
  };

  const setNewDoc = (doc: Doc) => {
    const newDocList = docs;
    newDocList.push(doc);
    setDocs(newDocList);
    loadDocs();
  };

  const handleSetEditMod = (mode: EditMode) => {
    setEditMode(mode);
  };

  return (
    <>
      <div className="h-full">
        <Header />
        <main className="flex h-screen">
          <Nav
            nodes={tree}
            onSelect={handleSelectNode}
            selectedPath={selectedDoc?.path}
          />
          <Editor
            onSetTree={setNewDoc}
            selectedDoc={selectedDoc}
            onChangeMode={handleSetEditMod}
            mode={editMode}
          />
        </main>
      </div>
    </>
  );
}

export default App;
