# SICMA — Matemática que abre caminhos

Reprodução da página SICMA nas 14 capturas autorizadas do pacote de 15/10/2026. Todas as seções e a ordem editorial foram reconstruídas. Cinco fotografias originais e o logotipo enviados pelo proprietário foram aplicados somente nos locais identificados nas referências. Duas fotos principais ainda estão em espaços reservados.

## Executar

Node.js 22 ou superior. Sem dependências de produção.

```sh
npm ci
npm run build
npm start
```

O servidor escuta `0.0.0.0:$PORT` (padrão: 3000). Saúde: `/health`. O Railway usa `railway.toml`, o serviço existente `sicma-web` e a branch `main`.

## Estrutura

- `src/page.mjs`: HTML semântico, gerado estaticamente no build, com conteúdo disponível sem JavaScript.
- `src/styles.css`: composição visual e adaptações de celular e tablet.
- `src/app.js`: menu mobile, sete álbuns com teclado e diálogos para fontes pendentes.
- `src/data/content.mjs`: textos, trajetórias e links das dez notícias.
- `src/data/media.mjs`: configuração dos 28 espaços de fotografia (7 principais + 21 registros de álbuns).
- `public/fonts`: fontes locais com licenças OFL; sem chamadas a Google Fonts em produção.
- `server.mjs`: servidor HTTP, CSP restritiva, MIME, respostas 400/403/404/405 e encerramento com SIGTERM.

## Fotografias

Veja [docs/FOTOGRAFIAS.md](docs/FOTOGRAFIAS.md). Coloque a imagem em `public/images`, preencha `src` e um `alt` descritivo em `src/data/media.mjs`, ajuste `position` e execute o build. Dimensões e máscaras permanecem estáveis. O build rejeita arquivos inexistentes, caminhos externos e imagens sem descrição. Nenhuma foto faltante é requisitada ao servidor.

## Verificação

```sh
npm run check
npm test
npx playwright install --with-deps chromium
# Com npm start ativo em outro terminal:
node test/browser.mjs
```

O GitHub Actions executa as verificações e gera um artefato `sicma-visual-qa` com 14 capturas de desktop, capturas completas em sete larguras e resultados das interações. `TEST_URL` permite executar o mesmo teste contra a hospedagem.

## Conteúdo e limites de reprodução

Os textos reproduzem o pacote, sem alterar formações históricas automaticamente. O card de Gabriel mantém `Estatística — UFF` para fidelidade à referência e precisa de revisão editorial do proprietário. O nome Júlia Pereira foi conferido na captura 11. As fontes escolhidas aproximam o desenho dos prints; os arquivos originais de tipografia não foram fornecidos. A marca do cabeçalho e do rodapé usa o arquivo original recebido. O favicon vetorial permanece a reconstrução inicial.

Os links das dez matérias foram localizados nos veículos correspondentes. A redação e as datas exibidas seguem a referência visual; os títulos completos dos artigos podem ser diferentes. Links de relatos ainda sem publicação identificada abrem um aviso honesto, sem fingir um destino externo. Não há cadastro, rastreamento, banco ou cookies adicionados.

## Preservação

- Backup anterior à substituição: `backup/pre-copia-sicma-2026-10-15`, HEAD `b3b5816e9a7d6dc4ad89f0e6550a0b7123fb190c`.
- Histórico Java intocado: `backup/legacy-java-2026-10-14`, HEAD `2789716a66ca52175374c786d2b5a46d57cb3d17`.
