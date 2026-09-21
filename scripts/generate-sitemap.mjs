import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const target = join(root, 'public', 'sitemap.xml');

const SITE_URL = 'https://christopher-bondier.com';
const today = new Date().toISOString().slice(0, 10);

const languages = [
  { hreflang: 'en', path: '/' },
  { hreflang: 'fr', path: '/fr/' },
  { hreflang: 'es', path: '/es/' },
];

const alternates = [
  ...languages.map(({ hreflang, path }) => `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${SITE_URL}${path}" />`),
  `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />`,
].join('\n');

const urls = languages
  .map(
    ({ path }) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${path === '/' ? '1.0' : '0.8'}</priority>
${alternates}
  </url>`,
  )
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

writeFileSync(target, sitemap);
console.log(`sitemap.xml written (${today})`);
