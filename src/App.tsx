import { useState } from "react";
import Editor from "./components/Editor";
import Header from "./components/Header";
import Nav from "./components/DocNav";
import type { Doc } from "./types/docs";

function App() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [currentDocIndex, setCurrentDocIndex] = useState<number | null>(null);

  const handleSetDoc = (newDoc: Doc) => {
    const docsList = [...docs, newDoc];
    setDocs(docsList);
  };

  return (
    <>
      <div className="h-full">
        <Header />
        <main className="flex h-screen">
          <Nav docs={docs} onCurrentDocIndex={setCurrentDocIndex} />
          <Editor
            onSetDoc={handleSetDoc}
            currentDoc={currentDocIndex !== null ? docs[currentDocIndex] : null}
          />
        </main>
      </div>
    </>
  );
}

export default App;
