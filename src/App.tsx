import { useEffect, useState } from "react";
import Editor from "./components/Editor";
import Header from "./components/Header";
import Nav from "./components/DocNav";
import type { Doc, TreeNode } from "./types/docs";
import { initialDocs } from "./lib/storage";
import { buildTree } from "./lib/tree-build";

function App() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [currentDocIndex, setCurrentDocIndex] = useState<number | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<Doc | null>(null);

  useEffect(() => {
    loadDocs();
  }, []);

  const handleSelectNode = (node: TreeNode) => {
    if (node.doc) {
      setSelectedDoc(node.doc);
      console.log("selected Doc", selectedDoc);
    }
  };

  const loadDocs = () => {
    const docs = getDocs();
    setDocs(docs);
    setTree(buildTree(docs));

    if (!selectedDoc && docs.length > 0) {
      setSelectedDoc(docs[0]);
    }
  };

  const getDocs = () => {
    return initialDocs;
  };

  return (
    <>
      <div className="h-full">
        <Header />
        <main className="flex h-screen">
          <Nav
            nodes={tree}
            onSelect={handleSelectNode}
            onCurrentDocIndex={setCurrentDocIndex}
          />
          <Editor
            onSetTree={handleSelectNode}
            currentDoc={currentDocIndex !== null ? docs[currentDocIndex] : null}
          />
        </main>
      </div>
    </>
  );
}

export default App;
