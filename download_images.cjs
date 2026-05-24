const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, 'public', 'assets', 'images');
fs.mkdirSync(dir, { recursive: true });

const images = {
  'vegetables.jpg': 'https://placehold.co/500x500/84cc16/ffffff/jpg?text=Vegetables',
  'beverages.jpg': 'https://placehold.co/500x500/0ea5e9/ffffff/jpg?text=Beverages',
  'meat.jpg': 'https://placehold.co/500x500/ef4444/ffffff/jpg?text=Meat',
  'dairy.jpg': 'https://placehold.co/500x500/fcd34d/111827/jpg?text=Dairy',
  'grocery-generic.jpg': 'https://placehold.co/500x500/9ca3af/ffffff/jpg?text=Grocery'
};

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

async function downloadAll() {
  for (const [filename, url] of Object.entries(images)) {
    const dest = path.join(dir, filename);
    try {
      console.log('Downloading ' + filename + '...');
      await download(url, dest);
    } catch (err) {
      console.error('Failed to download ' + filename + ':', err);
    }
  }
  console.log('All images downloaded successfully.');
}

downloadAll();
