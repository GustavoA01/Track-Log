# 🎸 Track Log

🔗 **Acesse o projeto publicado:** [app-track-log.vercel.app](https://app-track-log.vercel.app/)

Track Log é uma aplicação web para músicos organizarem seu repertório e acompanharem a evolução dos estudos. O app permite cadastrar músicas, agrupá-las em pastas, registrar sessões de prática com cronômetro e visualizar estatísticas e histórico de progresso.

## ✨ Funcionalidades

- **Autenticação de usuários** com Firebase (login, cadastro e recuperação de senha)
- **Biblioteca de músicas**: cadastro de músicas com artista, gênero, instrumento, dificuldade, status de aprendizado (quero aprender, aprendendo, aprendida, pausada), anotações e links de referência (vídeo/tablatura)
- **Pastas (Folders)**: organização das músicas em pastas personalizadas, com cor e imagem de capa
- **Sessões de prática**: início e término de sessões com cronômetro, registro de duração e observações
- **Histórico**: listagem completa das sessões de prática já realizadas
- **Estatísticas**: cards com indicadores de progresso, tempo total praticado, número de sessões, etc.
- **Busca e filtros** na biblioteca de músicas
- **Tema claro e escuro**
- **Layout responsivo**

## 🛠️ Tecnologias

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/) + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [Prisma ORM](https://www.prisma.io/) com banco de dados SQLite
- [Firebase Authentication](https://firebase.google.com/products/auth)
- [TanStack Query (React Query)](https://tanstack.com/query/latest) para gerenciamento de estado assíncrono
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) para formulários e validação
- [Jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/) para testes automatizados
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) + [Husky](https://typicode.github.io/husky/) para qualidade e padronização de código

## 📁 Estrutura do projeto

O projeto segue uma organização por _features_, separando componentes de UI, containers, hooks e testes por domínio:

```
src/
├── actions/          # Server Actions (songs, folders, sessions)
├── app/              # Rotas do Next.js (App Router)
│   ├── (auth)/       # Login, cadastro, recuperação de senha
│   ├── (main)/       # Home e histórico
│   └── musica/       # Criação e detalhe de músicas
├── components/       # Componentes de UI compartilhados
├── features/         # Módulos de funcionalidade (Auth, SongForm, FolderForm,
│                     #   SongDetail, StartSession, LibraryBrowser, Home)
├── services/         # Integrações (Firebase, React Query keys)
└── utils/            # Funções utilitárias
prisma/
├── schema.prisma     # Modelagem do banco de dados
└── migrations/       # Migrações do banco
```

### Modelo de dados

- **Song**: músicas cadastradas pelo usuário (título, artista, gênero, instrumento, dificuldade, status, notas, links)
- **Folder**: pastas para organizar as músicas
- **SongFolder**: relação muitos-para-muitos entre músicas e pastas
- **PracticeSession**: sessões de prática vinculadas a uma música (data, duração, anotações)

## 🚀 Como rodar o projeto

### Pré-requisitos

- Node.js
- Um projeto no [Firebase](https://console.firebase.google.com/) configurado com Authentication

### Instalação

```bash
# Clonar o repositório
git clone <url-do-repositorio>
cd track-log

# Instalar as dependências
npm install
```

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```env
DATABASE_URL=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

### Banco de dados

```bash
# Gerar o client do Prisma
npm run db:generate

# Rodar as migrações
npm run db:migrate

# (Opcional) Abrir o Prisma Studio para visualizar os dados
npm run db:studio
```

### Executando em desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## 📜 Scripts disponíveis

| Comando                | Descrição                              |
| ---------------------- | -------------------------------------- |
| `npm run dev`          | Inicia o servidor de desenvolvimento   |
| `npm run build`        | Gera o build de produção               |
| `npm run start`        | Inicia o servidor em modo produção     |
| `npm run lint`         | Executa o ESLint                       |
| `npm run test`         | Executa os testes com Jest             |
| `npm run test:watch`   | Executa os testes em modo _watch_      |
| `npm run format`       | Formata o código com Prettier          |
| `npm run format:check` | Verifica a formatação do código        |
| `npm run db:generate`  | Gera o client do Prisma                |
| `npm run db:migrate`   | Executa as migrações do banco de dados |
| `npm run db:studio`    | Abre o Prisma Studio                   |

## 🧪 Testes

O projeto possui ampla cobertura de testes unitários e de componentes, organizados em pastas `tests/` dentro de cada módulo (`components`, `services` e cada _feature_). Para rodar a suíte completa:

```bash
npm run test
```

## 📄 Licença

Este projeto é de uso pessoal/educacional. Ajuste esta seção conforme a licença desejada.
