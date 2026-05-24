import { BrowserRouter, Routes, Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { WishlistPage } from './pages/WishlistPage';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { AIChatbot } from './components/AIChatbot';

export default function App() {
  return (
    <CurrencyProvider>
      <WishlistProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="shop" element={<Shop />} />
                <Route path="product/:id" element={<ProductDetails />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="checkout" element={<CheckoutPage />} />
                <Route path="wishlist" element={<WishlistPage />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="*" element={
                  <div className="min-h-[50vh] flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
                    <a href="/" className="text-orange-600 hover:underline">Return to Home</a>
                  </div>
                } />
              </Route>
            </Routes>
          </BrowserRouter>
          <AIChatbot />
        </CartProvider>
      </WishlistProvider>
    </CurrencyProvider>
  );
}

