'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { supportedCurrencies } from '../../../utils/currencies';; // you'll need to create this

const Navbar = () => {
  const { cartItems } = useCart();
  const { currency, setCurrency } = useCurrency();

  return (
    <nav className="w-full bg-zinc-900 border-b border-zinc-700 px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-white text-xl font-bold">
        🛍️ Smart Shop
      </Link>

      <div className="flex items-center gap-4">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="bg-zinc-800 text-white border border-zinc-600 p-1 rounded-md text-sm"
        >
          {supportedCurrencies.map((c) => (
            <option key={c.code} value={c.code}>
              {c.code}
            </option>
          ))}
        </select>

        <Link href="/cart" className="relative text-white text-lg">
          🛒
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-1.5 py-0.5 rounded-full">
              {cartItems.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
