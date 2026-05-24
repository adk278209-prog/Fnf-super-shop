import { Link } from 'react-router';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { Truck, ShieldCheck, Tag, ArrowRight, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Home() {
  const featuredProducts = products.filter(p => p.tags.includes('bestseller')).slice(0, 4);
  const newArrivals = products.filter(p => p.tags.includes('new') || p.tags.includes('sale')).slice(0, 4);
  
  // Simple countdown timer for urgency
  const [timeLeft, setTimeLeft] = useState({ h: 12, m: 45, s: 30 });
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center bg-gradient-to-br from-[#FFF7ED] to-[#FFEDD5] overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center md:text-left">
          <div className="max-w-2xl">
            <span className="inline-block py-1 px-3 text-[#FF6321] text-[14px] font-[800] tracking-[1px] uppercase mb-4">
              ✓ Trusted by 5,000+ Customers
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-[48px] font-black text-[#111827] tracking-tight mb-6 leading-[1.1]">
              Quality Gear at<br/>Unbeatable Prices
            </h1>
            <p className="text-lg text-[#4B5563] mb-10 max-w-xl mx-auto md:mx-0">
              Upgrade your lifestyle with our curated collection of premium essentials. Fast shipping and 30-day money-back guarantee.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/shop">
                <Button size="md" className="w-full sm:w-auto font-bold px-8">
                  Shop Now
                </Button>
              </Link>
              <Link to="/about">
                <Button size="md" variant="secondary" className="w-full sm:w-auto font-bold px-8">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex absolute right-10 lg:right-20 top-1/2 -translate-y-1/2 w-[340px] h-[200px] bg-[#E5E7EB] rounded-[24px] rotate-2 border-[8px] border-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)] items-center justify-center italic text-[#9CA3AF]">
            Featured Lifestyle Shot
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-auto py-6 sm:py-0 sm:h-[60px] flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-16">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#374151]">
            <div className="w-2 h-2 rounded-full bg-[#FF6321]"></div> Fast 2-Day Shipping
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-[#374151]">
            <div className="w-2 h-2 rounded-full bg-[#FF6321]"></div> Lowest Price Guarantee
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-[#374151]">
            <div className="w-2 h-2 rounded-full bg-[#FF6321]"></div> No-Hassle 30-Day Returns
          </div>
        </div>
      </section>

      {/* Flash Sale Urgency Section */}
      <section className="py-12 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Weekend Flash Sale</h2>
              <p className="text-orange-100 text-lg">Get an extra 20% off selected items. Use code <span className="font-mono bg-white text-orange-600 px-2 py-1 rounded font-bold ml-1">FLASH20</span></p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="text-center">
                <div className="bg-white text-orange-600 font-bold text-2xl w-14 h-14 rounded-lg flex items-center justify-center shadow-md">
                  {String(timeLeft.h).padStart(2, '0')}
                </div>
                <span className="text-xs font-medium uppercase mt-2 block">Hours</span>
              </div>
              <span className="text-2xl font-bold">:</span>
              <div className="text-center">
                <div className="bg-white text-orange-600 font-bold text-2xl w-14 h-14 rounded-lg flex items-center justify-center shadow-md">
                  {String(timeLeft.m).padStart(2, '0')}
                </div>
                <span className="text-xs font-medium uppercase mt-2 block">Mins</span>
              </div>
              <span className="text-2xl font-bold">:</span>
              <div className="text-center">
                <div className="bg-white text-orange-600 font-bold text-2xl w-14 h-14 rounded-lg flex items-center justify-center shadow-md">
                  {String(timeLeft.s).padStart(2, '0')}
                </div>
                <span className="text-xs font-medium uppercase mt-2 block">Secs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Trending Right Now</h2>
              <p className="text-gray-500">Our most popular items this week.</p>
            </div>
            <Link to="/shop" className="hidden sm:flex text-orange-600 font-medium hover:text-orange-700 items-center">
              View All <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-10 text-center sm:hidden">
             <Link to="/shop">
              <Button variant="outline" className="w-full">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Don't Just Take Our Word For It</h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-orange-400 text-orange-400" />
                ))}
              </div>
              <span className="text-lg font-semibold">4.8/5 Average</span>
            </div>
            <p className="text-gray-500">Based on 10,000+ reviews from satisfied customers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />)}
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">"Lightning fast shipping!"</h4>
              <p className="text-gray-600 italic mb-6">
                "I ordered my items on a Tuesday and they arrived intact by Thursday morning. The quality is exactly as described. Will absolutely be shopping here again."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 text-orange-600 font-bold rounded-full flex items-center justify-center">
                  JD
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">James D.</p>
                  <p className="text-green-600 text-xs font-medium flex items-center">
                    <ShieldCheck className="w-3 h-3 mr-1" /> Verified Buyer
                  </p>
                </div>
              </div>
            </div>
            
            {/* Review 2 */}
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />)}
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">"Best prices I could find."</h4>
              <p className="text-gray-600 italic mb-6">
                "I compared prices across 4 different sites and FNF Super Shop had the best deal by far. Customer service was also super responsive when I had a question."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 font-bold rounded-full flex items-center justify-center">
                  SM
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Sarah M.</p>
                  <p className="text-green-600 text-xs font-medium flex items-center">
                    <ShieldCheck className="w-3 h-3 mr-1" /> Verified Buyer
                  </p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />)}
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">"Amazing product quality."</h4>
              <p className="text-gray-600 italic mb-6">
                "You never know what you're going to get online, but I was blown away by the quality. The packaging was beautiful and the item feels premium."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-rose-100 text-rose-600 font-bold rounded-full flex items-center justify-center">
                  MT
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Michael T.</p>
                  <p className="text-green-600 text-xs font-medium flex items-center">
                    <ShieldCheck className="w-3 h-3 mr-1" /> Verified Buyer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Exit/Intent Section */}
      <section className="py-[30px] sm:h-[82px] sm:py-0 bg-[#2563EB] flex flex-col justify-center items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white text-[18px] font-bold">
            Get exclusive deals + 10% off your next order
          </div>
          <form className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="text" 
              placeholder="Enter your email address..." 
              className="bg-white/10 border border-white/20 rounded-xl px-5 py-2.5 w-full sm:w-[300px] text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
            <button type="submit" className="bg-white text-[#2563EB] border-none px-6 py-2.5 rounded-xl font-bold whitespace-nowrap hover:bg-gray-100 transition-colors">
              Claim Discount
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
