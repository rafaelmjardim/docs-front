import type { Doc } from "../types/docs";

type NavProps = {
  docs: Doc[];
  onCurrentDocIndex: (index: number) => void;
};

export default function Nav({ docs, onCurrentDocIndex }: NavProps) {
  return (
    <nav className="w-72 h-full p-4 bg-slate-50 border-r border-gray-200">
      <ul className="flex flex-col gap-3">
        {!docs.length && <h1>Nenhum documento</h1>}
        {docs.map((doc, index) => (
          <li
            className="cursor-pointer p-2 rounded bg-gray-400 text-white font-medium"
            key={index}
            onClick={() => onCurrentDocIndex(index)}
          >
            {doc.title}
          </li>
        ))}
      </ul>
    </nav>
  );
}
