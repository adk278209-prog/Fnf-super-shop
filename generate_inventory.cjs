const fs = require('fs');

const categories = ['Fresh Produce', 'Dairy & Eggs', 'Bakery', 'Meat & Seafood', 'Pantry', 'Beverages', 'Snacks', 'Gourmet'];
const adjectives = ['Organic', 'Premium', 'Artisan', 'Fresh', 'Wild-Caught', 'Grass-Fed', 'Imported', 'Gourmet', 'Authentic', 'Handcrafted', 'Farm-Fresh', 'Heritage', 'Aged', 'Pure', 'Cold-Pressed', 'Sustainable'];
const baseItems = [
  'Avocados', 'Whole Milk', 'French Baguette', 'Coffee Beans', 'Saffron', 
  'Truffle Oil', 'Wagyu Beef', 'Brie Cheese', 'Croissants', 'Smoked Salmon', 
  'Macadamia Nuts', 'Manuka Honey', 'Matcha Powder', 'Extra Virgin Olive Oil', 'Balsamic Vinegar',
  'Almond Butter', 'Quinoa', 'Himalayan Sea Salt', 'Vanilla Beans', 'Maple Syrup',
  'Kombucha', 'Dark Chocolate', 'Sencha Green Tea', 'Ribeye Steak', 'Lobster Tails',
  'Beluga Caviar', 'Prosciutto di Parma', 'Parmigiano Reggiano', 'Basmati Rice', 'Linguine Pasta',
  'Basil Pesto', 'Oat Milk', 'Greek Yogurt', 'Blueberries', 'Strawberries',
  'Raspberries', 'Blackberries', 'Alphonso Mangoes', 'Pineapple', 'Pomegranates',
  'Coconut Water', 'Sparkling Mineral Water', 'Orange Juice', 'Apple Cider', 'Ginger Kombucha',
  'Macadamia Milk', 'Soy Milk', 'Cultured Butter', 'Free-Range Eggs', 'Sourdough Boule',
  'Ciabatta Bread', 'Focaccia', 'Pita Bread', 'Corn Tortillas', 'Classic Hummus',
  'Spicy Guacamole', 'Roasted Salsa', 'Pecans', 'English Walnuts', 'Roasted Cashews',
  'Shelled Pistachios', 'Marcona Almonds', 'Chia Seeds', 'Golden Flax Seeds', 'Hemp Hearts',
  'Rolled Oats', 'Artisan Granola', 'Swiss Muesli', 'Vegan Protein Powder', 'Collagen Peptides',
  'Dried Goji Berries', 'Acai Puree', 'Pink Dragon Fruit', 'Golden Kiwi', 'Papaya',
  'Key Lime', 'Meyer Lemon', 'Ruby Red Grapefruit', 'Navel Oranges', 'Fuji Apples',
  'Bartlett Pears', 'White Peaches', 'Black Plums', 'Bing Cherries', 'Concord Grapes',
  'Heirloom Tomatoes', 'Bell Peppers', 'English Cucumbers', 'Zucchini', 'Japanese Eggplant',
  'Rainbow Carrots', 'Russet Potatoes', 'Japanese Sweet Potatoes', 'Vidalia Onions', 'Black Garlic',
  'Fresh Ginger', 'Turmeric Root', 'Cilantro', 'Italian Parsley', 'Thai Basil'
];

const products = [];
let itemIndex = 0;

for (let i = 0; i < 200; i++) {
  const category = categories[i % categories.length];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  
  // Cycle through the base items
  const baseItem = baseItems[itemIndex % baseItems.length];
  itemIndex++;
  
  const productName = `${adj} ${baseItem}`;
  const encodedName = encodeURIComponent(productName.toLowerCase().replace(/\s+/g, '-'));
  
  const price = Number((Math.random() * 45 + 4.99).toFixed(2));
  
  products.push({
    id: `item_${i + 1}`,
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

fs.writeFileSync('src/data/premium_inventory.json', JSON.stringify(products, null, 2));
console.log('Successfully generated 200 premium grocery items.');
