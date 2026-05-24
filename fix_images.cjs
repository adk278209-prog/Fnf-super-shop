const fs = require('fs');

const categoryImages = {
  "Fresh Produce": [
    "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=300&q=80"
  ],
  "Dairy & Eggs": [
    "https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=300&q=80"
  ],
  "Bakery": [
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1589367920969-ab8e050eb046?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=300&q=80"
  ],
  "Meat & Seafood": [
    "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1551028150-64b9e398f678?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1599907604471-2ed9a48dccb2?auto=format&fit=crop&w=300&q=80"
  ],
  "Pantry": [
    "https://images.unsplash.com/photo-1588195538326-c5b1e9f6f5b4?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1614088034543-5e78dd6f53ca?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=300&q=80"
  ],
  "Beverages": [
    "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=300&q=80"
  ],
  "Snacks": [
    "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1582281268112-9c3dbf9b1da9?auto=format&fit=crop&w=300&q=80"
  ],
  "Gourmet": [
    "https://images.unsplash.com/photo-1583086762635-43093b16db13?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=300&q=80",
    "https://images.unsplash.com/photo-1605389650058-29472bf62c3e?auto=format&fit=crop&w=300&q=80"
  ]
};

const raw = fs.readFileSync('src/data/premium_inventory.json', 'utf-8');
const items = JSON.parse(raw);

const products = items.map((item, index) => {
  const images = categoryImages[item.category] || categoryImages["Pantry"];
  const image = images[index % images.length];

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
console.log('Successfully updated src/data/products.ts with reliable images.');
