const fs = require('fs');

const raw = fs.readFileSync('src/data/premium_inventory.json', 'utf-8');
const items = JSON.parse(raw);

const products = items.map(item => {
  return {
    id: item.id,
    name: item.product_name,
    description: item.description,
    price: item.price_in_usd,
    // displayPrice: `$${item.price_in_usd.toFixed(2)}`, // Removed to let components use the raw price
    images: [item.image],
    category: item.category,
    tags: item.ai_keywords,
    rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
    reviewsCount: Math.floor(Math.random() * 500) + 10,
    stock: Math.floor(Math.random() * 200) + 20,
    reviews: [] // Empty reviews for now
  };
});

const tsContent = `export interface Review {
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

fs.writeFileSync('src/data/products.ts', tsContent);
console.log('Successfully updated src/data/products.ts');
