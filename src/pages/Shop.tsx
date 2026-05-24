import { useState, useMemo } from 'react';
import { products, CATEGORIES } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { Filter, SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => b.tags.includes('new') ? -1 : 1);
        break;
      default:
        // featured default
        break;
    }

    return result;
  }, [selectedCategory, sortBy]);

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-gray-200 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop All Products</h1>
            <p className="text-gray-500">Discover our full collection of premium items.</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Mobile Filter Toggle */}
            <Button 
              variant="outline" 
              className="md:hidden"
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            >
              <Filter className="w-4 h-4 mr-2" /> Filters
            </Button>

            {/* Desktop Sort */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <select 
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2.5"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="newest">New Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar / Filters */}
          <aside className={`w-full md:w-64 flex-shrink-0 ${isMobileFiltersOpen ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
              <div className="flex items-center gap-2 mb-6 text-gray-900 font-bold text-lg">
                <SlidersHorizontal className="w-5 h-5" />
                Filters
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center justify-between">
                  Categories <ChevronDown className="w-4 h-4 text-gray-400" />
                </h3>
                <ul className="space-y-3">
                  <li>
                    <button 
                      onClick={() => setSelectedCategory('All')} 
                      className={`text-sm w-full text-left flex items-center justify-between transition-colors ${selectedCategory === 'All' ? 'text-orange-600 font-semibold' : 'text-gray-600 hover:text-orange-600'}`}
                    >
                      All Products
                      {selectedCategory === 'All' && <Check className="w-4 h-4" />}
                    </button>
                  </li>
                  {CATEGORIES.map(cat => (
                    <li key={cat}>
                      <button 
                        onClick={() => setSelectedCategory(cat)} 
                        className={`text-sm w-full text-left flex items-center justify-between transition-colors ${selectedCategory === cat ? 'text-orange-600 font-semibold' : 'text-gray-600 hover:text-orange-600'}`}
                      >
                        {cat}
                        {selectedCategory === cat && <Check className="w-4 h-4" />}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-grow">
            {filteredProducts.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center">
                <p className="text-xl text-gray-500 mb-4">No products found matching your criteria.</p>
                <Button onClick={() => { setSelectedCategory('All'); setSortBy('featured'); }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
            
            {/* Simple Pagination indicator */}
            {filteredProducts.length > 0 && (
              <div className="mt-12 text-center text-sm text-gray-500">
                Showing {filteredProducts.length} results
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
