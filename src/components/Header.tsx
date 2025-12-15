import myLogo from "../assets/logo.svg";

export default function Header() {
  const menuList = [
    { txt: "Documentação" },
    { txt: "Artigos" },
    { txt: "Produtos" },
    { txt: "Estatísticas" },
  ];

  return (
    <header className="sticky top-0 z-20 w-full h-[3.75rem] px-4 flex items-center justify-between bg-white border-1 border-b border-gray-200 font-bold">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <img className="h-8" src={myLogo} alt="Logo" />
          <h1>Agger hub</h1>
        </div>

        <ul className="flex items-center gap-6 text-slate-600">
          {menuList.map((item, index) => (
            <li key={index}>{item.txt}</li>
          ))}
        </ul>
      </div>

      <div>
        <div className="w-10 h-10 bg-sky-800 rounded-full flex items-center justify-center text-white font-bold">
          RJ
        </div>
      </div>
    </header>
  );
}
