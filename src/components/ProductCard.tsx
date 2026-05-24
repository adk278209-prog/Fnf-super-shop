import React, { useState } from 'react';
import { Link } from 'react-router';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCurrency } from '@/context/CurrencyContext';
import { Button } from './ui/Button';
import { Star, ShoppingCart, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { formatPrice } = useCurrency();
  const [isAdded, setIsAdded] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };
  
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100) 
    : 0;

  return (
    <Link to={`/product/${product.id}`} className="group relative block bg-white rounded-[20px] border border-[#E5E7EB] p-4 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Badges */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
        {discount > 0 && (
          <span className="text-[#FF6321] text-[10px] font-[700] uppercase tracking-wide bg-white/80 px-2 py-1 rounded backdrop-blur-sm">
            {discount}% OFF
          </span>
        )}
        {product.tags.includes('bestseller') && (
          <span className="text-[#FF6321] text-[10px] font-[700] uppercase tracking-wide bg-white/80 px-2 py-1 rounded backdrop-blur-sm">
            Best Seller
          </span>
        )}
      </div>
      
      <button 
        onClick={handleWishlistToggle}
        className="absolute top-6 right-6 z-20 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm hover:shadow-md transition-shadow text-gray-400 hover:text-red-500"
      >
        <Heart className={`w-4 h-4 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
      </button>

      {/* Image */}
      <div className="aspect-[4/5] overflow-hidden bg-[#F3F4F6] rounded-xl relative mb-3">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        {/* Quick Add overlay */}

        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
           <Button 
            className="w-full shadow-lg h-10" 
            onClick={handleAddToCart}
            variant={isAdded ? "secondary" : "primary"}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {isAdded ? "Added to Cart" : "Add to Cart"}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <p className="text-[#FF6321] text-[10px] uppercase font-[700] mb-1">{product.category}</p>
        <h3 className="text-[16px] font-[700] text-[#111827] group-hover:text-[#FF6321] transition-colors line-clamp-2 mb-1 flex-grow">
          {product.name}
        </h3>
        
        {/* Ratings */}
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-3.5 h-3.5 fill-[#FBBF24] text-[#FBBF24]" />
          <span className="text-[11px] text-[#6B7280]">({product.reviewsCount} reviews)</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[20px] font-[800] text-[#111827]">{product.displayPrice || formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <button 
            onClick={handleAddToCart}
            className="bg-[#111827] text-white w-9 h-9 rounded-[10px] flex items-center justify-center text-lg hover:bg-[#FF6321] transition-colors"
          >
            +
          </button>
        </div>
      </div>
    </Link>
  );
}
