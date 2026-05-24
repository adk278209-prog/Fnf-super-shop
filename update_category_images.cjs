const fs = require('fs');

const tsContent = fs.readFileSync('src/data/products.ts', 'utf-8');

// Match the JSON part of the file
const startIdx = tsContent.indexOf('export const products: Product[] = [');
if (startIdx === -1) {
  console.error("Could not find products array in products.ts");
  process.exit(1);
}

const beforeJson = tsContent.substring(0, startIdx + 'export const products: Product[] = '.length);
const arrayString = tsContent.substring(startIdx + 'export const products: Product[] = '.length, tsContent.lastIndexOf('];') + 2);
const afterJson = tsContent.substring(tsContent.lastIndexOf('];') + 2);

const products = eval(arrayString);

function getAssetPath(category) {
  switch (category) {
    case 'Fruits & Vegetables':
      return '/assets/images/vegetables.jpg';
    case 'Beverages':
      return '/assets/images/beverages.jpg';
    case 'Meat & Seafood':
      return '/assets/images/meat.jpg';
    case 'Dairy & Plant Milk':
      return '/assets/images/dairy.jpg';
    default:
      return '/assets/images/grocery-generic.jpg';
  }
}

const updatedProducts = products.map(p => {
  return {
    ...p,
    images: [getAssetPath(p.category)]
  };
});

const newTsContent = beforeJson + JSON.stringify(updatedProducts, null, 2) + afterJson;
fs.writeFileSync('src/data/products.ts', newTsContent);

console.log('Successfully updated src/data/products.ts with dynamic category fallback images.');
