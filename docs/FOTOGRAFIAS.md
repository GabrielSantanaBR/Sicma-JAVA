# Fotografias originais — conferência dos anexos

Os 15 arquivos recebidos em 15/10/2026 foram abertos e comparados com as capturas originais. Somente cinco fotografias e o logotipo correspondem a imagens visíveis nas referências. Nenhuma das demais fotografias foi publicada ou acrescentada aos álbuns.

## Aplicadas nos mesmos locais da referência

| Arquivo recebido | Espaço existente | Arquivo publicado |
|---|---|---|
| `image(20261015-160720).png` | Método · Conquistar (captura 03) | `metodo-equipe.webp` |
| `WhatsApp Image 2026-07-25 at 13.31.15.jpeg` | O presente · Nova York (captura 07) | `2026-nova-york.webp` |
| `Gabriela Lesse.png` | Impacto · Gabriela (captura 10) | `impacto-gabriela.webp` |
| `gabriel e yasmin medalistas na aimo.png` | Impacto · Yasmin (captura 10) | `impacto-yasmin.webp` |
| `image(20261015-161134).png` | Impacto · relato de Júlia (captura 11) | `impacto-relato-julia.webp` |
| `ChatGPT Image 24 de ago. de 2026, 23_38_34.png` | Marca do cabeçalho e rodapé (capturas 01 e 14) | `logo-sicma.webp` |

As fotos usam a resolução recebida, com compressão WebP e sem alterar seu conteúdo. A marca foi reduzida para 320 × 332 px, preservando a transparência. Os recortes são feitos pelo CSS, mantendo dimensões, máscaras, sobreposições e legendas existentes.

## Ainda faltam duas fotografias exatas

| Arquivo preparado | Imagem necessária | Referência |
|---|---|---|
| `hero-equipe.webp` | Grupo menor de estudantes de uniforme branco e medalhas diante do mural azul/amarelo “Seja Luz” | 01 · abertura |
| `2026-londres.webp` | Três estudantes de uniforme branco diante do pôster científico SICMA, no LIYSF | 07 · card Londres |

A foto `Captura de tela 2026-08-23 174504.png` mostra uma equipe maior no mesmo mural, mas é outra fotografia. Ela não substitui a foto da abertura. Os dois espaços continuam preparados, sem requisitar arquivos inexistentes.

## Recebidas e mantidas fora do site

Estas nove fotografias não aparecem nas capturas e só serão adicionadas com instrução expressa do proprietário:

- `Captura de tela 2026-08-23 174504.png`
- `Captura de tela 2026-08-23 174533.png`
- `Captura de tela 2026-08-23 174627.png`
- `Captura de tela 2026-08-23 174650.png`
- `Captura de tela 2026-08-23 174659.png`
- `Captura de tela 2026-08-23 174905.png`
- `Captura de tela 2026-09-13 205952.png`
- `equipe atual.png`
- `equipe atual 2.png`

## Configuração

O ponto único de configuração das fotografias é `src/data/media.mjs`; os arquivos publicados ficam em `public/images/`. Preencha `src`, descrição factual em `alt`, dimensões reais e `position` após conferir cada original. `position` aceita dois percentuais e altera apenas o recorte. O build valida a existência do arquivo local e sua descrição.

Os 21 registros opcionais dos sete álbuns continuam sem imagem, conforme o estado vazio da captura 06. Receber uma foto não autoriza incluí-la nesses álbuns.
