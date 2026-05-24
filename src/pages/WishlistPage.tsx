import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/ProductCard';
import { Heart } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router';

export const WishlistPage = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Heart className="w-8 h-8 text-[#FF6321] fill-current" />
          My Wishlist
        </h1>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center min-h-[50vh] flex flex-col justify-center items-center">
            <Heart className="w-16 h-16 text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md">Browse our collection and add your favorite items to the wishlist to easily find them later.</p>
            <Link to="/shop">
              <Button size="lg" className="font-bold">Explore Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

