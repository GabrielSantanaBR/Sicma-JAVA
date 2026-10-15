import {cp, mkdir, readFile, rm, writeFile, access} from 'node:fs/promises';
import {media} from '../src/data/media.mjs';
import {page} from '../src/page.mjs';

for (const [id, item] of Object.entries(media)) {
  if (item.src) {
    if (!/^\/images\/[a-z0-9/_.,-]+\.(webp|png|jpe?g|avif)$/i.test(item.src) || item.src.includes('..')) throw new Error(`Invalid local media path: ${id}`);
    if (!item.alt?.trim()) throw new Error(`A factual alt is required for ${id}`);
    await access(new URL(`../public${item.src}`, import.meta.url));
  }
}
await rm(new URL('../dist', import.meta.url), {recursive: true, force: true});
await mkdir(new URL('../dist', import.meta.url), {recursive: true});
await cp(new URL('../public', import.meta.url), new URL('../dist', import.meta.url), {recursive: true});
for (const name of ['styles.css', 'app.js']) {
  await writeFile(new URL(`../dist/${name}`, import.meta.url), await readFile(new URL(`../src/${name}`, import.meta.url)));
}
await writeFile(new URL('../dist/index.html', import.meta.url), page());
console.log(`SICMA: static build complete; ${Object.keys(media).length} media slots validated.`);
