const fs = require('fs');

const tsContent = fs.readFileSync('src/data/products.ts', 'utf-8');

// We need to parse the products and update their images.
// Actually, let's just write a script to re-process `src/data/premium_inventory.json`
const raw = fs.readFileSync('src/data/premium_inventory.json', 'utf-8');
const items = JSON.parse(raw);

const products = items.map((item, index) => {
  // Clean product name for loremflickr
  // E.g., "Authentic Avocados" -> "avocados"
  // "Premium Coffee Beans" -> "coffee,beans" or "coffee-beans"
  let keyword = item.product_name.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().split(/\s+/).slice(-2).join(','); // Take last two words, e.g., "coffee,beans"
  
  // Just use the ai_keywords or the product name
  if (keyword.length < 3) {
    keyword = 'food';
  }

  const image = `https://loremflickr.com/500/500/${keyword}?lock=${index}`;

  return {
    id: item.id || `item_${index}`,
    name: item.product_name,
    description: item.description,
    price: item.price_in_usd,
    images: [image],
    category: item.category,
    tags: item.ai_keywords,
    rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
    reviewsCount: Math.floor(Math.random() * 500) + 10,
    stock: Math.floor(Math.random() * 200) + 20,
    reviews: []
  };
});

const newTsContent = `export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  displayPrice?: string;
  images: string[];
  category: string;
  tags: string[];
  rating: number;
  reviewsCount: number;
  stock: number;
  features?: string[];
  reviews: Review[];
}

export const CATEGORIES = [
  "Fresh Produce",
  "Dairy & Eggs",
  "Bakery",
  "Meat & Seafood",
  "Pantry",
  "Beverages",
  "Snacks",
  "Gourmet"
];

export const products: Product[] = ${JSON.stringify(products, null, 2)};
`;

fs.writeFileSync('src/data/products.ts', newTsContent);
console.log('Successfully updated src/data/products.ts with loremflickr images.');
