const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

const SEARCH_QUERIES = [
  'minimal white t-shirt plain',
  'minimal black t-shirt plain',
  'minimal striped shirt navy white',
  'minimal polo shirt neutral',
  'minimal knit sweater grey',
  'minimal blue jeans denim',
  'minimal beige chino pants',
  'minimal shorts neutral',
  'minimal sandals flat',
  'minimal loafers leather',
  'minimal white sneakers clean',
  'minimal leather derby shoe',
  'minimal brown leather belt',
  'minimal leather messenger bag black',
  'minimal cap beige neutral'
];

async function fetchPhotoUrl(query) {
  const url = 'https://api.unsplash.com/search/photos?query=' + encodeURIComponent(query) + '&per_page=1&orientation=landscape';
  const res = await fetch(url, {
    headers: { Authorization: 'Client-ID ' + UNSPLASH_ACCESS_KEY }
  });
  if (!res.ok) throw new Error('Unsplash API: ' + res.status + ' ' + res.statusText);
  const data = await res.json();
  if (!data.results || data.results.length === 0) return null;
  const photo = data.results[0];
  const small = photo.urls.small || photo.urls.regular;
  return small + (small.includes('?') ? '&' : '?') + 'w=400&h=300&fit=crop&q=80';
}

async function main() {
  if (!UNSPLASH_ACCESS_KEY || !UNSPLASH_ACCESS_KEY.trim()) {
    console.error('Falta UNSPLASH_ACCESS_KEY en .env');
    console.error('Obtén una en https://unsplash.com/developers y añade: UNSPLASH_ACCESS_KEY=tu_key');
    process.exit(1);
  }

  const urls = [];
  for (let i = 0; i < SEARCH_QUERIES.length; i++) {
    process.stdout.write('Buscando ' + (i + 1) + '/' + SEARCH_QUERIES.length + '... ');
    try {
      const url = await fetchPhotoUrl(SEARCH_QUERIES[i]);
      urls.push(url || '');
      console.log(url ? 'OK' : 'sin resultados');
    } catch (err) {
      console.log('Error: ' + err.message);
      urls.push('');
    }
  }

  const seedPath = path.join(__dirname, '..', 'seed.js');
  let seedContent = fs.readFileSync(seedPath, 'utf8');

  const urlsStr = urls.map((url) => (url ? "  '" + url.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'" : "  ''")).join(',\n');
  const imagesBlock = 'const IMAGES = [\n' + urlsStr + '\n];';

  seedContent = seedContent.replace(
    /const u = \(id\) => [^\n]+\n\n\/\/ 15 imágenes[^\n]*\nconst IMAGES = \[[\s\S]*?\];[^\n]*/,
    'const IMAGES = [\n' + urlsStr + '\n];'
  );

  seedContent = seedContent.replace(/image: u\(IMAGES\[(\d+)\]\)/g, 'image: IMAGES[$1]');

  fs.writeFileSync(seedPath, seedContent);
  console.log('\nseed.js actualizado con ' + urls.filter(Boolean).length + ' imágenes.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
