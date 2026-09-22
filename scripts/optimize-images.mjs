import { readdir, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, basename, extname } from 'node:path';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const originals = join(root, 'assets', 'originals');
const projectOriginals = join(originals, 'project');
const projectOutput = join(root, 'public', 'assets', 'img', 'project');
const heroSource = join(originals, 'me.JPEG');
const heroOutput = join(root, 'public', 'assets', 'img', 'me.webp');

const PROJECT_WIDTH = 1400;
const HERO_WIDTH = 900;
const QUALITY = 85;

async function convert(source, output, width) {
  const info = await sharp(source)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 5 })
    .toFile(output);
  console.log(`${basename(output)}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}

await mkdir(projectOutput, { recursive: true });

for (const file of await readdir(projectOriginals)) {
  if (!/\.(png|jpe?g)$/i.test(file)) continue;
  const output = join(projectOutput, basename(file, extname(file)) + '.webp');
  await convert(join(projectOriginals, file), output, PROJECT_WIDTH);
}

await convert(heroSource, heroOutput, HERO_WIDTH);
console.log('Done.');
