import { Link } from 'react-router';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 set text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & About */}
          <div>
            <Link to="/" className="text-[24px] font-[900] tracking-[-0.02em] text-[#FF6321] uppercase mb-6 inline-block">
              FNF SUPER SHOP
            </Link>
            <p className="text-[#9CA3AF] text-[14px] leading-relaxed mb-6">
              Your one-stop destination for quality products at unbeatable prices. Fast shipping, secure payments, and a 30-day money-back guarantee.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Youtube className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/shop" className="text-gray-400 hover:text-[#FF6321] transition-colors text-sm">Shop All</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-[#FF6321] transition-colors text-sm">New Arrivals</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-[#FF6321] transition-colors text-sm">Bestsellers</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-[#FF6321] transition-colors text-sm">Sale Offers</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-[#FF6321] transition-colors text-sm">About Us</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Customer Service</h3>
            <ul className="space-y-3">
              <li><Link to="#" className="text-gray-400 hover:text-[#FF6321] transition-colors text-sm">Track Order</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-[#FF6321] transition-colors text-sm">Returns & Refunds</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-[#FF6321] transition-colors text-sm">Shipping Information</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-[#FF6321] transition-colors text-sm">FAQ</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-[#FF6321] transition-colors text-sm">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Stay Connected</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-[#FF6321] text-sm"
              />
              <button className="w-full bg-[#FF6321] hover:bg-[#e85a1e] text-white font-bold py-2 px-4 rounded-xl transition-colors text-sm">
                Get Exclusive Deals
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} FNF Super Shop. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm text-gray-500">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
