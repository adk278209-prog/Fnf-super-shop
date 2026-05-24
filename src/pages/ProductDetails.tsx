import { useParams, Link } from 'react-router';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { Star, Truck, RotateCcw, ShieldCheck, Check, Info } from 'lucide-react';
import { useState, useEffect } from 'react';

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const { addItem } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [visitors, setVisitors] = useState(5);

  // Urgent visitors count simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitors(prev => {
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        return Math.max(3, Math.min(15, prev + change));
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!product) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link to="/shop"><Button>Back to Shop</Button></Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 3000);
  };

  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-gray-500">
        <Link to="/" className="hover:text-orange-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-orange-600">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{product.category}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Images Section */}
          <div className="flex flex-col gap-4">
            <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 relative">
               {discount > 0 && (
                <span className="absolute top-4 left-4 z-10 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded">
                  Save {discount}%
                </span>
              )}
              <img 
                src={product.images[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 ${activeImage === idx ? 'border-orange-500' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4 leading-tight">
              {product.name}
            </h1>
            
            {/* Reviews and Urgency */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-orange-400 text-orange-400' : 'text-gray-300'}`} />
                ))}
                <span className="font-bold text-gray-900 ml-1">{product.rating}</span>
                <a href="#reviews" className="text-orange-600 hover:text-orange-700 text-sm ml-1 underline transition-colors">
                  ({product.reviewsCount} reviews)
                </a>
              </div>
              <div className="flex items-center text-sm font-medium text-red-600 bg-red-50 px-2 py-1 rounded">
                <Info className="w-4 h-4 mr-1" />
                {visitors} people viewing this
              </div>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3 mb-6 pb-6 border-b border-gray-100">
              <span className="text-4xl font-black text-gray-900">{product.displayPrice || `৳${product.price}`}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through mb-1">৳{product.originalPrice}</span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              {product.description}
            </p>
            
            <div className="flex flex-col gap-2 mb-8 bg-orange-50/50 p-4 rounded-xl border border-orange-100">
               <div className="flex items-center gap-2 text-sm text-[#FF6321] font-bold">
                 <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6321] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF6321]"></span>
                 </span>
                 Live Inventory: Only {Math.floor(Math.random() * 10) + 2} left in stock - order soon!
               </div>
               <div className="flex items-center gap-2 text-sm text-[#2563EB] font-bold">
                 <span>🏆</span>
                 <p>Loyalty Program: Earn <span className="font-black">{Math.floor(product.price * 2)} FNF Points</span> with this purchase.</p>
               </div>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-gray-600">
                      <Check className="w-5 h-5 text-orange-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-4 mt-auto">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-900">Quantity</span>
                {product.stock < 20 && (
                  <span className="text-red-500 font-semibold uppercase tracking-wider text-xs">
                    Only {product.stock} left in stock!
                  </span>
                )}
              </div>
              
              <div className="flex gap-4">
                <div className="flex items-center border-2 border-gray-200 rounded-lg w-32">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-14 flex items-center justify-center text-gray-600 hover:text-orange-600 text-xl"
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    min="1" 
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                    className="w-full text-center font-semibold text-gray-900 h-14 border-none focus:ring-0 p-0"
                  />
                  <button 
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-14 flex items-center justify-center text-gray-600 hover:text-orange-600 text-xl"
                  >
                    +
                  </button>
                </div>
                
                <Button 
                  size="lg" 
                  className="flex-grow font-bold text-lg h-14"
                  onClick={handleAddToCart}
                  variant={isAdded ? "secondary" : "primary"}
                >
                  {isAdded ? "Added to Cart \u2713" : "Add to Cart"}
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100">
              <div className="flex items-center text-gray-600 text-sm">
                <Truck className="w-5 h-5 mr-2 text-orange-500 flex-shrink-0" />
                <span><strong className="text-gray-900 block">Fast 2-3 Day</strong> Shipping</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <RotateCcw className="w-5 h-5 mr-2 text-orange-500 flex-shrink-0" />
                <span><strong className="text-gray-900 block">30-Day</strong> Returns</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <ShieldCheck className="w-5 h-5 mr-2 text-orange-500 flex-shrink-0" />
                <span><strong className="text-gray-900 block">2-Year</strong> Warranty</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <Check className="w-5 h-5 mr-2 text-orange-500 flex-shrink-0" />
                <span><strong className="text-gray-900 block">Secure</strong> Checkout</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div id="reviews" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-100 mt-12 bg-gray-50 rounded-3xl mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-4">Customer Reviews</h2>
        
        {product.reviews && product.reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {product.reviews.map(review => (
              <div key={review.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-gray-900">{review.author}</h4>
                    {review.verified && (
                      <span className="text-green-600 text-xs font-semibold flex items-center mt-1">
                        <ShieldCheck className="w-3 h-3 mr-1" /> Verified Purchase
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-orange-400 text-orange-400' : 'text-gray-200'}`} />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">"{review.text}"</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No reviews yet for this product.</p>
            <Button variant="outline">Write a Review</Button>
          </div>
        )}
      </div>

    </div>
  );
}
