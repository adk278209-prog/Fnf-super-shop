const fs = require('fs');
const tsContent = fs.readFileSync('src/data/products.ts', 'utf-8');
const newTsContent = tsContent.replace(/"\/assets\/images\//g, '"assets/images/');
fs.writeFileSync('src/data/products.ts', newTsContent);
console.log('Fixed paths to relative ' + 'assets/images/');
