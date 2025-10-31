import { useEffect, useState } from "react";
import Editor from "./components/Editor";
import Header from "./components/Header";
import Nav from "./components/DocNav";
import type { Doc, Mode, TreeNode } from "./types/docs";
import { initialDocs } from "./lib/storage";
import { buildTree } from "./lib/tree-build";

function App() {
  const [docs, setDocs] = useState<Doc[]>(initialDocs);
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Doc | null>(null);
  const [mode, setMode] = useState<Mode>("view");

  useEffect(() => {
    loadDocs();
  }, []);

  useEffect(() => {
    if (mode === "create") {
      setSelectedDoc(null);
    }
  }, [mode, selectedDoc]);

  const handleSelectNode = (node: TreeNode) => {
    if (node.doc) {
      setSelectedDoc(node.doc);

      if (mode === "edit") {
        setMode("view");
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

  const setNewDoc = (data: Doc) => {
    const newDocList = docs;
    if (mode === "create") {
      newDocList.push(data);
      setDocs(newDocList);
      loadDocs();
    } else if (selectedDoc) {
      console.log("modo edicao");
      const updated = updateDoc(selectedDoc.id, data);
      if (updated) {
        setSelectedDoc(updated);
      }
    }
  };

  const handleSetEditMod = (newMode: Mode) => {
    setMode(newMode);
  };

  const updateDoc = (id: string, updates: Partial<Document>): Doc | null => {
    const index = docs.findIndex((d) => d.id === id);
    if (index === -1) return null;

    docs[index] = {
      ...docs[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    return docs[index];
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
            onCancel={(idLastDoc) => {
              if (idLastDoc) {
                const index = Number(idLastDoc) - 1;
                setSelectedDoc(docs[index]);
              }
            }}
            mode={mode}
          />
        </main>
      </div>
    </>
  );
}

export default App;
