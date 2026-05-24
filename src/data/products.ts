import redLentilsImg from '../assets/images/red_lentils_bowl_1779599495794.png';

export interface Review {
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
  reviews: Review[];
  features: string[];
}

export const CATEGORIES = [
  "Groceries",
  "Oil & Ghee",
  "Rice & Lentils",
  "Spices",
  "Dairy",
  "Cleaning",
  "Electronics"
];

export const products: Product[] = [
  {
    id: "g1",
    name: "Rupchanda Soyabean Oil 5 Litre",
    description: "Premium quality Rupchanda soyabean oil for healthy daily cooking. Fortified with essential vitamins.",
    price: 950,
    displayPrice: "৳950",
    images: ["https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=800&q=80"],
    category: "Oil & Ghee",
    tags: ["bestseller", "essential"],
    rating: 4.9,
    reviewsCount: 1540,
    stock: 50,
    features: ["Vitamin A fortified", "Cholesterol free", "5 Litre value pack"],
    reviews: []
  },
  {
    id: "g2",
    name: "Miniket Rice Premium 5kg",
    description: "Premium quality sortex cleaned Miniket rice. Perfect for preparing fluffy, delicious daily meals.",
    price: 430,
    displayPrice: "৳430",
    images: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80"],
    category: "Rice & Lentils",
    tags: ["bestseller"],
    rating: 4.8,
    reviewsCount: 820,
    stock: 125,
    features: ["Premium quality Miniket", "Sortex cleaned", "5 KG bag"],
    reviews: []
  },
  {
    id: "g3",
    name: "Deshi Peyaj (Local Onion) 1kg",
    description: "Freshly sourced local onions (Deshi Peyaj), essential for authentic Bengali cooking.",
    price: 49,
    displayPrice: "৳49",
    images: ["https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=800&q=80"],
    category: "Groceries",
    tags: ["essential"],
    rating: 4.8,
    reviewsCount: 950,
    stock: 300,
    features: ["Locally sourced", "Fresh and pungent", "1 KG"],
    reviews: []
  },
  {
    id: "g4",
    name: "Potato Regular 1kg",
    description: "Fresh, premium quality regular potatoes (Alu). Carefully selected and sorted for everyday cooking.",
    price: 25,
    displayPrice: "৳25",
    images: ["https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&q=80"],
    category: "Groceries",
    tags: ["essential"],
    rating: 4.9,
    reviewsCount: 1200,
    stock: 500,
    features: ["Fresh farm selection", "Regular size", "1 KG"],
    reviews: []
  },
  {
    id: "g5",
    name: "Teer Atta (Fortified Flour) 2kg",
    description: "Fortified Teer Atta, produced from the finest wheat. Perfect for making soft rotis and parathas.",
    price: 120,
    displayPrice: "৳120",
    images: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80"],
    category: "Groceries",
    tags: [],
    rating: 4.7,
    reviewsCount: 450,
    stock: 120,
    features: ["Fortified with vitamins", "Sortex cleaned wheat", "2 KG pack"],
    reviews: []
  },
  {
    id: "g6",
    name: "Radhuni Turmeric Powder 200g",
    description: "Radhuni Turmeric Powder made from chosen turmeric roots. Zero artificial colors added.",
    price: 60,
    displayPrice: "৳60",
    images: ["https://images.unsplash.com/photo-1615485925600-97213b2c2eb6?w=800&q=80"],
    category: "Spices",
    tags: ["essential"],
    rating: 4.9,
    reviewsCount: 780,
    stock: 90,
    features: ["100% natural turmeric", "No added color", "200g pack"],
    reviews: []
  },
  {
    id: "g7",
    name: "Dano Full Cream Milk Powder 1kg",
    description: "Dano Full Cream Milk Powder provides essential calcium and protein for the entire family's health.",
    price: 820,
    displayPrice: "৳820",
    images: ["https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&q=80"],
    category: "Dairy",
    tags: ["bestseller"],
    rating: 4.9,
    reviewsCount: 1020,
    stock: 40,
    features: ["Full cream milk powder", "Rich in calcium", "1 KG family pack"],
    reviews: []
  },
  {
    id: "g8",
    name: "Aarong Liquid Milk 1 Litre",
    description: "Fresh pasteurized liquid milk from Aarong Dairy. Nutrient-packed and natural.",
    price: 105,
    displayPrice: "৳105",
    images: ["https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&q=80"],
    category: "Dairy",
    tags: ["essential"],
    rating: 4.8,
    reviewsCount: 650,
    stock: 100,
    features: ["Pasteurized liquid milk", "Farm fresh", "1 Litre carton"],
    reviews: []
  },
  {
    id: "g9",
    name: "Masoor Dal (Lentil Premium) 1kg",
    description: "Premium quality sorted Masoor Dal. High in protein and perfect for everyday dal fry.",
    price: 140,
    displayPrice: "৳140",
    images: [redLentilsImg],
    category: "Rice & Lentils",
    tags: ["essential"],
    rating: 4.8,
    reviewsCount: 420,
    stock: 80,
    features: ["Premium sorted lentils", "High protein", "1 KG pack"],
    reviews: []
  },
  {
    id: "g10",
    name: "Vim Liquid Dishwash 250ml",
    description: "Vim liquid dishwash to keep your utensils clean and perfectly degreased with a hint of lemon.",
    price: 64,
    displayPrice: "৳64",
    images: ["https://images.unsplash.com/photo-1582735689139-c19958373305?w=800&q=80"],
    category: "Cleaning",
    tags: [],
    rating: 4.7,
    reviewsCount: 890,
    stock: 120,
    features: ["Tough on grease", "Lemon fragrance", "250ml bottle"],
    reviews: []
  },
  {
    id: "g11",
    name: "PRAN Milk 1L",
    description: "UHT Pasteurized PRAN Milk, 1 Litre.",
    price: 85,
    displayPrice: "৳85",
    images: ["https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&q=80"],
    category: "Dairy",
    tags: ["essential"],
    rating: 4.8,
    reviewsCount: 120,
    originalPrice: 90,
    stock: 50,
    features: ["UHT Pasteurized", "1 Litre Cartons", "Long Shelf Life"],
    reviews: []
  },
  {
    id: "g12",
    name: "Nescafe Coffee 50g",
    description: "Nescafe Classic Coffee rich aroma 50g jar.",
    price: 220,
    displayPrice: "৳220",
    images: ["https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=800&q=80"],
    category: "Beverages",
    tags: ["bestseller"],
    rating: 4.9,
    reviewsCount: 450,
    stock: 75,
    features: ["Classic blend", "50g glass jar", "Rich aroma"],
    reviews: []
  },
  {
    id: "g13",
    name: "Pepsodent Toothpaste 100g",
    description: "Pepsodent Cavity Protection Toothpaste 100g.",
    price: 45,
    displayPrice: "৳45",
    images: ["https://images.unsplash.com/photo-1559598467-f8b76c8105d0?w=800&q=80"],
    category: "Personal Care",
    tags: ["essential"],
    rating: 4.6,
    reviewsCount: 89,
    stock: 120,
    features: ["Cavity protection", "100g tube", "Fresh breath"],
    reviews: []
  }
];
