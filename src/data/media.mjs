// Set src only after the corresponding original photograph is supplied.
// Paths are relative to public/. Keep alt factual and adjust position after inspecting the photo.
export const media = {
  'hero-equipe': {src: null, file: 'hero-equipe.webp', label: 'Equipe SICMA · medalhistas', alt: '', position: '50% 45%', width: 1240, height: 840},
  'metodo-equipe': {src: null, file: 'metodo-equipe.webp', label: 'Equipe SICMA · conquista internacional', alt: '', position: '50% 40%', width: 910, height: 690},
  '2026-londres': {src: null, file: '2026-londres.webp', label: 'Londres · LIYSF 2026', alt: '', position: '50% 50%', width: 760, height: 610},
  '2026-nova-york': {src: null, file: '2026-nova-york.webp', label: 'Nova York · Copernicus 2026', alt: '', position: '50% 50%', width: 760, height: 610},
  'impacto-gabriela': {src: null, file: 'impacto-gabriela.webp', label: 'Gabriela Tavares Lesse · UFRJ', alt: '', position: '50% 50%', width: 760, height: 900},
  'impacto-yasmin': {src: null, file: 'impacto-yasmin.webp', label: 'Yasmin Caldas · premiação AIMO', alt: '', position: '50% 45%', width: 760, height: 900},
  'impacto-relato-julia': {src: null, file: 'impacto-relato-julia.webp', label: 'Júlia Pereira', alt: '', position: '50% 40%', width: 400, height: 400},
};
export const albumIds = ['2019-china', '2022-londres', '2023-nova-york', '2024-coreia', '2025-toquio', '2026-londres', '2026-nova-york'];
for (const album of albumIds) {
  for (let i = 1; i <= 3; i++) {
    const id = `album-${album}-${String(i).padStart(2, '0')}`;
    media[id] = {src: null, file: `${id}.webp`, label: `Registro ${String(i).padStart(2, '0')}`, alt: '', position: '50% 50%', width: 1200, height: 800};
  }
}
