# SICMA MATHEMA

Portal educacional independente, reconstruído como uma nova aplicação web para apresentar iniciativas de matemática olímpica e oferecer treino interativo.

> **Importante:** a publicação anterior em chatgpt.site não pôde ser recuperada integralmente. Esta versão é uma recriação moderna, **não um espelho ou arquivo fiel do original**, e não oferece inscrições oficiais.

## Funcionalidades

- Página institucional com narrativa, trajetória, metodologia, recursos e perguntas frequentes;
- 25 problemas autorais de matemática distribuídos em lógica, teoria dos números, geometria, combinatória e álgebra;
- Filtros por tema e nível, correção imediata com explicação, sequências e estatísticas locais;
- Layout responsivo e navegação por teclado;
- Servidor Node.js sem dependências externas, com cabeçalhos básicos de segurança;
- Health check HTTP em \`/health\` e suporte à porta \`PORT\` do Railway;
- Materiais de estudo em Markdown disponíveis para download.

## Rodar

Requer Node.js 20+.

\`\`\`bash
npm start
\`\`\`

Abra \`http://localhost:3000\`. Execute \`npm run check\` para validar a sintaxe.

## Hospedagem no Railway

1. Crie um serviço vinculado ao repositório \`GabrielSantanaBR/Sicma-JAVA\`, branch \`main\`.
2. O Railway detectará o script \`npm start\`. Configure o health check como \`/health\`.
3. Gere um domínio público e verifique \`/health\`.

Nenhum banco de dados é necessário nesta versão. Estatísticas de treino usam apenas \`localStorage\` no dispositivo, sem contas ou envio de respostas ao servidor.

## Organização

\`\`\`text
├── package.json
├── server.js
├── public/
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   ├── favicon.svg
│   └── materiais/
│       ├── roteiro-de-estudos.md
│       └── colecao-de-desafios.md
└── README.md
\`\`\`

## Histórico

A antiga estrutura Java/Spring Boot foi removida da \`main\` e substituída pelo novo portal. A cópia anterior à migração foi preservada na branch \`backup/legacy-java-2026-10-14\`.

## Observações

- Conteúdos educativos, exercícios e design recriados independentemente.
- Links para matérias externas são referências informativas e não indicam vínculo institucional.
- Não publique dados pessoais de estudantes sem autorização.
- Antes de representar a instituição oficialmente, confirme nomes, fatos, identidade e canais de contato com responsáveis.
