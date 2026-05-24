const fs = require('fs');

const raw = fs.readFileSync('src/data/premium_inventory.json', 'utf-8');
const items = JSON.parse(raw);

const taxonomyMapping = (baseItem) => {
  const itemLower = baseItem.toLowerCase();
  
  if (itemLower.includes("avocado") || itemLower.includes("mango") || itemLower.includes("pineapple") || itemLower.includes("pomegranate") || itemLower.includes("strawberry") || itemLower.includes("blueberry")) {
    return { category: "Fruits & Vegetables", subCategory: "Fresh Fruits" };
  }
  if (itemLower.includes("milk") && !itemLower.includes("oat")) {
    return { category: "Dairy & Plant Milk", subCategory: "Milk & Cream" };
  }
  if (itemLower.includes("oat milk")) {
    return { category: "Dairy & Plant Milk", subCategory: "Milk & Cream" };
  }
  if (itemLower.includes("cheese") || itemLower.includes("brie") || itemLower.includes("parmigiano")) {
    return { category: "Dairy & Plant Milk", subCategory: "Cheese" };
  }
  if (itemLower.includes("yogurt")) {
    return { category: "Dairy & Plant Milk", subCategory: "Yogurt" };
  }
  if (itemLower.includes("baguette") || itemLower.includes("sourdough") || itemLower.includes("ciabatta")) {
    return { category: "Bakery & Bread", subCategory: "Sliced Bread" };
  }
  if (itemLower.includes("croissant")) {
    return { category: "Bakery & Bread", subCategory: "Pastries" };
  }
  if (itemLower.includes("coffee") || itemLower.includes("tea") || itemLower.includes("matcha")) {
    return { category: "Beverages", subCategory: "Coffee & Tea" };
  }
  if (itemLower.includes("beef") || itemLower.includes("steak") || itemLower.includes("prosciutto")) {
    return { category: "Meat & Seafood", subCategory: "Beef & Lamb" };
  }
  if (itemLower.includes("salmon") || itemLower.includes("lobster") || itemLower.includes("caviar")) {
    return { category: "Meat & Seafood", subCategory: "Fresh Fish" };
  }
  if (itemLower.includes("water")) {
    return { category: "Beverages", subCategory: "Water" };
  }
  if (itemLower.includes("juice") || itemLower.includes("cider") || itemLower.includes("kombucha")) {
    return { category: "Beverages", subCategory: "Juices" };
  }
  if (itemLower.includes("oil") || itemLower.includes("vinegar")) {
    return { category: "Pantry & Gourmet", subCategory: "Oils & Vinegars" };
  }
  if (itemLower.includes("salt") || itemLower.includes("saffron") || itemLower.includes("vanilla")) {
    return { category: "Pantry & Gourmet", subCategory: "Spices & Baking" };
  }
  if (itemLower.includes("rice") || itemLower.includes("quinoa") || itemLower.includes("linguine")) {
    return { category: "Pantry & Gourmet", subCategory: "Grains & Pasta" };
  }
  if (itemLower.includes("nut") || itemLower.includes("pecan") || itemLower.includes("walnut") || itemLower.includes("cashew") || itemLower.includes("hummus") || itemLower.includes("butter")) {
    return { category: "Snacks", subCategory: "Nuts & Spreads" };
  }
  if (itemLower.includes("chocolate")) {
    return { category: "Snacks", subCategory: "Sweets" };
  }
  if (itemLower.includes("egg")) {
    return { category: "Dairy & Plant Milk", subCategory: "Eggs" };
  }
  if (itemLower.includes("pesto") || itemLower.includes("syrup") || itemLower.includes("honey")) {
    return { category: "Pantry & Gourmet", subCategory: "Condiments & Spreads" };
  }

  return { category: "Pantry & Gourmet", subCategory: "Other" };
};

const products = items.map((item, index) => {
  
  // Extract main item keyword for loremflickr
  // example: "Authentic Avocados" -> "avocado"
  const words = item.product_name.replace(/[^a-zA-Z\s]/g, '').trim().split(/\s+/);
  let keyword = words[words.length - 1].toLowerCase();
  
  // If plural, maybe singular is better for images, but loremflickr is fine
  if (keyword.endsWith('s') && keyword.length > 3) {
      keyword = keyword.slice(0, -1);
  }

  const { category, subCategory } = taxonomyMapping(item.product_name);
  
  const image = `https://loremflickr.com/500/500/${keyword}?lock=${index}`;

  return {
    id: item.id || `item_${index}`,
    name: item.product_name,
    description: item.description,
    price: item.price_in_usd,
    images: [image],
    category: category,
    subCategory: subCategory,
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
  subCategory?: string;
  tags: string[];
  rating: number;
  reviewsCount: number;
  stock: number;
  features?: string[];
  reviews: Review[];
}

export const CATEGORIES = [
  "Fruits & Vegetables",
  "Dairy & Plant Milk",
  "Bakery & Bread",
  "Meat & Seafood",
  "Beverages",
  "Pantry & Gourmet",
  "Snacks"
];

export const products: Product[] = ${JSON.stringify(products, null, 2)};
`;

fs.writeFileSync('src/data/products.ts', newTsContent);
console.log('Successfully updated src/data/products.ts with taxonomy and loremflickr images.');
