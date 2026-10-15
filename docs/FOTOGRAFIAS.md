# Fotografias originais a fornecer

O ponto único de configuração é `src/data/media.mjs`. Todos os arquivos devem ser colocados em `public/images/`. Os nomes abaixo são recomendados. Não é necessário enviar imagens artificiais para preencher os espaços.

| Arquivo | Enquadramento e local | Tamanho recomendado |
|---|---|---|
| `hero-equipe.webp` | Equipe com medalhas, centralizada; máscara em arco no hero | 1240 × 840 ou maior |
| `metodo-equipe.webp` | Grupo de verde/amarelo; foto sob texto inferior do método | 910 × 690 ou maior |
| `2026-londres.webp` | Estudantes diante do pôster no LIYSF | 760 × 610 ou maior |
| `2026-nova-york.webp` | Delegação reunida na viagem à Copernicus | 760 × 610 ou maior |
| `impacto-gabriela.webp` | Gabriela diante do símbolo da UFRJ, retrato | 760 × 900 ou maior |
| `impacto-yasmin.webp` | Premiação internacional, retrato | 760 × 900 ou maior |
| `impacto-relato-julia.webp` | Retrato de Júlia Pereira com medalha | 400 × 400 ou maior |

## Álbuns (21 registros opcionais)

Para cada base abaixo, envie `-01.webp`, `-02.webp` e `-03.webp`, preferencialmente em 1200 × 800 px ou maior:

- `album-2019-china`
- `album-2022-londres`
- `album-2023-nova-york`
- `album-2024-coreia`
- `album-2025-toquio`
- `album-2026-londres`
- `album-2026-nova-york`

Exemplo de configuração após conferir uma fotografia:

```js
'2026-londres': {
  src: '/images/2026-londres.webp',
  file: '2026-londres.webp',
  label: 'Londres · LIYSF 2026',
  alt: 'Descrição factual das pessoas e do contexto da imagem recebida.',
  position: '50% 50%',
  width: 760,
  height: 610,
},
```

`position` aceita dois percentuais e altera o recorte sem mudar a proporção do espaço. As legendas, selos e overlays são HTML/CSS independentes da fotografia. A área mantém seu tamanho antes do carregamento. WebP é recomendado; JPEG, PNG e AVIF também são aceitos.

As abas dos álbuns já alternam os painéis e comportam os arquivos. Enquanto os registros não forem enviados, o estado vazio é intencional e corresponde à captura de referência.
