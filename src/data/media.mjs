// Only photographs matched to the original reference captures are enabled.
// Source mapping and the two outstanding originals are documented in docs/FOTOGRAFIAS.md.
export const media = {
  'hero-equipe': {src: null, file: 'hero-equipe.webp', label: 'Equipe SICMA · medalhistas', alt: '', position: '50% 45%', width: 1240, height: 840},
  'metodo-equipe': {src: '/images/metodo-equipe.webp', file: 'metodo-equipe.webp', label: 'Equipe SICMA · conquista internacional', alt: 'Equipe SICMA com camisas do Brasil, medalhas e mascotes de astronauta no aeroporto do Galeão.', position: '50% 40%', width: 1024, height: 682},
  '2026-londres': {src: null, file: '2026-londres.webp', label: 'Londres · LIYSF 2026', alt: '', position: '50% 50%', width: 760, height: 610},
  '2026-nova-york': {src: '/images/2026-nova-york.webp', file: '2026-nova-york.webp', label: 'Nova York · Copernicus 2026', alt: 'Delegação SICMA reunida com malas na área de embarque do aeroporto.', position: '50% 50%', width: 1403, height: 900},
  'impacto-gabriela': {src: '/images/impacto-gabriela.webp', file: 'impacto-gabriela.webp', label: 'Gabriela Tavares Lesse · UFRJ', alt: 'Gabriela Tavares Lesse com medalhas diante do símbolo da Universidade do Brasil, na UFRJ.', position: '50% 50%', width: 945, height: 903},
  'impacto-yasmin': {src: '/images/impacto-yasmin.webp', file: 'impacto-yasmin.webp', label: 'Yasmin Caldas · premiação AIMO', alt: 'Gabriel e Yasmin na premiação AIMO 2024, exibindo medalhas e diplomas.', position: '50% 45%', width: 734, height: 880},
  'impacto-relato-julia': {src: '/images/impacto-relato-julia.webp', file: 'impacto-relato-julia.webp', label: 'Júlia Pereira', alt: 'Júlia Pereira com uniforme da escola e uma medalha na mão.', position: '50% 40%', width: 589, height: 591},
};
export const albumIds = ['2019-china', '2022-londres', '2023-nova-york', '2024-coreia', '2025-toquio', '2026-londres', '2026-nova-york'];
for (const album of albumIds) {
  for (let i = 1; i <= 3; i++) {
    const id = `album-${album}-${String(i).padStart(2, '0')}`;
    media[id] = {src: null, file: `${id}.webp`, label: `Registro ${String(i).padStart(2, '0')}`, alt: '', position: '50% 50%', width: 1200, height: 800};
  }
}
