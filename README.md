# 🏋️ Gym Management – Desafio Técnico Next Fit

**Gym Management** é uma aplicação desenvolvida com foco em gestão de academias, construída como parte de um desafio técnico proposto pela **Next Fit**..

---

## 🚀 Tecnologias e Ferramentas

| Categoria    | Ferramenta/Lib              | Justificativa                                                   |
| ------------ | --------------------------- | --------------------------------------------------------------- |
| Framework    | **Next.js 15 (App Router)** | Uso da versão mais recente como desafio adicional e base sólida |
| Linguagem    | **TypeScript**              | Tipagem estática para evitar bugs e facilitar manutenção        |
| UI Kit       | **Material UI (MUI)**       | Compatível com o design da empresa e já utilizado no Figma      |
| Formulários  | **React Hook Form + Zod**   | Performance e validação baseada em schema                       |
| Datas        | **Day.js**                  | Leve, performático e com boa API                                |
| Code Quality | **ESLint + Prettier**       | Padronização automática de código                               |
| Git Hooks    | **Husky**                   | Lint, formatação e testes antes do commit                       |
| Compilador   | **React Compiler**          | Experimental, diminuir a necessidade de memos                   |
| CI/CD        | **Vercel**                  | Integração direta com a plataforma                              |

---

## 🧠 Processo Criativo & Desenvolvimento

### 1. Modelagem de Dados

Antes da interface, a base de dados foi modelada para facilitar:

- Criação de `mocks` realistas para simular APIs
- Geração de tipagens estáticas no front

### 2. UX & Design

- **Heurísticas de Nielsen** e **Moodboard** para base conceitual
- Criação de protótipos no **Figma**, com bibliotecas do MUI
- Abordagem **mobile-first**

### 3. Frontend

Os principais desafios nessa etapa:

- Depois de muito tempo utilizando o Ant Design, se adaptar ao MUI e suas convenções foi um desafio interessante, que envolveu:
  - Entender como o MUI lida com temas e estilos
  - Aprender a usar os componentes de forma eficiente
  - Sintaxe e convenções diferentes
  - Maneiras diferentes de lidar com responsividade
- Nova versão do Next.js (15), nunca tinha trabalhado com o App Router e as novas apis, como `useRouter`, `useSearchParams`, `useParams`, etc.

---

## 🚀 Melhorias Futuras

- Implementar um backend real, e utilizar:
  - **TanStack Query** para gerenciamento de estado e cache
  - **Axios** para requisições HTTP
  - Pode ser feito, a fim de teste, no próprio Next.js, utilizando o `app/api` para simular um backend
- Adicionar testes unitários com **Jest** e **React Testing Library**
- Aproveitar mais os recursos de SSR do Next.js e dos React Server Components
- Adicionar animações com a biblioteca **Motion** (antiga Framer Motion)
- Implementar todas as telas e funcionalidades previstas pela modelagem, que por uma questão de tempo não foram implementadas
