import { Link } from 'react-router';
import { CATEGORIES } from '@/data/products';
import { Apple, Milk, Croissant, Drumstick, CupSoda, UtensilsCrossed, Cookie } from 'lucide-react';

const categoryIcons: Record<string, any> = {
  "Fruits & Vegetables": Apple,
  "Dairy & Plant Milk": Milk,
  "Bakery & Bread": Croissant,
  "Meat & Seafood": Drumstick,
  "Beverages": CupSoda,
  "Pantry & Gourmet": UtensilsCrossed,
  "Snacks": Cookie
};

interface CategoryBrowserProps {
  onAiSearch: (query: string) => void;
}

export function CategoryBrowser({ onAiSearch }: CategoryBrowserProps) {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-gray-500">Find exactly what you need from our premium selection.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-10">
          {CATEGORIES.map(category => {
            const Icon = categoryIcons[category] || UtensilsCrossed;
            return (
              <Link 
                key={category} 
                to={`/shop?category=${encodeURIComponent(category)}`}
                className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl hover:bg-orange-50 hover:text-orange-600 transition-colors border border-gray-100 hover:border-orange-200 group"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-gray-700 group-hover:text-orange-500" />
                </div>
                <span className="text-sm font-semibold text-center text-gray-800 group-hover:text-orange-600">{category}</span>
              </Link>
            );
          })}
        </div>

        <div className="ai-search-container" style={{ maxWidth: '500px', margin: '20px auto', display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            id="aiSearchInput" 
            placeholder="Ask SmartCart AI (e.g., Ingredients for Pasta...)" 
            style={{ flex: 1, padding: '12px', border: '2px solid #ff6f00', borderRadius: '25px', outline: 'none', fontSize: '15px' }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const val = (e.target as HTMLInputElement).value;
                if (val) onAiSearch(val);
              }
            }}
          />
          <button 
            onClick={() => {
              const input = document.getElementById('aiSearchInput') as HTMLInputElement;
              if (input && input.value) {
                onAiSearch(input.value);
              }
            }} 
            style={{ background: '#ff6f00', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Ask AI
          </button>
        </div>
      </div>
    </section>
  );
}
