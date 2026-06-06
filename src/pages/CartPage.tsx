import { Link } from 'react-router';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { Button } from '@/components/ui/Button';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const { formatPrice } = useCurrency();
  
  const total = subtotal; // Delivery fee is calculated on checkout page

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <div className="bg-orange-50 p-6 rounded-full inline-block mb-6">
          <ShoppingBag className="w-16 h-16 text-orange-600" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added anything to your cart yet. Discover our premium collection and start shopping!</p>
        <Link to="/shop">
          <Button size="lg" className="px-8 font-bold">Start Shopping <ArrowRight className="ml-2 w-5 h-5" /></Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-grow">
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {items.map(item => (
                <li key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <Link to={`/product/${item.id}`} className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 block">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = `https://placehold.co/200x200/eaeaea/888888/jpg?text=${encodeURIComponent(item.name)}`; }} />
                  </Link>
                  
                  <div className="flex-grow">
                    <Link to={`/product/${item.id}`}>
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-orange-600 mb-1">{item.name}</h3>
                    </Link>
                    <p className="text-sm text-gray-500 mb-4">Category: {item.category}</p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center border border-gray-300 rounded-lg w-28 h-10">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-1/3 flex items-center justify-center text-gray-600 hover:text-orange-600"
                        >
                          -
                        </button>
                        <span className="w-1/3 text-center font-medium text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-1/3 flex items-center justify-center text-gray-600 hover:text-orange-600"
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <span className="font-bold text-lg text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-sm text-red-500 hover:text-red-700 flex items-center mt-2 group"
                        >
                          <Trash2 className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span className="font-medium text-purple-600 italic">Calculated at checkout</span>
              </div>
              
              <div className="pt-2 pb-4 border-b border-gray-200">
                <p className="text-sm text-gray-700 mb-2 font-medium">Coupon Code</p>
                <div className="flex gap-2">
                  <input type="text" placeholder="Enter code..." className="flex-grow rounded-lg border-gray-300 focus:ring-[#FF6321] focus:border-[#FF6321] p-2 border text-sm" />
                  <Button size="sm" variant="outline" className="font-bold border-[#FF6321] text-[#FF6321] hover:bg-[#FF6321] hover:text-white">Apply</Button>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold text-gray-900 pt-2">
                <span>Total</span>
                <span className="text-xl text-[#FF6321]">{formatPrice(total)}</span>
              </div>
            </div>

            <Link to="/checkout" className="block w-full">
              <Button size="lg" className="w-full font-bold text-lg shadow-md">
                Proceed to Checkout
              </Button>
            </Link>
            
            <div className="mt-6 flex items-center justify-center gap-4 border-t border-gray-200 pt-6">
               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png" className="h-6 object-contain" alt="Mastercard" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png" className="h-4 object-contain" alt="Visa" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/200px-PayPal.svg.png" className="h-4 object-contain" alt="PayPal" />
            </div>
            <p className="text-center text-xs text-gray-400 mt-4 flex justify-center items-center">
               <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" /></svg> Secure Encrypted Checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
