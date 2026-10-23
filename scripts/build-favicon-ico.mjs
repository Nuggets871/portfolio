import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Build a lean favicon.ico from the 16, 32 and 48px PNGs.
// Search engines only need a small, stable ICO; the large PNG favicons are
// declared separately in index.html.
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sizes = [16, 32, 48];

const images = sizes.map((size) => ({
  size,
  data: readFileSync(join(root, 'public', `favicon-${size}x${size}.png`)),
}));

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // resource type: icon
header.writeUInt16LE(images.length, 4);

const directory = Buffer.alloc(16 * images.length);
let offset = header.length + directory.length;

images.forEach(({ size, data }, index) => {
  const entry = index * 16;
  directory.writeUInt8(size === 256 ? 0 : size, entry);
  directory.writeUInt8(size === 256 ? 0 : size, entry + 1);
  directory.writeUInt8(0, entry + 2); // color palette
  directory.writeUInt8(0, entry + 3); // reserved
  directory.writeUInt16LE(1, entry + 4); // color planes
  directory.writeUInt16LE(32, entry + 6); // bits per pixel
  directory.writeUInt32LE(data.length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += data.length;
});

const ico = Buffer.concat([header, directory, ...images.map(({ data }) => data)]);
writeFileSync(join(root, 'public', 'favicon.ico'), ico);
console.log(`favicon.ico written (${sizes.join(', ')} px, ${ico.length} bytes)`);
