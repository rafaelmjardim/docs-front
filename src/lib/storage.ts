import type { Doc } from "../types/docs";

export const initialDocs: Doc[] = [
  {
    id: "1",
    title: "Home",
    path: "home",
    content:
      "# Bem-vindo à Plataforma de Documentação\n\nEsta é uma plataforma moderna para gerenciar sua documentação técnica.",
    format: "markdown",
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Projeto X",
    path: "home/projetox",
    content: "# Projeto X\n\nDocumentação do Projeto X.",
    format: "markdown",
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Frontend",
    path: "home/projetox/frontend",
    content: "# Frontend\n\nDocumentação da camada frontend.",
    format: "markdown",
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Componentes",
    path: "home/projetox/frontend/componentes",
    content: "# Componentes\n\nGuia de componentes reutilizáveis.",
    format: "markdown",
    updated_at: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Component X",
    path: "home/projetox/frontend/componentes/componentx",
    content:
      "# Component X\n\n## Descrição\nComponente exemplo para demonstração.\n\n## Uso\n```tsx\n<ComponentX />\n```",
    format: "markdown",
    updated_at: new Date().toISOString(),
  },
];
