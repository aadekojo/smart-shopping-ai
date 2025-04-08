'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { supportedCurrencies } from '../../../utils/currencies'

type CurrencyContextType = {
  currency: string;
  locale: string;
  setCurrency: (code: string) => void;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrencyCode] = useState('AED');
  const currencyData = supportedCurrencies.find((c) => c.code === currency) || supportedCurrencies[0];

  const setCurrency = (code: string) => setCurrencyCode(code);

  return (
    <CurrencyContext.Provider value={{ currency, locale: currencyData.locale, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error('useCurrency must be used within CurrencyProvider');
  return context;
};
