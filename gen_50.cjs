const categories = ['Fresh Produce', 'Dairy & Eggs', 'Bakery', 'Meat & Seafood', 'Pantry', 'Beverages', 'Snacks', 'Gourmet'];
const adjectives = ['Organic', 'Premium', 'Artisan', 'Fresh', 'Wild-Caught', 'Grass-Fed', 'Imported', 'Gourmet', 'Authentic', 'Handcrafted', 'Sustainable'];
const baseItems = [
  'Avocados', 'Whole Milk', 'Baguette', 'Coffee Beans', 'Saffron', 
  'Truffle Oil', 'Wagyu Beef', 'Brie Cheese', 'Croissants', 'Smoked Salmon', 
  'Macadamia Nuts', 'Manuka Honey', 'Matcha Powder', 'Olive Oil', 'Balsamic Vinegar',
  'Almond Butter', 'Quinoa', 'Sea Salt', 'Vanilla Beans', 'Maple Syrup',
  'Kombucha', 'Dark Chocolate', 'Green Tea', 'Ribeye Steak', 'Lobster Tails',
  'Caviar', 'Prosciutto', 'Parmigiano Reggiano', 'Basmati Rice', 'Linguine',
  'Pesto', 'Oat Milk', 'Greek Yogurt', 'Blueberries', 'Strawberries',
  'Mangoes', 'Pineapple', 'Pomegranates', 'Coconut Water', 'Sparkling Water',
  'Orange Juice', 'Apple Cider', 'Cultured Butter', 'Free-Range Eggs', 'Sourdough',
  'Ciabatta', 'Hummus', 'Pecans', 'Walnuts', 'Cashews'
];

const products = [];
let itemIndex = 0;

for (let i = 0; i < 50; i++) {
  const category = categories[i % categories.length];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const baseItem = baseItems[itemIndex % baseItems.length];
  itemIndex++;
  
  const productName = `${adj} ${baseItem}`;
  const encodedName = encodeURIComponent(productName.toLowerCase().replace(/\s+/g, '-'));
  
  const price = Number((Math.random() * 45 + 5).toFixed(2));
  
  products.push({
    product_name: productName,
    category: category,
    price_in_usd: price,
    description: `Experience the finest ${adj.toLowerCase()} ${baseItem.toLowerCase()}, carefully sourced for international standards to bring unparalleled quality to your table.`,
    ai_keywords: [
      adj.toLowerCase(), 
      baseItem.split(' ')[0].toLowerCase(), 
      category.toLowerCase().replace(/[^a-z]/g, ''), 
      'premium', 
      'global', 
      'grocery'
    ],
    image: `https://source.unsplash.com/featured/500x500/?${encodedName}`
  });
}

console.log(JSON.stringify(products, null, 2));
