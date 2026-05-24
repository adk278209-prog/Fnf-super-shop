import React, { createContext, useContext, useState, useEffect } from 'react';

export type CountryCode = 'USA' | 'BGD' | 'GBR' | 'EUR' | 'OTHER';

export const COUNTRIES = [
  { code: 'USA', name: 'United States' },
  { code: 'BGD', name: 'Bangladesh' },
  { code: 'GBR', name: 'United Kingdom' },
  { code: 'EUR', name: 'Europe (EU)' },
  { code: 'OTHER', name: 'Other International' }
] as const;

interface ShippingOption {
  id: string;
  name: string;
  feeUSD: number;
  days: string;
}

interface CurrencyContextType {
  country: CountryCode;
  setCountry: (country: CountryCode) => void;
  currencySymbol: string;
  rate: number;
  formatPrice: (priceUSD: number) => string;
  shippingOptions: ShippingOption[];
  isInternational: boolean;
  selectedShippingId: string;
  setSelectedShippingId: (id: string) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [country, setCountry] = useState<CountryCode>('USA');
  const [selectedShippingId, setSelectedShippingId] = useState<string>('intl_standard');

  const getCurrencyDetails = (c: CountryCode) => {
    switch (c) {
      case 'BGD': return { symbol: '৳', rate: 120 };
      case 'EUR': return { symbol: '€', rate: 0.92 };
      case 'GBR': return { symbol: '£', rate: 0.78 };
      case 'USA':
      case 'OTHER':
      default:
        return { symbol: '$', rate: 1.0 };
    }
  };

  const { symbol: currencySymbol, rate } = getCurrencyDetails(country);

  const formatPrice = (priceUSD: number) => {
    return `${currencySymbol}${(priceUSD * rate).toFixed(2)}`;
  };

  const isInternational = country !== 'BGD'; // Assuming default or local is BGD based on original app, but wait, usually USA is default for global. If we say "National (Domestic)", maybe Bangladesh is the origin? Let's check the prompt: "If country is "Bangladesh", set shipping fee to $1.50... If International, for any other country..." so origin is Bangladesh.

  const shippingOptions: ShippingOption[] = country === 'BGD' 
    ? [{ id: 'national', name: 'National (Domestic)', feeUSD: 1.50, days: '1-3 Days' }]
    : [
        { id: 'intl_standard', name: 'International (Global)', feeUSD: 15.00, days: '7-14 Days' },
        { id: 'dhl_express', name: 'DHL Express', feeUSD: 30.00, days: '3-5 Days' },
        { id: 'fedex', name: 'FedEx Priority', feeUSD: 25.00, days: '4-7 Days' }
      ];

  useEffect(() => {
    if (country === 'BGD') {
      setSelectedShippingId('national');
    } else {
      setSelectedShippingId('intl_standard');
    }
  }, [country]);

  return (
    <CurrencyContext.Provider value={{
      country,
      setCountry,
      currencySymbol,
      rate,
      formatPrice,
      shippingOptions,
      isInternational: country !== 'BGD',
      selectedShippingId,
      setSelectedShippingId
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
