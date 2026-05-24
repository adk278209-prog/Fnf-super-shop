import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <div className="bg-[#111827] text-white text-center text-[12px] font-[600] py-2 tracking-[0.05em] uppercase w-full">
        FLASH SALE: GET 20% OFF YOUR FIRST ORDER WITH CODE: SUPER20
      </div>
      <nav className="sticky top-0 z-50 w-full bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-[64px] items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-[24px] font-[900] tracking-[-0.02em] text-[#FF6321] uppercase">
                FNF SUPER SHOP
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    cn(
                      "text-[14px] font-[500] transition-colors hover:text-[#FF6321]",
                      isActive ? "text-[#FF6321]" : "text-[#111827]"
                    )
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Icons Context */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              <button className="text-gray-500 hover:text-[#FF6321] transition-colors hidden sm:block">
                <Search className="h-5 w-5" />
              </button>
              <button className="text-gray-500 hover:text-[#FF6321] transition-colors hidden sm:block">
                <User className="h-5 w-5" />
              </button>
              
              <Link to="/cart" className="bg-[#FF6321] text-white px-3 py-2 sm:px-5 sm:py-2 rounded-full font-[600] text-[14px] flex items-center gap-2 hover:bg-[#e85a1e] transition-colors">
                <span>🛒</span>
                <span className="hidden sm:inline">Cart ({totalItems})</span>
                <span className="sm:hidden">{totalItems}</span>
              </Link>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-500 hover:text-gray-900 focus:outline-none ml-2"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "block px-3 py-2 rounded-md text-base font-medium",
                    isActive ? "bg-orange-50 text-orange-600" : "text-gray-700 hover:bg-gray-50 hover:text-orange-600"
                  )
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
    </>
  );
}
