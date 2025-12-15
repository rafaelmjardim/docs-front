import { useEffect, useState } from "react";
import Header from "./components/Header";
import Nav from "./components/DocNav";
import type { Doc, Mode, TreeNode, TreeNodeGroup } from "./types/docs";
import { initialDocs } from "./lib/storage";
import { buildTreeByCategory } from "./lib/build-tree-category";
import MainView from "./components/MainView";

function App() {
  const [docs, setDocs] = useState<Doc[]>(initialDocs);
  const [treeGroup, setTreeGroup] = useState<TreeNodeGroup[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Doc | null>(null);
  const [mode, setMode] = useState<Mode>("view");

  useEffect(() => {
    // const fetchTeste = async () => {
    //   try {
    //     const res = await axios.get(import.meta.env.VITE_API_URL);
    //     console.log(res.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // fetchTeste();

    loadDocs();
  }, [docs]);

  useEffect(() => {
    if (mode === "create") {
      setSelectedDoc(null);
    }
  }, [mode, selectedDoc]);

  const handleSelectNode = (node: TreeNode) => {
    if (node.doc) {
      setSelectedDoc(node.doc);

      if (mode !== "view") {
        setMode("view");
      }
    }
  };

  const loadDocs = () => {
    const docList = docs;
    setDocs(docList);
    setTreeGroup(buildTreeByCategory(docs));

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
      updateDoc(data);
    }
  };

  const handleSetEditMod = (newMode: Mode) => {
    setMode(newMode);
  };

  const updateDoc = (docUpdated: Doc) => {
    const docsUpdated = docs.map((doc) =>
      doc.id == selectedDoc?.id ? { ...doc, ...docUpdated } : doc
    );

    setDocs(docsUpdated);
  };

  return (
    <div className="block">
      <Header />
      <main className="flex">
        <Nav
          treeGroup={treeGroup}
          onSelect={handleSelectNode}
          selectedPath={selectedDoc?.path}
        />
        <MainView
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
  );
}

export default App;
