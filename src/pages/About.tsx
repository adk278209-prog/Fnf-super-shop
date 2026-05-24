import { Truck, ShieldCheck, Tag, Anchor } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router';

export function About() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-orange-600 text-white py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-white">About FNF Super Shop</h1>
        <p className="text-xl max-w-2xl mx-auto text-orange-100">Quality products, unbeatable prices, and customer service that actually cares.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Founded in 2024, FNF Super Shop was built on a simple idea: everyone deserves access to premium quality products without the premium price tag. We cut out the middlemen and work directly with top manufacturers to bring you curated items at unmatched value.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We aren't just here to sell things. We're here to build long-term relationships with our customers by providing an incredible shopping experience from the moment you land on our site, to the moment your package arrives at your door.
            </p>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" alt="Team collaborating" className="rounded-2xl shadow-lg border border-gray-100 w-full object-cover aspect-video" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-20">
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
               <Tag className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Unbeatable Value</h3>
            <p className="text-gray-600">We constantly monitor prices across the internet to ensure we offer the absolute best deals available.</p>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
               <ShieldCheck className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Guaranteed Quality</h3>
            <p className="text-gray-600">Every item we sell passes a strict quality control check. Not satisfied? Need a return? No problem.</p>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
               <Truck className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Delivery</h3>
            <p className="text-gray-600">Our warehouses are strategically located so that 95% of orders arrive within 2 to 3 delivery days.</p>
          </div>
        </div>
        
        <div className="bg-gray-900 rounded-3xl p-12 text-center text-white border border-gray-800">
          <Anchor className="w-12 h-12 text-orange-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4 text-white">Join 50,000+ Happy Customers</h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">Experience the FNF difference today. Check out our latest arrivals and step up your shopping experience.</p>
          <Link to="/shop">
            <Button size="lg" className="font-bold text-lg px-10">Start Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
