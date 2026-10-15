# Verificação da reprodução SICMA — 15/10/2026

## Implementação

O pacote foi lido na ordem indicada, começando em `00_COMECE_AQUI.md`. As 14 capturas originais foram abertas e analisadas individualmente. A implementação usa HTML estático gerado com Node.js, CSS de composição e JavaScript sem framework. Os arquivos da aplicação anterior foram retirados da árvore final.

A branch `backup/pre-copia-sicma-2026-10-15` preserva a main anterior em `b3b5816e9a7d6dc4ad89f0e6550a0b7123fb190c`. A branch histórica `backup/legacy-java-2026-10-14` permanece intacta.

## Comparação visual

Foram executadas rodadas iterativas de capturas e verificações antes da publicação. Ajustes incluíram família e largura das fontes, quebras do título do projeto, altura do card Investigar, posicionamento do hero, formação dos professores, microtipografia e quebra do título de álbuns na tela de 320 px.

| Referência | Elementos conferidos |
|---|---|
| 01 | Cabeçalho fixo, título em três linhas, botões, medalhas, máscara em arco e selos |
| 02 | Faixa lilás, coluna editorial com recuo, título em três linhas, filete e essência |
| 03 | Título duplo, pergunta orbital, card horizontal e dois cards inferiores desiguais |
| 04 | Faixa de números 200 / 03 / 19 / 08 e começo da timeline |
| 05 | Sete anos, círculos numerados, divisórias e conteúdo da trajetória |
| 06 | Sete abas, painel selecionado, título, subtítulo e três registros vazios |
| 07 | Londres / Nova York, cards fotográficos com proporções preservadas |
| 08 | Título deslocado, professores em roxo e ameixa, formações e ornamentos |
| 09 | Mosaico de seis trajetórias, primeiro card duplo e Rebeca na última linha |
| 10 | Título, duas fotos verticais reservadas, depoimentos e legendas |
| 11 | Continuação dos relatos, cartão horizontal e transição para reconhecimento |
| 12 | Grade editorial conectada, dez matérias, metadados e divisórias |
| 13 | Últimas matérias e transição para CTA roxo com grid |
| 14 | Tipografia central, botões, círculos decorativos, footer e créditos |

O conteúdo principal de desktop mantém a largura editorial próxima de 770 px e o recuo de 140 px nos títulos correspondentes. O hero conserva a composição ampla e separada dessa grade. As fotografias ausentes não foram substituídas por imagens genéricas nem por recortes das capturas.

## Testes executados

- Build estático e verificação de sintaxe.
- Testes HTTP para home, todos os recursos referenciados, fontes e healthcheck.
- Respostas corretas para HEAD, método não permitido, rota ausente, caminho inválido e tentativa de acessar fora da pasta pública.
- CSP restritiva, MIME e headers de segurança.
- As sete abas: clique, seleção única, painel correspondente, Home, setas e retorno circular por teclado.
- Navegação pelas seis âncoras sem o cabeçalho cobrir o destino.
- Diálogos de referências pendentes, Escape e retorno de foco.
- Menu de celular: abrir, seguir link, fechar e Escape.
- Larguras 320, 390, 600, 768, 1024, 1440 e 1900 px, sem rolagem horizontal e com títulos dentro da tela.
- Capturas com movimento reduzido; fontes locais; console e respostas de recursos sem erros.

[Execução aprovada e capturas de referência](https://github.com/GabrielSantanaBR/Sicma-JAVA/actions/runs/38755336817). O artefato `sicma-visual-qa` inclui 14 PNGs de desktop, sete capturas completas responsivas, posições de captura e `results.json`. Retenção automática: 14 dias; o teste pode gerar novamente essas evidências.

## Pendências reais

1. Fotografias originais: sete principais e, opcionalmente, três registros de cada um dos sete álbuns. Lista e instruções em [FOTOGRAFIAS.md](FOTOGRAFIAS.md).
2. Aprovação editorial das formações históricas e dos dados transcritos. O card de Gabriel mantém `Estatística — UFF` por fidelidade ao print. A reprodução não equivale a uma atualização de currículo.
3. Endereços originais de alguns relatos pessoais. Os botões correspondentes informam claramente essa situação. As dez notícias têm endereços identificados nos veículos indicados.
4. Arquivo original de logomarca e identificação exata das fontes não foram fornecidos. O símbolo foi reconstruído em CSS/SVG; a tipografia foi aproximada por comparação. A ausência de fotos e desses arquivos impede afirmar identidade pixel a pixel.

Nenhum login, banco de dados, quiz, rastreamento ou formulário foi acrescentado.
