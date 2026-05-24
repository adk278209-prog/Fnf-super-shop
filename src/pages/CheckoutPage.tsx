import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Truck, CreditCard, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router';

export function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [shippingDetails, setShippingDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    area: '',
    city: 'Gopalganj'
  });
  const [deliveryError, setDeliveryError] = useState('');

  const GOPALGANJ_ZONES = [
    { id: 'college_road', name: 'College Road', type: 'sadar' },
    { id: 'launch_ghat', name: 'Launch Ghat', type: 'sadar' },
    { id: 'navinbag', name: 'Navinbag', type: 'sadar' },
    { id: 'court_mosque', name: 'Court Mosque', type: 'sadar' },
    { id: 'bus_stand', name: 'Bus Stand', type: 'sadar' },
    { id: 'miapara', name: 'Miapara', type: 'sadar' },
    { id: 'ghonapara', name: 'Ghonapara', type: 'peripheral' },
    { id: 'bedgram', name: 'Bedgram', type: 'peripheral' },
    { id: 'other', name: 'Other Area (Not Listed)', type: 'outside' }
  ];

  const getShippingFee = () => {
    const selectedZone = GOPALGANJ_ZONES.find(z => z.id === shippingDetails.area);
    if (!selectedZone) return 0;
    if (selectedZone.type === 'sadar') return 40; // 40 BDT inside sadar
    if (selectedZone.type === 'peripheral') return 60; // 60 BDT peripheral
    return 0;
  };

  const deliveryFee = getShippingFee();
  const total = subtotal + deliveryFee;

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value
    });
    setDeliveryError('');
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (shippingDetails.city.toLowerCase() !== 'gopalganj') {
        setDeliveryError("Sorry, we currently only deliver within Gopalganj!");
        return;
      }
      const selectedZone = GOPALGANJ_ZONES.find(z => z.id === shippingDetails.area);
      if (!selectedZone || selectedZone.type === 'outside') {
        setDeliveryError("Sorry, we currently only deliver to specific zones within Gopalganj!");
        return;
      }
    }
    setStep(s => Math.min(3, s + 1));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <div className="bg-green-50 p-6 rounded-full inline-block mb-6">
          <CheckCircle2 className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-4">Order Confirmed!</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md">
          Thank you for your purchase. Your order number is <strong className="text-gray-900">#ORD-{Math.floor(Math.random() * 1000000)}</strong>. We've sent a confirmation email to you.
        </p>
        <Link to="/shop">
          <Button size="lg" className="px-8 font-bold">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  if (items.length === 0 && !isSuccess) {
    return (
      <div className="text-center py-20 min-h-[50vh]">
        <h1 className="text-2xl mb-4">No items to checkout.</h1>
        <Link to="/"><Button>Back to Home</Button></Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Progress Indicator */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 z-0 rounded-full"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-orange-600 z-0 rounded-full transition-all duration-500"
              style={{ width: `${(step - 1) * 50}%` }}
            ></div>
            
            {[
              { num: 1, label: 'Shipping', icon: Truck },
              { num: 2, label: 'Method', icon: Truck },
              { num: 3, label: 'Payment', icon: CreditCard }
            ].map(s => (
              <div key={s.num} className="relative z-10 flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 border-gray-50 transition-colors duration-300 ${step >= s.num ? 'bg-orange-600 text-white' : 'bg-gray-300 text-gray-500'}`}>
                  {s.num}
                </div>
                <span className={`text-xs mt-2 font-medium ${step >= s.num ? 'text-orange-600' : 'text-gray-400'}`}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Main Checkout Form */}
          <div className="flex-grow order-2 lg:order-1">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
              
              {/* Step 1: Shipping Address */}
              {step === 1 && (
                <form onSubmit={handleNext}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Address</h2>
                  
                  {deliveryError && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 mb-6 font-medium">
                      {deliveryError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                      <input type="text" name="firstName" value={shippingDetails.firstName} onChange={handleDetailsChange} required className="w-full rounded-lg border-gray-300 focus:ring-[#FF6321] focus:border-[#FF6321] p-3 border" placeholder="First Name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                      <input type="text" name="lastName" value={shippingDetails.lastName} onChange={handleDetailsChange} required className="w-full rounded-lg border-gray-300 focus:ring-[#FF6321] focus:border-[#FF6321] p-3 border" placeholder="Last Name" />
                    </div>
                    <div className="sm:col-span-2">
                       <label className="block text-sm font-medium text-gray-700 mb-1">Phone / Mobile No. *</label>
                      <input type="text" name="email" value={shippingDetails.email} onChange={handleDetailsChange} required className="w-full rounded-lg border-gray-300 focus:ring-[#FF6321] focus:border-[#FF6321] p-3 border" placeholder="e.g. 017XXXXXXXX" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Specific Address / House No. *</label>
                      <input type="text" name="address" value={shippingDetails.address} onChange={handleDetailsChange} required className="w-full rounded-lg border-gray-300 focus:ring-[#FF6321] focus:border-[#FF6321] p-3 border" placeholder="Street, House/Apt No." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Area / Zone *</label>
                      <select name="area" value={shippingDetails.area} onChange={handleDetailsChange} required className="w-full rounded-lg border-gray-300 focus:ring-[#FF6321] focus:border-[#FF6321] p-3 border">
                        <option value="">Select an area...</option>
                        <optgroup label="Inside Sadar (৳40 Fee)">
                          {GOPALGANJ_ZONES.filter(z => z.type === 'sadar').map(z => <option key={z.id} value={z.id}>{z.name}</option>)}
                        </optgroup>
                        <optgroup label="Peripheral (৳60 Fee)">
                          {GOPALGANJ_ZONES.filter(z => z.type === 'peripheral').map(z => <option key={z.id} value={z.id}>{z.name}</option>)}
                        </optgroup>
                        <option value="other">Other Area</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City / District *</label>
                      <input type="text" name="city" value={shippingDetails.city} onChange={handleDetailsChange} required className="w-full rounded-lg border-gray-300 focus:ring-[#FF6321] focus:border-[#FF6321] p-3 border" placeholder="Gopalganj" />
                    </div>
                  </div>
                  <Button type="submit" size="lg" className="w-full font-bold">Continue to Shipping Method</Button>
                </form>
              )}

              {/* Step 2: Shipping Method */}
              {step === 2 && (
                <form onSubmit={handleNext}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Method</h2>
                  <div className="space-y-4 mb-8">
                    <label className="flex items-center justify-between p-4 border-2 border-[#FF6321] rounded-xl bg-[#FFF7ED] cursor-pointer">
                      <div className="flex items-center">
                        <input type="radio" name="shipping" defaultChecked className="h-5 w-5 text-[#FF6321] focus:ring-[#FF6321] border-gray-300" />
                        <div className="ml-3">
                          <span className="block text-gray-900 font-bold">Standard Local Delivery</span>
                          <span className="block text-sm text-gray-500">Same Day / Next Day within Gopalganj</span>
                        </div>
                      </div>
                      <span className="font-bold text-gray-900">৳{deliveryFee}</span>
                    </label>
                  </div>
                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-1/3">Back</Button>
                    <Button type="submit" size="lg" className="w-2/3 font-bold">Continue to Payment</Button>
                  </div>
                </form>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <form onSubmit={handlePlaceOrder}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
                  
                  <div className="bg-[#F3F4F6] p-4 border border-[#E5E7EB] rounded-xl mb-6 flex items-start">
                    <ShieldCheck className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <p className="text-sm text-gray-600 leading-relaxed">Secure integrated payment gateway. All transactions are encrypted.</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <label className="flex items-center justify-between p-4 border-2 border-[#E5E7EB] rounded-xl bg-white cursor-pointer hover:border-[#FF6321] transition-colors has-[:checked]:border-[#FF6321] has-[:checked]:bg-[#FFF7ED]">
                      <div className="flex items-center">
                        <input type="radio" name="payment" defaultChecked className="h-5 w-5 text-[#FF6321] focus:ring-[#FF6321] border-gray-300" />
                        <div className="ml-3 font-bold text-gray-900">Cash on Delivery (COD)</div>
                      </div>
                      <span className="text-gray-500 text-sm">Pay when you receive</span>
                    </label>

                    <label className="flex items-center justify-between p-4 border-2 border-[#E5E7EB] rounded-xl bg-white cursor-pointer hover:border-[#FF6321] transition-colors has-[:checked]:border-[#FF6321] has-[:checked]:bg-[#FFF7ED]">
                      <div className="flex items-center">
                        <input type="radio" name="payment" className="h-5 w-5 text-[#FF6321] focus:ring-[#FF6321] border-gray-300" />
                        <div className="ml-3 font-bold text-gray-900">bKash / Nagad / Rocket</div>
                      </div>
                      <div className="flex gap-2">
                         <div className="w-8 h-5 bg-pink-500 rounded flex items-center justify-center text-[8px] font-bold text-white">bKash</div>
                      </div>
                    </label>

                    <label className="flex items-center justify-between p-4 border-2 border-[#E5E7EB] rounded-xl bg-white cursor-pointer hover:border-[#FF6321] transition-colors has-[:checked]:border-[#FF6321] has-[:checked]:bg-[#FFF7ED]">
                      <div className="flex items-center">
                        <input type="radio" name="payment" className="h-5 w-5 text-[#FF6321] focus:ring-[#FF6321] border-gray-300" />
                        <div className="ml-3 font-bold text-gray-900">SSLCommerz (Card / Net Banking)</div>
                      </div>
                      <div className="flex gap-1">
                        <CreditCard className="text-gray-400 w-5 h-5"/>
                      </div>
                    </label>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setStep(2)} className="w-1/3" disabled={isProcessing}>Back</Button>
                    <Button type="submit" size="lg" className="w-2/3 font-bold text-lg" isLoading={isProcessing}>
                      {isProcessing ? "Processing..." : `Complete Order (৳${total})`}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0 order-1 lg:order-2">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">Order Summary</h3>
              
              <div className="space-y-4 mb-4 max-h-64 overflow-y-auto pr-2">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-50 rounded border border-gray-100 overflow-hidden flex-shrink-0 relative">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                      <span className="absolute -top-1 -right-1 bg-gray-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full border border-white">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-grow overflow-hidden">
                      <p className="text-xs font-semibold text-gray-900 truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.displayPrice || `৳${item.price}`}</p>
                    </div>
                    <div className="font-semibold text-sm text-gray-900">
                      ৳{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-100 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">৳{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="font-medium text-gray-900">{deliveryFee === 0 ? '-' : `৳${deliveryFee}`}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-100 text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-[#FF6321]">৳{total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
