# 🏋️ Gym Management

**Gym Management** é uma aplicação desenvolvida com foco em gestão de academias, construída como parte de um desafio técnico proposto pela **Next Fit**.

---

## 📚 Instalação e Execução

Para rodar o projeto localmente, siga os passos abaixo:

1. **Clone o repositório:**

   ```bash
   git clone
   ```

2. **Instale as dependências:**

   ```bash
    cd gym-management
    npm install
   ```

3. **Inicie o servidor de desenvolvimento:**

   ```bash
    npm run dev
   ```

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
  - **TanStack Query** para gerenciamento de estado e cache, melhorando a performance
  - **Axios** para requisições HTTP
  - Adotar, tanto no back quanto no front, padrões de paginação com `limit` e `offset`, para evitar problemas de performance com grandes volumes de dados
  - Utilizar como base a modelagem de Staff, Member e Coach para criar uma Role Based Access Control (RBAC) no backend, juntamente com JWT e Cookies para autenticação e autorização
  - Pode ser feito, a fim de teste, no próprio Next.js, utilizando o `app/api` para simular um backend
- Adicionar testes unitários com **Jest** e **React Testing Library**
- Implementar todas as telas e funcionalidades previstas pela modelagem, que por uma questão de tempo não foram implementadas
- Melhorias gerais:
  - Adicionar `ErrouBoundary` para capturar erros de renderização
  - Adicionar telas de 404 e 500
  - Adicionar animações com a biblioteca **Motion** (antiga Framer Motion)
  - Aproveitar mais os recursos de SSR do Next.js e dos React Server Components
