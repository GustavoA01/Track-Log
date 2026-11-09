<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Track Log — orientações do projeto

## Padrões de implementação

- Não adicione comentários ao código ao implementar ou alterar funcionalidades.
- Siga o padrão existente na feature e mantenha boas práticas de programação.
- Preserve alterações locais que não pertencem à tarefa. Evite refatorações e dependências sem necessidade.
- Use TypeScript, imports com alias `@/` e os componentes compartilhados de `src/components/ui`.
- Use Tailwind CSS e os tokens de tema existentes; preserve acessibilidade, responsividade e navegação por teclado.
- Mantenha as instruções de projeto neste arquivo, evitando duplicá-las em configurações específicas de um editor.

## Organização

| Diretório                           | Responsabilidade                                                       |
| ----------------------------------- | ---------------------------------------------------------------------- |
| `src/app`                           | Rotas, layouts e composição das páginas com App Router                 |
| `src/features/<feature>/components` | Apresentação e controles da feature                                    |
| `src/features/<feature>/container`  | Composição dos componentes e integração com hooks                      |
| `src/features/<feature>/hooks`      | Estado, regras de interface e mutações com React Query                 |
| `src/features/<feature>/utils`      | Funções puras específicas da feature                                   |
| `src/actions`                       | Server Actions de músicas, pastas e sessões                            |
| `src/components`                    | Componentes e providers compartilhados                                 |
| `src/data/schemas`                  | Schemas Zod, valores iniciais e conversões de formulário               |
| `src/data/types`                    | Contratos da aplicação e entradas das actions                          |
| `src/lib`                           | Prisma, autenticação, tags de cache e utilitários transversais         |
| `src/services`                      | Integração Firebase e chaves de consulta do React Query                |
| `src/utils`                         | Conversões de registros, datas, navegação e utilitários compartilhados |

Reutilize a feature existente antes de criar novas abstrações. Coloque testes nas pastas `tests` próximas ao código, conforme `jest.config.ts`. Preserve a distinção entre componentes de cliente e código de servidor.

## Dados e autenticação

- O banco é PostgreSQL, modelado em `prisma/schema.prisma`; use o client compartilhado de `src/lib/prisma.ts`.
- `Song` e `Folder` pertencem ao usuário identificado por `userId`. `PracticeSession` pertence a uma música; sua autorização passa pela propriedade dessa música.
- Obtenha a identidade validada com `getCurrentUserId()` em `src/lib/auth.ts`. Não aceite o proprietário de um recurso como autoridade fornecida pelo cliente.
- Preserve os filtros de usuário nas consultas e as verificações de propriedade antes de atualizar, excluir ou associar recursos.
- Valide entradas com os schemas Zod existentes e valide as pastas associadas com os helpers de `src/actions/songs/folderUtils.ts`.
- Use `src/utils/mappers.ts` para converter registros Prisma nos tipos da aplicação. Preserve o tratamento de campos opcionais, datas e IDs de pastas.
- Mantenha as invalidações de cache correspondentes às mutações: tags por usuário em `src/lib/cache-tags.ts`, caminhos do Next.js e chaves de React Query em `src/services/query`.
- Não versione credenciais, tokens, arquivos `.env` ou dados pessoais.

## Validação e comandos

Use npm e preserve `package-lock.json`. Use uma versão do Node compatível com o Next.js instalado e com a configuração TypeScript do Jest; neste ambiente, a suíte é executada com Node.js 24 via NVM.

- `npm run lint`: análise estática.
- `npm test -- --runInBand`: suíte completa; para mudanças localizadas, passe o caminho do teste relevante.
- `npm run format:check`: verificação de formatação; `npx prettier --check <arquivos>` permite validar apenas os arquivos alterados.
- `npm run db:generate`: geração do client Prisma.
- `npm run db:migrate`: migrações de desenvolvimento.
- `npm run db:deploy`: aplicação de migrações existentes.
- `npm run build` aplica migrações com `prisma migrate deploy` antes de compilar. Para compilar sem aplicar migrações, use `npx next build`.

Teste comportamentos relevantes, como validação, interação e autorização. Não crie testes apenas para conferir classes CSS, repasse de `className` ou detalhes visuais internos. Para alterações exclusivamente documentais, confira a formatação, os links e a correspondência com o código; o hook de commit também executa lint, testes e Prettier.

## Documentação

- A visão geral e os comandos estão no `README.md`.
- Os diagramas UML e suas fontes estão em `docs/arquitetura.md`.
- Ao alterar entidades, relacionamentos ou contratos, atualize os diagramas correspondentes.
- Os diagramas descrevem modelos Prisma e interfaces TypeScript; não introduza classes de runtime apenas para corresponder à notação UML.
